"use server";
import { AddressSchema, GST_IN } from "@/schemas";
import * as z from "zod";
import Razorpay from "razorpay";
import { getUserSession } from "@/actions/userSession";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { Product } from "@/types/type";
import { createHmac } from "crypto";
import { createShipment, trackShipment } from "./delhivery";
import { OrderDetails, sendBill } from "@/lib/mail";
import { PayPalButtonsComponentProps } from "@paypal/react-paypal-js";
import type { CreateOrderActions } from "@paypal/paypal-js";
import { UserData } from "@/components/paymentOptions";
import { User } from 'next-auth';

const PAYPAL_API = process.env.NEXT_PUBLIC_PAYPAL_API_URL!;
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET!;

export const getAccessToken = async () => {
  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString(
      "base64"
    );
    const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    const data = await res.json();
    return data.access_token;
  } catch (e) {
    console.log(e);
    // console.log(`${(e as Error).message} Error in getting access token"`);
  }
};

export type CreatePaypalOrder = {
  amount: number;
  currency: string;
  accessToken: string;
  referenceId: string;
};

export const createPaypalOrder = async ({ amount, currency, accessToken, referenceId,}: CreatePaypalOrder, user : UserData['user']) => {
  try {
    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: referenceId,
            amount: { currency_code: "USD", value: amount.toFixed(2) },
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
              brand_name: "GuruKirpa Ayurveda",
              locale: "en-US",
              landing_page: "LOGIN",
              shipping_preference: "NO_SHIPPING",
              billing_address_preference: "NO_BILLING_ADDRESS",
              user_action: "PAY_NOW",
            //   return_url: "https://example.com/returnUrl",
            //   cancel_url: "https://example.com/cancelUrl",
            },
          },
        },
        application_context: {
          userId : user?.id,
        }
      }),
    });
    const data = await response.json();
    return data.id;
  } catch (e) {
    console.log("Error in creating order", e);
  }
};

//This Function is used to verify the payment From Razorpay
export const verifyPayment = async ( paymentId: string, orderId: string, signature: string ): Promise<boolean> => {
  const secret = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!; // Replace with your actual secret key
  const hmac = createHmac("sha256", secret);
  hmac.update(orderId + "|" + paymentId);
  const generated_signature = hmac.digest("hex");

  if (generated_signature === signature) {
    return true;
  }
  return false;
};


export type CreateOrder = {
   amount: number;
   data: z.infer<typeof AddressSchema>;
   cart: Product[];
   paymentId: string;
   orderId: string;
   currency: string;
   payment_method : string;
   order_date : Date;
   user : UserData['user']
}

// export const createOrder = async ({amount, data, cart, paymentId , orderId,payment_method,order_date, user, currency = "INR" }:CreateOrder): Promise<boolean> => {
//   //amount is in dollars

//   if (!user) throw new Error("User not authenticated");
//   const validatedData = AddressSchema.safeParse(data);
//   if (!validatedData.success) throw new Error("Invalid data");

//   try {
//      await db.order.create({
//         data:{
//            order_id : orderId,
//            userId : user.id!,
//            gateway_order_id : paymentId, 
//            order_status : 'Yet to be dispatch',
//            total_price : amount,
//            shipping_address : validatedData.data,
//            payment_status : 'Yet to be paid',
//            order_date ,
//            payment_method ,
//            shipping_method : 'Delhivery',
//            cart_items : cart
//         }
//      });

//     return true;
//   } catch (e) {
//     console.log(e);
//     throw new Error(`${(e as Error).message} Error in creating order"`);
//   }
// };

export type SuccessPayment = {
   orderId: string;
   paymentId: string;
   gateway_order_id: string;
   amount: number | string;
   paymentGateway : string;
   paymentStatus : string;
   transactionDate : Date;
   taxAndFees :  number | string,   
   webHookResponse ?: unknown
}

export const successPayment = async ({ orderId, paymentId, gateway_order_id, amount, paymentGateway, paymentStatus, transactionDate,taxAndFees, webHookResponse}:SuccessPayment) => {
  const user = await getUserSession();
  if (!user) throw new Error("User not authenticated");
  try {
    await db.transactions.upsert({
      where: {
         payment_id: paymentId,
      },
      update: {
        userId: user?.id!,
      },
      create: {
        order_id: orderId,
        userId: user?.id!,
        payment_id: paymentId,
        gateway_order_id: gateway_order_id,
        payment_status: paymentStatus,
        payment_method: paymentGateway,
        transaction_amount: parseFloat(amount as string),
        taxAndFees : parseFloat(taxAndFees as string),
        currency: "INR",
        transaction_date: transactionDate,
      },
    });

    return true
  } catch (e) {
    console.log(e);
    throw new Error(`${(e as Error).message} Error in creating order"`);
  }
};

export type CreateShipmentOrder ={
   formData: z.infer<typeof AddressSchema>;
   cart: Product[];
   price: number;
   payment_mode: "COD" | "Pre-paid" | "Pickup";
   formDataGST: z.infer<typeof GST_IN>;
   deliveryCharge?: string;
   orderId?: string;
   gateway_order_id?: string;
}

export const createShipmentOrder = async ({ formData, cart, price, payment_mode, formDataGST, deliveryCharge = '0', orderId, gateway_order_id = ""}: CreateShipmentOrder) => {
  const user = await getUserSession();
  if (!user) throw new Error("User not authenticated");

  if (!orderId) {
    const order_id = uuidv4().replace("-", "");
    orderId = `GKPA${order_id}`.substring(0, 45); // Ensure the receipt is within 45 characters
  } else {
    orderId = orderId;
  }

//   const res = await createShipment(formData,orderId,user.name,payment_mode,cart,price,formDataGST );

//   if (res.packages[0].status != "Success")
//     throw new Error("Error in creating shipment");
   const res = {}

  const waybill = "Working";
//   const orderStatus = await trackShipment(waybill);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  await db.$transaction([
    db.shipping.create({
      data: {
        order_id: orderId,
        carrier: "Delhivery",
        tracking_number_waybill: waybill,
        shipping_status:"orderStatus?.ShipmentData?.[0]?.Shipment?.Status.Status",
        delivery_charge: deliveryCharge,
        shipping_address: formData,
        estimated_delivery: new Date(),
        responseDelhivery: res,
      },
    }),

    db.order.upsert({
      where: { order_id: orderId },
      update: {}, // No update operation needed, proceed further if order_id exists
      create: {
        order_id: orderId,
        userId: user?.id!,
        gateway_order_id: gateway_order_id != "" ? gateway_order_id : `${orderId}`,
        order_status: "Order Created",
        total_price: price,
        shipping_address: formData,
        payment_status: payment_mode,
        order_date: new Date(),
        payment_method: payment_mode,
        shipping_method: "Delhivery",
        cart_items: cart,
      },
    }),
  ]);

  const deliveryChargeInt = parseFloat(deliveryCharge);
//   const transaction_date = new Date(orderStatus?.ShipmentData?.[0]?.Shipment?.PickUpDate);
//   const expectedDeliveryDate = new Date(orderStatus?.ShipmentData?.[0]?.Shipment?.ExpectedDeliveryDate);
//   const promisedDelivery = new Date(orderStatus?.ShipmentData?.[0]?.Shipment?.PromisedDeliveryDate);
  const transaction_date = new Date();
  const expectedDeliveryDate = new Date(new Date().setDate(new Date().getDate() + 7));
  const promisedDelivery = new Date(new Date().setDate(new Date().getDate() + 7));
  
  const data: OrderDetails = {
    orderId: orderId,
    name: user.name,
    userEmail: user.email,
    userGST: formDataGST.gst_in,
    address: formData.address + " " + formData.city + " " + formData.state + " " + formData.zip,
    price: price,
    waybill: waybill,
    products: cart,
    paymentMode: payment_mode,
    deliveryCharge: deliveryChargeInt,
    transaction_date: transaction_date.toLocaleString("en-US", dateOptions).replace(",", " on"),
    expectedDelivery: expectedDeliveryDate.toLocaleString("en-US", dateOptions).replace(",", " on"),
    promisedDelivery: promisedDelivery.toLocaleString("en-US", dateOptions).replace(",", " on"),
  };

  await sendBill(data); //mail to user
  return { success: true, waybill: waybill };
};
