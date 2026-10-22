export default async function handler(req,res){
  if(req.method!=='GET')return res.status(405).json({success:false,message:'Method not allowed'});
  const paystackSecret=process.env.PAYSTACK_SECRET_KEY,supabaseUrl=process.env.SUPABASE_URL,serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY||process.env.SUPABASE_SECRET_KEY;
  if(!paystackSecret||!supabaseUrl||!serviceKey)return res.status(500).json({success:false,message:'Configure PAYSTACK_SECRET_KEY, SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel.'});
  const reference=String(req.query.reference||'');if(!reference||!/^[A-Za-z0-9.=\-_]+$/.test(reference))return res.status(400).json({success:false,message:'Invalid transaction reference.'});
  const h={apikey:serviceKey,Authorization:`Bearer ${serviceKey}`,'Content-Type':'application/json'};
  try{
    const vr=await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,{headers:{Authorization:`Bearer ${paystackSecret}`}}),v=await vr.json();
    if(!vr.ok||!v.status||!v.data)return res.status(vr.status||502).json({success:false,message:v.message||'Paystack verification failed.'});
    const tx=v.data,or=await fetch(`${supabaseUrl}/rest/v1/orders?payment_reference=eq.${encodeURIComponent(reference)}&select=id,payment_status,payment_reference,total_amount,currency,buyer_email`,{headers:h}),orders=await or.json();
    if(!or.ok)return res.status(502).json({success:false,message:'Could not verify the order record.'});
    if(!Array.isArray(orders)||!orders.length)return res.status(404).json({success:false,message:'No matching order exists for this payment reference.'});
    const order=orders[0];if(tx.reference!==order.payment_reference)return res.status(409).json({success:false,message:'Payment reference does not match the order.'});
    if(String(tx.currency||'').toUpperCase()!==String(order.currency||'').toUpperCase()||Number(tx.amount)!==Math.round(Number(order.total_amount)*100))return res.status(409).json({success:false,message:'Verified payment amount or currency does not match the order. The order has not been marked paid.'});
    if(tx.status==='success'){
      if(order.payment_status!=='success'){
        const u=await fetch(`${supabaseUrl}/rest/v1/orders?id=eq.${order.id}&payment_status=eq.pending`,{method:'PATCH',headers:{...h,Prefer:'return=representation'},body:JSON.stringify({payment_status:'success',paid_at:new Date().toISOString()})});
        if(!u.ok)return res.status(502).json({success:false,message:'Payment was verified, but order status could not be updated.'});
        const changed=await u.json();if(!changed.length){const check=await fetch(`${supabaseUrl}/rest/v1/orders?id=eq.${order.id}&select=payment_status`,{headers:h}),cur=await check.json();if(!cur[0]||cur[0].payment_status!=='success')return res.status(409).json({success:false,message:'Order status changed during verification.'});}
      }
      return res.status(200).json({success:true,status:'success',reference,order_id:order.id,amount:tx.amount,currency:tx.currency});
    }
    if(order.payment_status==='pending')await fetch(`${supabaseUrl}/rest/v1/orders?id=eq.${order.id}&payment_status=eq.pending`,{method:'PATCH',headers:h,body:JSON.stringify({payment_status:tx.status==='abandoned'?'abandoned':'failed'})});
    return res.status(200).json({success:true,status:tx.status||'unknown',reference,order_id:order.id,amount:tx.amount,currency:tx.currency});
  }catch(error){return res.status(500).json({success:false,message:error.message||'Payment verification failed.'});}
}
