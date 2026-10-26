const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ received: false });
  const secret = process.env.MORAPAY_WEBHOOK_SECRET;
  const apiSecret = process.env.MORAPAY_SECRET_KEY;
  const publicKey = process.env.MORAPAY_PUBLIC_KEY;
  const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!secret || !apiSecret || !publicKey || !sbKey) return res.status(500).json({ received: false, message: 'Webhook configuration is incomplete.' });

  try {
    const raw = req.rawBody ? (Buffer.isBuffer(req.rawBody) ? req.rawBody.toString('utf8') : String(req.rawBody)) : await new Promise((resolve, reject) => {
      const chunks = [];
      req.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
      req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      req.on('error', reject);
    });
    const payload = JSON.parse(raw);
    const signature = String(req.headers['morapay-signature'] || '');
    const { Morapay } = await import('@morapay/sdk');
    const client = new Morapay({
      publicKey,
      secretKey: apiSecret,
      baseUrl: process.env.MORAPAY_API_BASE_URL || 'https://business.morapay.io/api/v1/merchant'
    });
    const valid = client.utils.verifyWebhook({ payload: raw, signature, secret });
    if (!valid) return res.status(401).json({ received: false, message: 'Invalid webhook signature.' });

    const data = payload.data || payload.payment || payload;
    const eventName = String(payload.type || payload.event || payload.name || data.status || '').toLowerCase();
    const orderId = String((data.metadata && (data.metadata.order_id || data.metadata.orderId)) || data.order_id || data.orderId || '').trim();
    const reference = String(data.linkId || data.paymentLinkId || data.publicCode || data.reference || data.id || '').trim();
    const sb = createClient(process.env.SUPABASE_URL || 'https://lvxszuxfiezwwiuqzxxd.supabase.co', sbKey, { auth: { persistSession: false, autoRefreshToken: false } });

    let orderQuery = sb.from('orders').select('id,payment_status').eq('payment_provider', 'morapay');
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(orderId)) orderQuery = orderQuery.eq('id', orderId);
    else if (reference) orderQuery = orderQuery.eq('payment_reference', reference);
    else return res.status(200).json({ received: true, ignored: true });
    const found = await orderQuery.maybeSingle();
    if (found.error) throw found.error;
    if (!found.data) return res.status(200).json({ received: true, ignored: true });

    let next = null;
    if (/paid|completed|succeeded|confirmed|payment\.success/.test(eventName)) next = 'success';
    else if (/failed|expired|cancelled|canceled|abandoned/.test(eventName)) next = 'failed';
    if (!next) return res.status(200).json({ received: true, ignored: true });

    const update = await sb.from('orders').update({ payment_status: next, paid_at: next === 'success' ? new Date().toISOString() : null }).eq('id', found.data.id);
    if (update.error) throw update.error;
    if (next === 'success') {
      const orderItems = await sb.from('order_items').select('artwork_id').eq('order_id', found.data.id);
      if (!orderItems.error && orderItems.data && orderItems.data.length) {
        const ids = orderItems.data.map((x) => x.artwork_id).filter(Boolean);
        if (ids.length) await sb.from('artworks').update({ status: 'sold' }).in('id', ids).eq('status', 'approved');
      }
    }
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Morapay webhook processing failed:', error && error.message ? error.message : 'unknown error');
    return res.status(500).json({ received: false });
  }
};

module.exports.config = { api: { bodyParser: false } };
