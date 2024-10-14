import { db } from '@/lib/db';
import crypto from 'crypto';
import { NextRequest } from 'next/server';
import crc32 from 'crc-32';
import { getAccessToken } from '@/actions/billing-form';


export async function GET(){
   return Response.json({ response: 'Forbidden Way, You are lost!', message: 'Guru Kirpa have restricted your access access :)'},{status: 403 });
}

// Utility function to fetch PayPal public certificate
async function fetchPaypalCert(certUrl: string): Promise<string> {
   const response = await fetch(certUrl);
   return await response.text();
 }

 async function getCaptureDetails(captureId: string, accessToken: string) {
   const response = await fetch(`${process.env.NEXT_PUBLIC_PAYPAL_API_URL!}/v2/payments/captures/${captureId}`, {
     method: 'GET',
     headers: {
       Authorization: `Bearer ${accessToken}`,
       'Content-Type': 'application/json',
     },
   });

   if (!response.ok) {
     console.log("Error",response.statusText);
     throw new Error(`Error fetching capture details: ${response.statusText}`);
   }
 
   const captureDetails = await response.json();
   return captureDetails;
 }

 async function getOrderDetails(orderId: string, accessToken: string) {
   const response = await fetch(`${process.env.NEXT_PUBLIC_PAYPAL_API_URL!}/v2/checkout/orders/${orderId}`, {
     method: 'GET',
     headers: {
       Authorization: `Bearer ${accessToken}`,
       'Content-Type': 'application/json',
     },
   });
 
   if (!response.ok) {
     throw new Error(`Error fetching order details: ${response.statusText}`);
   }
 
   const orderDetails = await response.json();
   return orderDetails;
 }
 //

 async function verifyPaypalWebhook(body: string, headers: Headers, webhookId: string): Promise<boolean> {
   const transmissionId = headers.get('paypal-transmission-id')!;
   const transmissionTime = headers.get('paypal-transmission-time')!;
   const transmissionSig = headers.get('paypal-transmission-sig')!;
   const certUrl = headers.get('paypal-cert-url')!;
   const authAlgo = headers.get('paypal-auth-algo')!;
 
   // Validate the algorithm
   const validAlgorithms = crypto.getHashes();
   if (!validAlgorithms.includes(authAlgo.split('with')[0].toLowerCase())) {
     console.error(`Invalid algorithm: ${authAlgo}`);
     return false;
   }
 
   try {
     // Step 1: Fetch PayPal's public certificate
     const paypalCert = await fetchPaypalCert(certUrl);
 
     // Step 2: Compute CRC32 checksum of the body in decimal form
     const crc32Checksum = crc32.str(body) >>> 0; // Ensure unsigned 32-bit integer
 
     // Step 3: Concatenate the required values
     const expectedSignatureString = `${transmissionId}|${transmissionTime}|${webhookId}|${crc32Checksum}`;
 
     // Step 4: Create the signature using the specified algorithm
     const verifier = crypto.createVerify('RSA-SHA256');
     verifier.update(expectedSignatureString, 'utf8');
     verifier.end();
 
     // Step 5: Verify the signature using PayPal's public certificate
     const isValid = verifier.verify(paypalCert, transmissionSig, 'base64');
 
     return isValid;  // Return true or false based on signature validity
   } catch (error) {
     console.error('Error verifying PayPal webhook:', error);
     return false;  // Return false in case of any errors
   }
 }
 


export async function POST(req : NextRequest){
   try{
      const body = await req.text();
      const headers = req.headers;
      const paypal = JSON.parse(body);
      const webhookId = process.env.PAYPAL_WEBHOOK_ID!;
      const isSignatureValid = await verifyPaypalWebhook(body, headers, webhookId);
      if (!isSignatureValid) {
         return Response.json({ response: 'Access Restricted', message: 'Invalid Signature' }, { status: 403 });
      }   

      const accessToken = await getAccessToken();
      const captureDetails = await getCaptureDetails(paypal.resource.id, accessToken);
      const orderId = captureDetails.supplementary_data.related_ids.order_id;

      const orderDetails = await getOrderDetails(orderId, accessToken);
      const referenceId = orderDetails.purchase_units[0].reference_id;
  
      const userId = paypal.resource.userId || orderDetails.payer.payer_id;

      console.log("Paypal Webhook",paypal);
   // Process the payment here

      const amount = parseFloat((paypal.resource.amount.value * parseFloat(process.env.NEXT_PUBLIC_EXCHANGE_RATE_FOR_DOLLAR ?? '84')).toFixed(2));
      const tax = (amount * 0.05) + (0.036 * parseFloat(process.env.NEXT_PUBLIC_EXCHANGE_RATE_FOR_DOLLAR ?? '84'));

   if(paypal.event_type === 'PAYMENT.CAPTURE.COMPLETED'){
      await db.$transaction([
         db.order.update({
            where:{
               gateway_order_id: paypal.resource.id
            },
            data:{
               payment_status : paypal.resource.status,
               order_date: paypal.resource.create_time,
            }
         }),
         db.transactions.upsert({
            where: {
               payment_id: paypal.resource.id
            },
            update: {
                payment_status: paypal.resource.status,
                transaction_amount:amount,
                transaction_date: paypal.resource.create_time,
                taxAndFees :tax,
                currency: "INR",
                webHookResponse: paypal,
            },
            create: {
                order_id: referenceId,
                userId : userId,
                payment_id : paypal.resource.id,
                gateway_order_id: orderId,
                payment_status: paypal.resource.status,
                payment_method: 'PayPal',
                transaction_amount: amount,
                taxAndFees :tax,
                currency: "INR",
                transaction_date: paypal.resource.create_time,
                webHookResponse: paypal,
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