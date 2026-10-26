const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.SITE_ORIGIN || 'https://zarty-tidewellmanu.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method not allowed.' });
  const orderId = String(req.query.order_id || '');
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(orderId)) return res.status(400).json({ success: false, message: 'Invalid order reference.' });
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!key) return res.status(500).json({ success: false, message: 'Order status service is not configured.' });
  const sb = createClient(process.env.SUPABASE_URL || 'https://lvxszuxfiezwwiuqzxxd.supabase.co', key, { auth: { persistSession: false, autoRefreshToken: false } });
  const result = await sb.from('orders').select('id,payment_status,total_amount,currency,payment_provider').eq('id', orderId).maybeSingle();
  if (result.error) return res.status(500).json({ success: false, message: 'Could not check order status.' });
  if (!result.data || result.data.payment_provider !== 'morapay') return res.status(404).json({ success: false, message: 'Order not found.' });
  return res.status(200).json({
    success: true,
    order_id: result.data.id,
    payment_status: result.data.payment_status === 'success' ? 'success' : result.data.payment_status === 'failed' || result.data.payment_status === 'abandoned' ? 'failed' : 'pending',
    total_amount: Number(result.data.total_amount),
    currency: result.data.currency
  });
};
