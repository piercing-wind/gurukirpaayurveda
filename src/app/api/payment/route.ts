import { db } from '@/lib/db';
import crypto from 'crypto';
import { NextRequest } from 'next/server';
function validateRazorpaySignature(body: string, receivedSignature: string, secret: string): boolean {
   const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');

   return receivedSignature === expectedSignature;
 }

 export async function GET(){
   return Response.json({ response: 'Forbidden Way, You are lost!', message: 'Guru Kirpa have restricted your access access :)'},{status: 403 });
}

export async function POST(req : NextRequest){
   try{
   const razorpay = await req.json();
   const signature = req.headers.get('x-razorpay-signature');
   if(!signature) return  Response.json({ response: 'Forbidden', message: 'Signature is Missing'},{status: 403 });
   if(!validateRazorpaySignature(JSON.stringify(razorpay), signature, process.env.RAZOR_PAY_SECRET!)) return Response.json({ response: 'Access Ristricted', message: 'Invalid Signature'},{status: 403 });
   
   const payment = razorpay.payload.payment.entity;

   // Process the payment here
   if(razorpay.event === 'payment.captured'){
      await db.$transaction([
         db.order.update({
            where:{
               order_id: payment.order_id
            },
            data:{
               payment_status : payment.status,
               payment_method : payment.method,
            }
         }),
         db.transactions.upsert({
            where: {
                razorpay_payment_id: payment.id
            },
            update: {
                payment_status: payment.status,
                payment_method: payment.method,
                transaction_amount: payment.amount / 100,
                transaction_date: new Date(payment.created_at * 1000),
                razorpay_response: razorpay
            },
            create: {
                order_id: payment.order_id,
                userId : payment.notes.userId,
                razorpay_payment_id: payment.id,
                razorpay_order_id: payment.order_id,
                payment_status: payment.status,
                payment_method: payment.method,
                transaction_amount: payment.amount / 100,
                currency: payment.currency,
                transaction_date: new Date(payment.created_at * 1000),
                razorpay_response: razorpay,
            }
        })
      ])
   }

  
   return Response.json({ response: 'ok', message: 'Action processed successfully'},{status: 200 });
   }catch(e){
      console.log("Error",e);
   }
   return Response.json({ response: 'ok', message: 'Action processed successfully'},{status: 200 });
}