'use client';
import {CartCalculation} from "@/components/cartCalculation";
import { BillingForm } from "./billing-form";
import { useCart } from '@/components/cartContext';
import { useEffect, useState } from 'react';
import { SuccessPayment } from "./successPayment";
import { SessionProvider } from "next-auth/react";
import { SuccessCODOrderCreation } from "./successCODOrderCreation";
import ClipLoader from 'react-spinners/ClipLoader';
import PulseLoader from 'react-spinners/PulseLoader';

export const CheckoutPageContent = () => {
   const { cart, updateCartItemQuantity, removeFromCart, clearCart } = useCart();
   const [isClient, setIsClient] = useState(false);
   const [activeComponent, setActiveComponent] = useState('CartCalculation'); // Default to 'CartCalculation'
   const [startStatusCheck, setStartStatusCheck] = useState<boolean>(false);


   useEffect(() => {
     setIsClient(true);
   }, []);
 
   if (!isClient) {
     return null;
   }
 

   const handleIncrease = (id: string) => {
     updateCartItemQuantity(id, 1);
   };
 
   const handleDecrease = (id: string) => {
     const item = cart.find(item => item.id === id);
     if (item) {
       if (item.quantity <= 1) {
         removeFromCart(id);
       } else {
         updateCartItemQuantity(id, -1);
       }
     }
   };
 
   const calculateDiscountedPrice = (price: number, discount: string) => {
     const discountPercentage = parseFloat(discount) / 100;
     return price - (price * discountPercentage);
   };
 
   const Total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
 
   const TotalAfterDiscount = cart.reduce((acc, item) => {
     const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
     return acc + discountedPrice * item.quantity;
   }, 0);
 
   const TotalSavings = cart.reduce((acc, item) => {
     const discountAmount = item.price - calculateDiscountedPrice(item.price, item.discount);
     return acc + discountAmount * item.quantity;
   }, 0);
   
   const transportationCharge = 70;
   const billTotal = TotalAfterDiscount ;
   const billTotalWithCash = TotalAfterDiscount + transportationCharge;
   return(
      <section className="w-full relative">
         {startStatusCheck &&
            <div className="fixed top-10 left-5 p-4 flex flex-col items-center h-32 w-80 bg-white shadow-lg rounded-md border-2 border-gold z-20">
               <h6 className="font-semibold text-lg mb-2 flex items-end justify-between">Fetching Payment Status <PulseLoader className="mb-2" size={5} loading color="#b88e2f" /></h6>
               <p>Please do not <span className="font-semibold text-gold text-md">refresh</span> the page or go back.</p>
               <span className="absolute right-4 bottom-1"><ClipLoader loading color="#b88e2f"/></span>
            </div>
         }

      {activeComponent === 'CartCalculation'  && 
          <CartCalculation 
             cart={cart}
             handleIncrease={handleIncrease}
             handleDecrease={handleDecrease}
             removeFromCart={removeFromCart}
             Total={Total}
             TotalSavings={TotalSavings}
             transportationCharge={transportationCharge.toString()}
             billTotal={billTotal}
             setActiveComponent={setActiveComponent}
          />
         }
         <SessionProvider>
            {activeComponent === 'BillingForm'  &&  
               <BillingForm 
                  cart={cart}
                  Total={Total}
                  TotalSavings={TotalSavings}
                  transportationCharge={transportationCharge.toString()}
                  billTotal={billTotal}
                  billTotalWithCash={billTotalWithCash}
                  startStatusCheck={startStatusCheck}
                  setActiveComponent={setActiveComponent}
                  clearCart={clearCart}
                  setStartStatusCheck={setStartStatusCheck}
                  />
            }
         </SessionProvider>
      {activeComponent === 'SuccessPayment'  &&  
       <SuccessPayment/>

       }
      {activeComponent === 'SuccessCODOrderCreation'  &&  
       <SuccessCODOrderCreation/>

       }
      </section>

   )
}