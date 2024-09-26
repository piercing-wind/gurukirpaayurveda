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
 function generateOrderItemsHTML(products :Product[]) {
   return `
     <table style="width: 100%; border-collapse: collapse; font-size:0.7rem;">
       <thead>
         <tr>
           <th style="border: 1px solid #ddd; padding: 8px;">Product Name</th>
           <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
           <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
           <th style="border: 1px solid #ddd; padding: 8px;">Category</th>
           <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
           <th style="border: 1px solid #ddd; padding: 8px;">Discount</th>
           <th style="border: 1px solid #ddd; padding: 8px;">Discounted Price</th>
         </tr>
       </thead>
       <tbody>
       ${products.map(product => {
         const discountPercentage = parseFloat(product.discount) / 100;
         const discountedPrice = product.price - (product.price * discountPercentage);
         return `
           <tr>
             <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name}</td>
             <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${product.quantity}</td>
             <td style="border: 1px solid #ddd; padding: 8px;">${product.description.length > 50 ? product.description.substring(0, 50) + '...' : product.description}</td>
             <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${product.category}</td>
             <td style="border: 1px solid #ddd; padding: 8px; white-space: nowrap; text-align: center;">₹ ${product.price.toFixed(2)}</td>
             <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${product.discount}</td>
             <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">₹ ${(discountedPrice * product.quantity).toFixed(2) }</td>
           </tr>
         `;}).join('')}
       </tbody>
     </table>
   `;
 }


 export interface OrderDetails {
   name: string;
   userEmail: string;
   userGST: string;
   address: string;
   orderId: string;
   waybill: string;
   products: Product[]; 
   paymentMode: string;
   price: number;
   deliveryCharge: number;
   transaction_date : string;
   expectedDelivery : string;
   promisedDelivery : string;
 }
 
export const sendBill = async (mail:OrderDetails) => {
   const {name, userEmail, userGST, address, orderId, waybill, products, paymentMode, price, deliveryCharge, transaction_date,expectedDelivery, promisedDelivery} = mail;
   try {
    const sendEmail = async (toEmail: string, subject: string, message: string) => {
       const params = {
         Destination: {
           ToAddresses: [toEmail],
           BccAddresses: ['gurukirpaayurveda@vaidgurmeetsingh.com']
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
          await sesClient.send(new SendEmailCommand(params));
        } catch (err) {
          console.error(err);
        }
     };
     const html = `
    <html>
      <head>
        <title>Order Confirmation</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Poppins', sans-serif;
            height: 100vh;
            letter-spacing: 0.5px;
          }
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
      </head>
      <body>
        <div style="width: 100%; max-width: 700px; margin: auto; background: radial-gradient(circle, rgba(255, 215, 122, 0.4), rgba(224, 224, 224, 0.4)); padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="/GurukirpaAyurveda.svg" alt="Gurukirpa Ayurveda Logo" style="max-width: 100%; height: auto;">
          </div>
          <h1 style="color: #B88E2F; font-size: 2.5rem; text-align: center;">To, ${name}</h1>
          <h6 style="font-size: 1rem; text-align: center; margin-top:-20px; margin-bottom:20px; letter-spacing:0.5px">Thank you so much for your order! We’re happy to have you as a customer and really appreciate your support and trust.</h6>
          <h6 style="font-size: 1rem; text-align: center; margin-top:20px; color:#B88E2F; letter-spacing:2px">Invoice</h6>
          <div style="margin: 20px 0; margin-top:-10px;">
            <p style="font-size: 0.8rem;"><strong style="font-size: 0.9rem;">Email : </strong> ${userEmail}</p>
            ${userGST && userGST.length > 5 ? `<p style="font-size: 0.8rem; margin-top:-12px"><strong>GST Number :</strong> ${userGST}</p>`: ''}
            <p style="font-size: 0.8rem; margin-top:-12px"><strong>Shipping Address:</strong> ${address}</p>
            <p style="font-size: 0.8rem; margin-top:-12px"><strong>Order Date :</strong> ${transaction_date}</p>
            <p style="font-size: 0.8rem; margin-top:-12px"><strong>Shipping Method:</strong> Delhivery</p>
          </div>
          <p style="font-size: 1rem; text-align: center; border-top:2px dashed #B88E2F; "/>
          <div style="margin: 20px 0;">
            <p style="font-size: 1rem;"><strong>Order ID :</strong> ${orderId}</p>
            <p style="font-size: 1rem; margin-top:-10px"><strong>Tracking ID :</strong> ${waybill}</p>
            <div style="margin: 20px 0;">
              <h2 style="font-size: 1.5rem; color: #B88E2F;">Order Items:</h2>
              ${generateOrderItemsHTML(products)}
            </div>
            <table style="width: 100%; font-size: 0.8rem; border-collapse: collapse;">
              <tr>
                <td style="text-align: right; ">Total Price :</td>
                <td style="text-align: right; width:100px;font-weight: 600;">₹ ${price.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="text-align: right; ">Delivery Charge :</td>
                <td style="text-align: right; font-weight: 600;">+ ₹ ${deliveryCharge.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="text-align: right; ">Payment Method :</td>
                <td style="text-align: right; font-weight: 600;">${paymentMode}</td>
              </tr>
              <tr>
                <td style="text-align: right; ">GST (12%) Including :</td>
                <td style="text-align: right; font-weight: 600;">₹ ${((price + deliveryCharge) * 0.12).toFixed(2)}</td>
              </tr>
              </table>

               <div style="display: flex; justify-content: flex-end; align-items: center; font-size: 1rem; margin-left: auto; text-align: right;">
                 <p style="margin-right: 10px; font-size: 1rem; border-top: 2px dashed #B88E2F; border-bottom: 2px dashed #B88E2F; padding-top: 12px; padding-bottom: 12px; margin-left:auto;">Total Amount :</p>
                 <p style="font-size: 1rem; font-weight: 600; color: #B88E2F; border-top: 2px dashed #B88E2F; border-bottom: 2px dashed #B88E2F; padding-top: 12px; padding-bottom: 12px;">₹ ${(price + deliveryCharge).toFixed(2)}</p>
               </div>
              <p style="font-size:0.6rem;"><strong style=" color:#B88E2F;">Promised Delivery Date : </strong>${promisedDelivery}</p>
              <p style="font-size:0.6rem; margin-top:-8px"><strong style=" color:#B88E2F;">Expected Delivery Date : </strong>${expectedDelivery}</p>

            </div>
         <div>
                <p style="">Gurukirpa Ayurveda</p>
                <p style="margin-top:-12px; font-weight:600; font-size:0.6rem;">GST IN : 03GJNPS3051M1ZR</p>
               <p style="margin-top:-8px; font-size:0.7rem;"><strong>Address : </strong>Shop No 13, Bus Stand, Bachre, Tarn Taran Sahib, Punjab 143401</p>
               <p style="margin-top:-8px; font-size:0.7rem;">
                 <strong>Phone : </strong> 
                 <a href="tel:+919513651313" style="color: inherit; text-decoration: none;">+91 951 365 1313</a>
               </p>
               <p style="margin-top:-8px; font-size:0.7rem;">
                 <strong>Email : </strong> 
                 <a href="mailto:gurukirpaayurveda@vaidgurmeetsing.com" style="color: inherit; text-decoration: none;">gurukirpaayurveda@vaidgurmeetsingh.com</a>
               </p>
               <p style="margin-top:-8px; font-size:0.7rem;">
                 <strong>Website : </strong> 
                 <a href="http://www.vaidgurmeetsingh.com" target="_blank" style="color: inherit; text-decoration: none;">www.vaidgurmeetsingh.com</a>
               </p>
            </div>
               <p style="margin-top:8px; font-size:0.8rem;"> Follow Us : <a href="https://www.facebook.com/vaidgurmeetsingh" target="_blank" style="text-decoration:none;" >Facebook</a> | <a href="https://www.instagram.com/vaid.gurmeetsingh?igsh=dGo3ODNzdmdhajU4" target="_blank" style="text-decoration:none;">Instagram</a> | <a href="https://youtube.com/@vaidgurmeetsingh6207?si=0CgC7tNLjlGgQMVB" target="_blank" style="text-decoration:none;">Youtube</a> </p>
               <p style="margin-top:8px; font-size:0.8rem;">Location : <a href="https://maps.app.goo.gl/WLHH6QXiXdx4Gfdh7" target="_blank" style="text-decoration:none;">Google Map</a> </p>
              <p style="letter-spacing:5px; color:#B88E2F; text-align:center">*****</p>
               
               <p style="font-size: 0.7rem; text-align: center; margin-top:40px"><strong>Note :</strong> This is an auto-generated bill hence no signature is required.</p>
            <div style="margin-left:auto; margin-top:30px; margin-right:auto; width:70%; border-top:1px solid #B88E2F;"/>
            <p style="font-size: 1rem; text-align: center; margin-top:40px">If you have any questions, feel free to contact our support team.</p>
          <br>
          <p style="font-size: 14px; color: #777; text-align: center;">Best regards,<br>The Gurukirpa Ayurveda Team</p>
          <p style="font-size: 14px; color: #777; text-align: center;">© 2024 Gurukirpa Ayurveda</p>
        </div>
      </body>
    </html>
  `
    
    sendEmail(userEmail, `Purchase on Gurukirpa Ayurveda Track Id ${waybill}`, html);
 
   } catch (e) {
     console.log(e);
   }
 };