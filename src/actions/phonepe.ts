'use server'
import crypto from 'crypto';

const PHONEPE_MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID!;
const PHONEPE_API_KEY = process.env.PHONEPE_API_KEY!;
const PHONEPE_BASE_URL = 'https://api.phonepe.com/apis/hermes/pg/v1/pay';


 interface PaymentPayload {
   merchantId: string;
   merchantTransactionId: string;
   merchantUserId: string;
   amount: number;
   redirectUrl: string;
   redirectMode: string;
   callbackUrl: string;
   paymentInstrument: {
     type: string;
   };
   mobileNumber?: string;
 }
 
 export const initiatePayment = async (amount: number, orderId: string, userId: string, mobileNumber: string, callbackUrl: string): Promise<string> => {
      if (!PHONEPE_API_KEY) {
        console.log(PHONEPE_API_KEY);
        throw new Error('PHONEPE_API_KEY is not defined');
      }
      
      console.log(orderId);

      const payload: PaymentPayload = {
        merchantId: PHONEPE_MERCHANT_ID,
        merchantTransactionId: orderId,
        merchantUserId: userId,
        amount: amount * 100, // Amount in paise
        redirectUrl: 'https://vaidgurmeetsingh.com/success',
        redirectMode: 'REDIRECT',
        callbackUrl: callbackUrl,
        paymentInstrument: {
          type: 'PAY_PAGE',
        },
        mobileNumber: mobileNumber,
      };
    
      const payloadString = JSON.stringify(payload, null, 2);
      const base64Payload = Buffer.from(payloadString).toString('base64');
      const saltIndex = 1;
      const endpoint = "/pg/v1/pay";
      const checksumString = base64Payload + endpoint + PHONEPE_API_KEY;

      const checksum = crypto.createHash('sha256')
                       .update(checksumString)
                       .digest('hex') + `###${saltIndex}`;
      
      console.log('Base64 Payload:', base64Payload);
      console.log('Checksum:', checksum);
    
      try {
        const response = await fetch(`${PHONEPE_BASE_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': checksum, 
          },
          body: JSON.stringify({ request: base64Payload }),
        });
    

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Response Error:', errorText);
          throw new Error(`Failed to initiate payment: ${response.statusText}`);
        }
    
        const data = await response.json();
        if (data.success && data.data && data.data.instrumentResponse && data.data.instrumentResponse.redirectInfo) {
          return data.data.instrumentResponse.redirectInfo.url;
        } else {
          throw new Error('Failed to retrieve payment URL');
        }
      } catch (error) {
        console.error('Error initiating payment:', error);
        throw error;
      }
    };