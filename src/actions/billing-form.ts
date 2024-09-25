'use server'
import { AddressSchema, GST_IN } from '@/schemas';
import * as z from 'zod';
import Razorpay from 'razorpay';
import { getUserSession } from '@/actions/userSession';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { Product } from '@/types/type';
import { createHmac } from 'crypto';
import { createShipment, trackShipment } from './delhivery';
import { OrderDetails, sendBill } from '@/lib/mail';


const razorpayInstance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export const verifyPayment = async (paymentId: string, orderId: string, signature: string) : Promise<boolean> => {
   const secret = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!; // Replace with your actual secret key
   const hmac = createHmac('sha256', secret);
   hmac.update(orderId + "|" + paymentId);
   const generated_signature = hmac.digest('hex');
   
   if (generated_signature === signature) {
      return true;
   }
   return false;
}

export const createOrder = async (amount: number, data : z.infer<typeof AddressSchema>, cart : Product[], currency='INR') => {
   const user = await getUserSession();
   if (!user) throw new Error("User not authenticated");
   const validatedData = AddressSchema.safeParse(data);
   if (!validatedData.success) throw new Error("Invalid data");

   try{
      const shortUuid = uuidv4().split('-')[0]; // Shorten the UUID
      const receipt = `receipt#${shortUuid}`.substring(0, 39); // Ensure the receipt is within 40 characters
      
      const order = await razorpayInstance.orders.create({
         amount: amount,
         currency: currency,
         receipt: receipt,
         notes: {
            userId : user?.id!,
            name : user?.name!,
            email : user?.email!,
         }
      });

       await db.order.create({
          data:{
             order_id : order.id,
             userId : user?.id!,
             order_status : 'Yet to be dispatch',
             total_price : amount / 100,
             shipping_address : validatedData.data,
             payment_status : order.status,
             order_date : new Date(order.created_at * 1000),
             payment_method : 'Yet to be paid',
             shipping_method : 'Delhivery',
             cart_items : cart
          }
       });
    
      return order;
   }catch(e){
      console.log(e);
      throw new Error(`${(e as Error).message} Error in creating order"`);
   }
};


export const successPayment = async (orderId : string, razorpay_payment_id: string,razorpay_order_id: string, razorpay_signature : string, amount : number | string)=>{
   const user = await getUserSession();
   if (!user) throw new Error("User not authenticated");
   try{

      await db.transactions.upsert({
            where: {
                razorpay_payment_id: razorpay_payment_id
            },
            update: {
                userId: user?.id!
            },
            create: {
                order_id: orderId,
                userId: user?.id!,
                razorpay_payment_id: razorpay_payment_id,
                razorpay_order_id: razorpay_order_id,
                payment_status: 'Paid',
                payment_method: 'Razorpay',
                transaction_amount: amount as number,
                currency: 'INR',
                transaction_date: new Date(),
            }
        })
      
      return {status : 'captured', orderId : orderId};
   }catch(e){
      console.log(e);
      throw new Error(`${(e as Error).message} Error in creating order"`);
   }
}


export const createShipmentOrder = async (formData : z.infer<typeof AddressSchema>, cart : Product[], price : number, payment_mode : 'COD' | 'Pre-paid' | 'Pickup', deliveryCharge: string,formDataGST : any ,rzp_order_id ?: string )=>{
   const user = await getUserSession();
   if (!user) throw new Error("User not authenticated");

   let orderId: string;

   if (!rzp_order_id) {
     const order_id = uuidv4().split('-')[0];
     orderId = `GKPA${order_id}`.substring(0, 39); // Ensure the receipt is within 40 characters
   } else {
     orderId = rzp_order_id;
   }
  
   const res = await createShipment(formData, orderId, user.name, payment_mode, cart, price, formDataGST);
   
   if (res.packages[0].status != 'Success') throw new Error("Error in creating shipment");

   const waybill = res.packages[0].waybill;
   const orderStatus = await trackShipment(waybill);
   

   await db.$transaction([
   db.shipping.create({
      data:{
         order_id : orderId,
         carrier : 'Delhivery',
         tracking_number_waybill : res.packages[0].waybill,
         shipping_status : orderStatus?.ShipmentData?.[0]?.Shipment?.Status.Status,
         delivery_charge : deliveryCharge,
         shipping_address : formData,
         estimated_delivery : new Date() ,
         responseDelhivery : res
      }
   }),

   db.order.create({
        data:{
           order_id : orderId,
           userId : user?.id!,
           order_status : 'Order Created',
           total_price : price,
           shipping_address : formData,
           payment_status : payment_mode,
           order_date : new Date(),
           payment_method : payment_mode,
           shipping_method : 'Delhivery',
           cart_items : cart
        }
     })
   ]) 
   const  deliveryAmmout = payment_mode != 'COD' ? parseFloat(deliveryCharge) : 0;
   const billPrice = payment_mode != 'COD' ? price - deliveryAmmout : price;

   const data :OrderDetails = {
      orderId: orderId,
      name : user.name,
      userEmail : user.email,
      userGST : formDataGST.gst_in,
      address : formData.address + ' ' + formData.city + ' ' + formData.state + ' ' + formData.zip,
      price:billPrice,
      waybill: waybill,
      products: cart,
      paymentMode: payment_mode,
      deliveryCharge: deliveryAmmout,
    };
      await sendBill(data);
   return {success : true, waybill : res.packages[0].waybill};
}

