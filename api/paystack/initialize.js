export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });
  const paystackSecret=process.env.PAYSTACK_SECRET_KEY, supabaseUrl=process.env.SUPABASE_URL, serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY||process.env.SUPABASE_SECRET_KEY, anonKey=process.env.SUPABASE_ANON_KEY;
  if(!paystackSecret||!supabaseUrl||!serviceKey)return res.status(500).json({success:false,message:'Configure PAYSTACK_SECRET_KEY, SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel.'});
  const h={apikey:serviceKey,Authorization:`Bearer ${serviceKey}`,'Content-Type':'application/json'};
  try{
    const body=req.body||{},email=String(body.email||'').trim(),items=Array.isArray(body.items)?body.items:[];
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return res.status(400).json({success:false,message:'A valid checkout email is required.'});
    if(!items.length||items.length>30)return res.status(400).json({success:false,message:'Add between 1 and 30 artworks to the cart.'});
    const normalized=items.map(i=>({id:String(i.id||''),quantity:Number(i.quantity||1)}));
    if(normalized.some(i=>!/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(i.id)||i.quantity!==1||!Number.isInteger(i.quantity)))return res.status(400).json({success:false,message:'Cart contains an invalid artwork or quantity.'});
    if(new Set(normalized.map(i=>i.id)).size!==normalized.length)return res.status(400).json({success:false,message:'Duplicate artwork items are not allowed.'});
    const ids=normalized.map(i=>i.id),q=new URLSearchParams({select:'id,title,price,currency,seller_id,status',status:'eq.approved',id:`in.(${ids.join(',')})`});
    const ar=await fetch(`${supabaseUrl}/rest/v1/artworks?${q}`,{headers:h}),artworks=await ar.json();
    if(!ar.ok)return res.status(502).json({success:false,message:'Could not validate artwork prices against Supabase.'});
    if(!Array.isArray(artworks)||artworks.length!==ids.length)return res.status(409).json({success:false,message:'One or more artworks are no longer available. Refresh the catalogue and try again.'});
    const currencies=[...new Set(artworks.map(a=>String(a.currency||'GHS').toUpperCase()))];
    if(currencies.length!==1||!['GHS','USD','GBP','EUR','NGN','ZAR'].includes(currencies[0]))return res.status(400).json({success:false,message:'Cart currencies do not match or are unsupported.'});
    const currency=currencies[0],total=artworks.reduce((sum,a)=>sum+Number(a.price),0);
    if(!Number.isFinite(total)||total<=0||total>100000000)return res.status(400).json({success:false,message:'Invalid order total.'});
    let buyerId=null;const bearer=String(req.headers.authorization||'').replace(/^Bearer\s+/i,'');
    if(bearer){if(!anonKey)return res.status(500).json({success:false,message:'SUPABASE_ANON_KEY is required to validate signed-in checkout sessions.'});const ur=await fetch(`${supabaseUrl}/auth/v1/user`,{headers:{apikey:anonKey,Authorization:`Bearer ${bearer}`}});if(!ur.ok)return res.status(401).json({success:false,message:'Your session expired. Sign in again.'});const user=await ur.json();buyerId=user.id||null;if(user.email&&user.email.toLowerCase()!==email.toLowerCase())return res.status(400).json({success:false,message:'Checkout email must match your signed-in account.'});}
    const oi=await fetch(`${supabaseUrl}/rest/v1/orders`,{method:'POST',headers:{...h,Prefer:'return=representation'},body:JSON.stringify({buyer_id:buyerId,buyer_email:email,payment_provider:'paystack',payment_status:'pending',currency,total_amount:total})});
    const rows=await oi.json();if(!oi.ok||!Array.isArray(rows)||!rows[0])return res.status(502).json({success:false,message:'Could not create the order record in Supabase.'});const order=rows[0];
    const itemRes=await fetch(`${supabaseUrl}/rest/v1/order_items`,{method:'POST',headers:{...h,Prefer:'return=minimal'},body:JSON.stringify(artworks.map(a=>({order_id:order.id,artwork_id:a.id,artwork_title:a.title,seller_id:a.seller_id,quantity:1,unit_price:Number(a.price),currency})))});
    if(!itemRes.ok){await fetch(`${supabaseUrl}/rest/v1/orders?id=eq.${order.id}`,{method:'PATCH',headers:h,body:JSON.stringify({payment_status:'failed'})});return res.status(502).json({success:false,message:'Could not save order items.'});}
    const origin=`${req.headers['x-forwarded-proto']||'https'}://${req.headers.host}`;
    const ps=await fetch('https://api.paystack.co/transaction/initialize',{method:'POST',headers:{Authorization:`Bearer ${paystackSecret}`,'Content-Type':'application/json'},body:JSON.stringify({email,amount:String(Math.round(total*100)),currency,callback_url:`${origin}/?payment=return`,metadata:{source:'zartz',order_id:order.id}})});
    const pd=await ps.json();if(!ps.ok||!pd.status||!pd.data?.reference){await fetch(`${supabaseUrl}/rest/v1/orders?id=eq.${order.id}`,{method:'PATCH',headers:h,body:JSON.stringify({payment_status:'failed'})});return res.status(ps.status||502).json({success:false,message:pd.message||'Paystack initialization failed.'});}
    const saved=await fetch(`${supabaseUrl}/rest/v1/orders?id=eq.${order.id}`,{method:'PATCH',headers:{...h,Prefer:'return=minimal'},body:JSON.stringify({payment_reference:pd.data.reference})});
    if(!saved.ok)return res.status(502).json({success:false,message:'Payment started but the order reference could not be saved. Contact support before retrying.'});
    return res.status(200).json({success:true,authorization_url:pd.data.authorization_url,access_code:pd.data.access_code,reference:pd.data.reference,order_id:order.id});
  }catch(error){return res.status(500).json({success:false,message:error.message||'Payment initialization failed.'});}
}
