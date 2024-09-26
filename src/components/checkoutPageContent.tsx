'use client';
import {CartCalculation} from "@/components/cartCalculation";
import { BillingForm } from "./billing-form";
import { useCart } from '@/components/cartContext';
import { useEffect, useState } from 'react';
import { SuccessPayment } from "./successPayment";
import { SessionProvider } from "next-auth/react";
import { SuccessCODOrderCreation } from "./successCODOrderCreation";


export const CheckoutPageContent = () => {
   const { cart, updateCartItemQuantity, removeFromCart, clearCart } = useCart();
   const [isClient, setIsClient] = useState(false);
   const [activeComponent, setActiveComponent] = useState('CartCalculation'); // Default to 'CartCalculation'
   
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
      <section className="w-full">
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
                  setActiveComponent={setActiveComponent}
                  clearCart={clearCart}
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