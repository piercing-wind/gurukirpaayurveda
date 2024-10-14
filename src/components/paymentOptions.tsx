'use client'
import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import type { CreateOrderActions, CreateOrderData } from "@paypal/paypal-js";
import CSS from "@/app/checkout/checkout.module.css";
import { User } from 'next-auth';
import { AddressSchema, GST_IN } from '@/schemas';
import * as z from 'zod';
import { countries } from '@/lib/countriesList';
import { createPaypalOrder, getAccessToken, CreatePaypalOrder, CreateOrder, successPayment, SuccessPayment, createShipmentOrder, CreateShipmentOrder} from "@/actions/billing-form";
import { Product } from '@/types/type';
import { toast } from "sonner";
import { MoonLoader } from "react-spinners";
import { XIcon } from 'lucide-react';
import { v4 as uuidv4 } from "uuid";



export interface UserData {
  user: (User & { role: "ADMIN" | "USER"; }) | undefined;
}

const PayPalButton = ({billTotal, user, formData, formDataGST, cart , setLoading,setOpenPaymentGateway,setActiveComponent}: {billTotal : number, user: UserData['user'], formData: z.infer<typeof AddressSchema>,formDataGST: z.infer<typeof GST_IN> , cart :  Product[], setLoading : (v: boolean)=> void ,setOpenPaymentGateway: (v: boolean)=> void,setActiveComponent: (v: string)=> void}) => {
   const shortUuid = uuidv4().replace('-', ''); // Shorten the UUID
   const referenceId = `GKPA#${shortUuid}`.substring(0, 39);

   const amountToChargeInDollars = billTotal / parseFloat(process.env.NEXT_PUBLIC_EXCHANGE_RATE_FOR_DOLLAR ?? '84') ; // 1 USD = 84 INR Current Exchange Rate Today : 14 October 2024 

   const tax = (amountToChargeInDollars * 0.05) + 0.036 // 5% Transaction CHarges by PayPal and Rs 3 is the fixed transaction fee
      
   const createOrderHandler = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
       const accessToken = await getAccessToken();
       const orderData : CreatePaypalOrder ={
          amount: (amountToChargeInDollars + tax),
          currency: 'USD',
          accessToken: accessToken,
          referenceId: referenceId
       }
       const orderId = await createPaypalOrder(orderData, user);
    
       return orderId;
  };

  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }} >
      <PayPalButtons
        className='w-full'
        createOrder={async (data, actions) => { return await createOrderHandler(data, actions); }}
        onApprove={async (data, actions) => {
         if (actions.order) {
           try {
             const details = await actions.order.capture();
             // ToDo Check Vaild Access Token
             //  console.log(details);
             //  console.log(data);
             // 
             const createShipmentAndOrderData :CreateShipmentOrder = {
               formData: formData,
               cart: cart,
               price: parseFloat((amountToChargeInDollars * parseFloat(process.env.NEXT_PUBLIC_EXCHANGE_RATE_FOR_DOLLAR ?? '84')).toFixed(2)),
               payment_mode : 'Pre-paid',
               deliveryCharge: '0',
               orderId: referenceId,
               gateway_order_id: details.id ?? referenceId,
               formDataGST: formDataGST
            }

              const createShipmentAndOrder = await createShipmentOrder(createShipmentAndOrderData);
              
               const sucessData : SuccessPayment ={
                  orderId : referenceId,
                  paymentId : details.purchase_units?.[0]?.payments?.captures?.[0]?.id ?? referenceId,
                  gateway_order_id : details.id ?? referenceId,
                  amount : (amountToChargeInDollars * parseFloat(process.env.NEXT_PUBLIC_EXCHANGE_RATE_FOR_DOLLAR ?? '84')).toFixed(2),
                  taxAndFees : (tax * parseFloat(process.env.NEXT_PUBLIC_EXCHANGE_RATE_FOR_DOLLAR ?? '84')).toFixed(2),
                  paymentGateway : 'PayPal',
                  paymentStatus : details.status ?? "CAPTURED",
                  transactionDate : details.create_time ? new Date(details.create_time) : new Date(),
               }

               const savePaymentRecord = await successPayment(sucessData);

               if(savePaymentRecord){
                  setOpenPaymentGateway(false);
                  setActiveComponent('SuccessPayment');
                  toast.success(<div> {(<span className='font-medium text-green-600'> Congratulations! </span>)} {details.payer?.name?.given_name}  Your payment was successful. Your order will be processed and shipped soon. Thank you for shopping with us. <br/>
                  Order ID: { referenceId }<br/>
                  Tracking ID: { createShipmentAndOrder.waybill }<br/>
                  Amount: ₹ {billTotal} /-
                  </div>,{
                    duration: 20000,
                    closeButton: true,
                  });
              }
               
           } catch (error) {
             console.error('Error capturing order:', error);
               toast.error(`Error capturing order: ${error}`,{
                  duration: 20000,
                  closeButton: true,
               });
           }
         } else {
           console.error('Order capture failed');
             toast.error('Order capture failed Please Contact support',{
               duration: 20000,
               closeButton: true,
             });
         }
       }}
        onError={(err : Record<string, unknown>) => {
         toast.error(<div className='text-red-500'> An error occurred while processing your payment. Please try again later. Error:  {JSON.stringify(err)}</div>,{
            duration: 20000,
            closeButton: true,
         });
         }}
        onCancel={(data) => {
         toast.error(<div><span className='text-red-600 font-semibold'>Transaction cancelled ☹ </span>, You returned during the payment process. Please try again</div>,{
            duration: 20000,
            closeButton: true,
         });
        }}
        onInit={
           (data, actions) => {
              setLoading(false);
            }         
        }
      />
    </PayPalScriptProvider>
  );
};

export const PaymentOptions = ({billTotal, user, formData,formDataGST, cart , setOpenPaymentGateway, setActiveComponent}: {billTotal : number, user: UserData['user'], formData: z.infer<typeof AddressSchema>,formDataGST : z.infer<typeof GST_IN>, cart: Product[], setOpenPaymentGateway :(v:boolean)=> void, setActiveComponent: (v: string)=> void}) => {
   const [loading, setLoading] = useState(true);
   const handleClose=()=>{
      toast.error('Transaction cancelled, You have returned during the payment processing. Please try again',{
         duration: 20000,
         closeButton: true,
      });
      setOpenPaymentGateway(false);
   }

   return (
      <div className="fixed h-screen w-full flex items-center justify-center top-0 left-0 z-50">
      <div className={`w-96 relative border p-5 rounded-lg shadow-md m-auto mt-14 max-h-[80vh] overflow-y-scroll backdrop-blur-md flex flex-col gap-y-10 items-center justify-center ${CSS.scrollbar}`}>
         <div className='flex items-center justify-between w-full px-1'>
            <h5 className='text-sm'>Please Select Your Payment Method</h5>
            <XIcon className=' cursor-pointer z-50' onClick={handleClose} />
         </div>
        {loading ? (
          <span className='absolute left-0 top-0 flex items-center justify-center z-50 backdrop-blur-sm h-full w-full'>
            <MoonLoader color="#b88e2f" loading className='m-5' />
          </span>
        ) : null}
        <PayPalButton billTotal={billTotal} user={user} formData={formData} formDataGST={formDataGST} cart={cart} setLoading={setLoading} setOpenPaymentGateway={setOpenPaymentGateway} setActiveComponent={setActiveComponent} />
      </div>
    </div>
  );
};