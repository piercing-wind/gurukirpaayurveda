import { Product } from "@/types/type";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";


const sesClient = new SESClient({
   region: 'ap-south-1',
   credentials: {
     accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!,
     secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY!
   }
 });
export const sendPasswordResetEmail = async (name: string, email: string, token: string, callbackUrl?: string, plan?: string) => {
   try{
      const sendEmail = async (toEmail: string, subject: string, message: string) => {
         const params = {
           Destination: {
             ToAddresses: [toEmail]
           },
           Message: {
             Body: {
               Html: {
                 Charset: "UTF-8",
                 Data: message
               },
               Text: {
                 Charset: "UTF-8",
                 Data: message
               }
             },
             Subject: {
               Charset: 'UTF-8',
               Data: subject
             }
           },
           Source: 'Gurukirpa Ayurveda <gurukirpaayurveda@vaidgurmeetsingh.com>' 
         };
         try {
            const data = await sesClient.send(new SendEmailCommand(params));
            console.log(`Email sent: ${data.MessageId}`);
          } catch (err) {
            console.error(err);
          }
       };
       const html = `
       <div style="width: 100%; max-width: 600px; margin: auto; background: radial-gradient(circle, rgba(255, 215, 122, 0.4), rgba(224, 224, 224, 0.4)); padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
             <div style="text-align: center; margin-bottom: 20px;">
                 <img src="/GurukirpaAyurveda.svg" alt="Gurukirpa Ayurveda Logo" style="max-width: 100%; height: auto;">
             </div>

             <h1 style="color: #B88E2F; font-size: 2.5rem; text-align: center;">Welcome, ${name}</h1>
             <p style="font-size: 1rem; text-align: center;">Click the link below to change your password:</p>
             <div style="text-align: center; margin: 50px;">
                 <a href="${process.env.NEXTAUTH_URL}/new-password?token=${token}" style="background-color: #B88E2F; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 1.2rem;">Change Password</a>
             </div>
             <p style="font-size: 1rem; text-align: center; margin-top: 20px;">If you did not request a password change, please disregard this email. If you have any questions, feel free to contact our support team.</p>
             <br>
             <p style="font-size: 14px; color: #777; text-align: center;">Best regards,<br>The Gurukirpa Ayurveda Team</p>
             <p style="font-size: 14px; color: #777; text-align: center;">© 2024 Gurukirpa Ayurveda</p>
         </div>


         <style>
         @media only screen and (max-width: 400px) {
             h1 {
                 font-size: 1.5rem;
             }
             p {
                 font-size: 0.6rem;
             }
             a {
                 padding: 10px 10px;
                 font-size: 1rem;
             }
             div[style*="margin: 50px;"] {
                 margin: 30px;
             }
         }
         </style>
    `

    sendEmail(email, 'Reset Your Password', html);

   }catch(e){
      console.log(e);
   }
}

export const sendVerificationEmail = async (name: string, email: string, token: string, callbackUrl?: string, plan?: string) => {
   try {
    const sendEmail = async (toEmail: string, subject: string, message: string) => {
       const params = {
         Destination: {
           ToAddresses: [toEmail]
         },
         Message: {
           Body: {
             Html: {
               Charset: "UTF-8",
               Data: message
             },
             Text: {
               Charset: "UTF-8",
               Data: message
             }
           },
           Subject: {
             Charset: 'UTF-8',
             Data: subject
           }
         },
         Source: 'Gurukirpa Ayurveda  <gurukirpaayurveda@vaidgurmeetsingh.com>' 
       };
       try {
          const data = await sesClient.send(new SendEmailCommand(params));
          console.log(`Email sent: ${data.MessageId}`);
        } catch (err) {
          console.error(err);
        }
     };
     const html = `
       <div style="width: 100%; max-width: 600px; margin: auto; background: radial-gradient(circle, rgba(255, 215, 122, 0.4), rgba(224, 224, 224, 0.4)); padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
             <div style="text-align: center; margin-bottom: 20px;">
                 <img src="/GurukirpaAyurveda.svg" alt="Gurukirpa Ayurveda Logo" style="max-width: 100%; height: auto;">
             </div>

             <h1 style="color: #B88E2F; font-size: 2.5rem; text-align: center;">Welcome, ${name}</h1>
             <p style="font-size: 1rem; text-align: center;">Thank you for Choosing Gurukirpa Ayurveda. To complete your registration, please verify your email address by clicking the button below:</p>
             <div style="text-align: center; margin: 50px;">
                 <a href="${process.env.NEXTAUTH_URL}/new-verification?token=${token}" style="background-color: #B88E2F; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 1.2rem;">Verify Email</a>
             </div>
             <p style="font-size: 1rem; text-align: center; margin-top: 20px;">If you did not sign up for this account, please disregard this email. If you have any questions, feel free to contact our support team.</p>
             <br>
             <p style="font-size: 14px; color: #777; text-align: center;">Best regards,<br>The Gurukirpa Ayurveda Team</p>
             <p style="font-size: 14px; color: #777; text-align: center;">© 2024 Gurukirpa Ayurveda</p>
         </div>


         <style>
         @media only screen and (max-width: 400px) {
             h1 {
                 font-size: 1.5rem;
             }
             p {
                 font-size: 0.6rem;
             }
             a {
                 padding: 10px 10px;
                 font-size: 1rem;
             }
             div[style*="margin: 50px;"] {
                 margin: 30px;
             }
         }
         </style>
    `
    sendEmail(email, 'Verify Your Email Address', html);
 
   } catch (e) {
     console.log(e);
   }
 };
 const generateOrderItemsHTML = (orderItems: Product[]) => {
   return orderItems.map(item => `
     <div style="margin-bottom: 10px;">
       <p style="font-size: 1rem;"><strong>Product Name:</strong> ${item.name}</p>
       <p style="font-size: 1rem;"><strong>Quantity:</strong> ${item.quantity}</p>
       <p style="font-size: 1rem;"><strong>Price:</strong> ₹${item.price.toFixed(2)}</p>
     </div>
   `).join('');
 };



 export interface OrderDetails {
   name: string;
   userEmail: string;
   userGST: string;
   address: string;
   orderId: string;
   waybill: string;
   products: Product[]; // Assuming products is an array, you can define a more specific type if needed
   paymentMode: string;
   price: number;
   deliveryCharge: number;
 }
 
export const sendBill = async (mail:OrderDetails) => {
   const {name, userEmail, userGST, address, orderId, waybill, products, paymentMode, price, deliveryCharge} = mail;
   try {
    const sendEmail = async (toEmail: string, subject: string, message: string) => {
       const params = {
         Destination: {
           ToAddresses: [toEmail]
         },
         Message: {
           Body: {
             Html: {
               Charset: "UTF-8",
               Data: message
             },
             Text: {
               Charset: "UTF-8",
               Data: message
             }
           },
           Subject: {
             Charset: 'UTF-8',
             Data: subject
           }
         },
         Source: 'Gurukirpa Ayurveda  <gurukirpaayurveda@vaidgurmeetsingh.com>' 
       };
       try {
          const data = await sesClient.send(new SendEmailCommand(params));
          console.log(`Email sent: ${data.MessageId}`);
        } catch (err) {
          console.error(err);
        }
     };
     const html = `
<div style="width: 100%; max-width: 600px; margin: auto; background: radial-gradient(circle, rgba(255, 215, 122, 0.4), rgba(224, 224, 224, 0.4)); padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="/GurukirpaAyurveda.svg" alt="Gurukirpa Ayurveda Logo" style="max-width: 100%; height: auto;">
  </div>

  <h1 style="color: #B88E2F; font-size: 2.5rem; text-align: center;">To, ${name}</h1>
     <div style="margin: 20px 0;">
      <p style="font-size: 1rem;"><strong>Email:</strong> ${userEmail}</p>
      <p style="font-size: 1rem;"><strong>GST Number:</strong> ${userGST}</p>
      <p style="font-size: 1rem;"><strong>Shipping Address:</strong> ${address}</p>
     </div>

  <p style="font-size: 1rem; text-align: center;">Thank you for your order. Here are the details:</p>

  <div style="margin: 20px 0;">
    <p style="font-size: 1rem;"><strong>Order ID:</strong> ${orderId}</p>
    <p style="font-size: 1.5rem;"><strong>Tracking ID:</strong> ${waybill}</p>
    
      <div style="margin: 20px 0;">
        <h2 style="font-size: 1.5rem; color: #B88E2F;">Order Items:</h2>
        ${generateOrderItemsHTML(products)}
      </div>
    <p style="font-size: 1rem;"><strong>Shipping Address:</strong> ${address}</p>
    <p style="font-size: 1rem;"><strong>Shipping Method:</strong> Delhivery</p>
    
    <p style="font-size: 1rem;"><strong>Payment Method:</strong> ${paymentMode}</p>
      <p style="font-size: 1rem;"><strong>Total Price:</strong> ₹${price.toFixed(2)}</p>
      <p style="font-size: 1rem;"><strong>Delivery Charge:</strong> ₹${deliveryCharge.toFixed(2)}</p>
      <p style="font-size: 1rem;"><strong>GST (12%) Including:</strong> ₹${((price + deliveryCharge) * 0.12).toFixed(2)}</p>
      <p style="font-size: 1rem;"><strong>Total Amount:</strong> ₹${(price + deliveryCharge).toFixed(2)}</p>
  </div>

  <p style="font-size: 1rem; text-align: center;">If you have any questions, feel free to contact our support team.</p>
  <br>
  <p style="font-size: 14px; color: #777; text-align: center;">Best regards,<br>The Gurukirpa Ayurveda Team</p>
  <p style="font-size: 14px; color: #777; text-align: center;">© 2024 Gurukirpa Ayurveda</p>
</div>

<style>
@media only screen and (max-width: 400px) {
  h1 {
    font-size: 1.5rem;
  }
  p {
    font-size: 0.6rem;
  }
  div[style*="margin: 20px 0;"] {
    margin: 10px 0;
  }
}
</style>
    `
    sendEmail(userEmail, `Purchase on Gurukirpa Ayurveda Track Id ${waybill}`, html);
 
   } catch (e) {
     console.log(e);
   }
 };