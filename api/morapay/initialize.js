const { createClient } = require('@supabase/supabase-js');

function reply(res, status, body) {
  res.status(status).json(body);
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.SITE_ORIGIN || 'https://zarty-tidewellmanu.vercel.app');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return reply(res, 405, { success: false, message: 'Method not allowed.' });

  const supabaseUrl = process.env.SUPABASE_URL || 'https://lvxszuxfiezwwiuqzxxd.supabase.co';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  const morapaySecret = process.env.MORAPAY_SECRET_KEY;
  const morapayPublic = process.env.MORAPAY_PUBLIC_KEY;
  if (!supabaseKey || !morapaySecret || !morapayPublic) {
    return reply(res, 500, { success: false, message: 'Payment setup is incomplete. Configure the server-side Supabase and Morapay environment variables in Vercel.' });
  }

  const body = req.body || {};
  const email = String(body.email || '').trim().toLowerCase();
  const items = Array.isArray(body.items) ? body.items : [];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(res, 400, { success: false, message: 'Enter a valid email address.' });
  if (!items.length || items.length > 20) return reply(res, 400, { success: false, message: 'Your cart is empty or contains too many artworks.' });

  const ids = items.map((item) => String(item.id || ''));
  if (ids.some((id) => !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) || new Set(ids).size !== ids.length) {
    return reply(res, 400, { success: false, message: 'The cart contains an invalid or duplicate artwork.' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false, autoRefreshToken: false } });
  let buyerId = null;
  const authHeader = String(req.headers.authorization || '');
  if (authHeader.startsWith('Bearer ')) {
    const auth = await supabase.auth.getUser(authHeader.slice(7));
    if (auth.error || !auth.data.user) return reply(res, 401, { success: false, message: 'Your sign-in session expired. Sign in again or retry without signing in.' });
    buyerId = auth.data.user.id;
  }

  let order = null;
  try {
    const result = await supabase.from('artworks')
      .select('id,title,price,currency,seller_id,status')
      .in('id', ids)
      .eq('status', 'approved');
    if (result.error) throw result.error;
    const artworks = result.data || [];
    if (artworks.length !== ids.length) return reply(res, 409, { success: false, message: 'One or more artworks are no longer available. Refresh the catalogue and try again.' });
    if (artworks.some((art) => String(art.currency || 'GHS').toUpperCase() !== 'GHS')) {
      return reply(res, 400, { success: false, message: 'Only GHS artwork checkout is currently configured.' });
    }

    const total = Number(artworks.reduce((sum, art) => sum + Number(art.price || 0), 0).toFixed(2));
    if (!Number.isFinite(total) || total <= 0) return reply(res, 400, { success: false, message: 'The order total is invalid.' });

    const created = await supabase.from('orders').insert({
      buyer_id: buyerId,
      buyer_email: email,
      payment_provider: 'morapay',
      payment_status: 'pending',
      currency: 'GHS',
      total_amount: total
    }).select('id').single();
    if (created.error) throw created.error;
    order = created.data;

    const orderItems = artworks.map((art) => ({
      order_id: order.id,
      artwork_id: art.id,
      artwork_title: art.title,
      seller_id: art.seller_id,
      quantity: 1,
      unit_price: Number(art.price),
      currency: 'GHS'
    }));
    const savedItems = await supabase.from('order_items').insert(orderItems);
    if (savedItems.error) throw savedItems.error;

    const { Morapay } = await import('@morapay/sdk');
    const client = new Morapay({
      publicKey: morapayPublic,
      secretKey: morapaySecret,
      baseUrl: process.env.MORAPAY_API_BASE_URL || 'https://business.morapay.io/api/v1/merchant'
    });
    const createdLink = await client.link.create({
      title: 'ZARTZ artwork order ' + order.id,
      description: 'ZARTZ artwork purchase. Order reference: ' + order.id,
      amount: total,
      currency: 'GHS',
      metadata: { order_id: order.id }
    });
    const link = createdLink && createdLink.data ? createdLink.data : createdLink;
    const checkoutUrl = link.checkoutUrl || link.checkout_url || link.url ||
      (link.publicCode ? 'https://checkout.morapay.io/pay/' + encodeURIComponent(link.publicCode) : '');
    const paymentReference = String(link.id || link.publicCode || link.code || '');
    if (!checkoutUrl || !/^https:\/\//i.test(checkoutUrl)) {
      throw new Error('Morapay did not return a hosted checkout URL. Check the API key pair and merchant API base URL.');
    }
    if (paymentReference) {
      const updated = await supabase.from('orders').update({ payment_reference: paymentReference }).eq('id', order.id);
      if (updated.error) throw updated.error;
    }
    return reply(res, 200, { success: true, order_id: order.id, checkout_url: checkoutUrl, amount: total, currency: 'GHS' });
  } catch (error) {
    console.error('Morapay checkout initialization failed:', error && error.message ? error.message : 'unknown error');
    return reply(res, 502, { success: false, message: 'Morapay could not start checkout. Verify the live API keys, merchant base URL and account activation, then retry.' });
  }
};
