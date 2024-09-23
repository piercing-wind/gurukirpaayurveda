'use client';
import {CartCalculation} from "@/components/cartCalculation";
import { BillingForm } from "./billing-form";
import { useCart } from '@/components/cartContext';
import { useEffect, useState } from 'react';
import { SuccessPayment } from "./successPayment";


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
   
   const transportationCharge = (TotalAfterDiscount * 2 / 100).toFixed(2);
   const billTotal = TotalAfterDiscount + parseFloat(transportationCharge);
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
             transportationCharge={transportationCharge}
             billTotal={billTotal}
             setActiveComponent={setActiveComponent}
          />
         }
    {activeComponent === 'BillingForm'  &&  
       <BillingForm 
         cart={cart}
         Total={Total}
         TotalSavings={TotalSavings}
         transportationCharge={transportationCharge}
         billTotal={billTotal}
         setActiveComponent={setActiveComponent}
         clearCart={clearCart}
         />

    }
    {activeComponent === 'SuccessPayment'  &&  
       <SuccessPayment/>

    }
      </section>

   )
}