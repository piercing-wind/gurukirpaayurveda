import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { SuccessPayment, successPayment } from '@/actions/billing-form';


const {PHONEPE_API_KEY} = process.env;

export async function POST(req: NextRequest) {
  try {

    const payload = await req.text(); // Read the raw body as text
    const receivedChecksum = req.headers.get('x-verify') as string;
    if (!receivedChecksum) {
      return Response.json({ error: 'Unauthorized', message: 'Checksum missing' }, { status: 401 });
    }
    const body = JSON.parse(payload);

    // Extract the salt index from the received checksum 
    const [receivedChecksumValue, saltIndex] = receivedChecksum.split('###');

    // Ensure the salt index is 1
    if (saltIndex !== '1') {
      return Response.json({ error: 'Unauthorized', message: 'Invalid salt index' }, { status: 401 });
    }

    // Generate the expected checksum
    const expectedChecksum = crypto.createHash('sha256')
    .update(body.response + PHONEPE_API_KEY)
    .digest('hex');

    if (receivedChecksumValue !== expectedChecksum) {
      return Response.json({ error: 'Unauthorized', message: 'Checksum validation failed' }, { status: 401 });
    }

    const decodedPayload = Buffer.from(body.response, 'base64').toString('utf-8');
    const data = JSON.parse(decodedPayload);
    
    // Process the callback payload
   

    if(data.success !== true || data.data.state !== "COMPLETED" || data.data.responseCode !== "SUCCESS") {
      return Response.json({ error: 'Payment Failed', message: 'Payment failed' }, { status: 400 });
    }

    const saveTransactionData : SuccessPayment = {
         orderId: data.data.merchantTransactionId,
         paymentId: data.data.transactionId,
         gateway_order_id: data.data.transactionId,
         amount: data.data.amount / 100,
         paymentGateway: 'PhonePe',
         paymentStatus: data.data.state,
         transactionDate: new Date(),
         taxAndFees: '0',
         webHookResponse: data
    }
    const saveTransaction = await successPayment(saveTransactionData)

   if(saveTransaction){
      return Response.json({ response: 'ok', message: 'Action processed successfully' }, { status: 200 });
   }

    return Response.json({ response: 'ok', message: 'Action processed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing callback:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}