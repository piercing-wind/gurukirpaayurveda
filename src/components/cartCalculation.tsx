'use client'

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import CartCard2 from "@/components/cartItem";
import CSS from "@/app/checkout/checkout.module.css"
import CartCard from '@/components/cartItem';
import { Product } from "@/types/type";
import { EmpytCartLeaf } from "./icons";
import Link from "next/link";


type CartCalculationProps = {
   cart : Product[];
   handleIncrease : (id: string) => void;
   handleDecrease : (id: string) => void;
   removeFromCart : (id: string) => void;
   Total : number;
   TotalSavings : number;
   transportationCharge : string;
   billTotal : number;
   setActiveComponent : (value: string) => void;
}

export const CartCalculation : React.FC<CartCalculationProps> =({cart, handleIncrease, handleDecrease, removeFromCart, Total, TotalSavings, transportationCharge, billTotal, setActiveComponent})=>{


   return (
      <div className="w-[95%] md:w-[70%] flex flex-col md:flex-row items-center md:items-start justify-center mx-auto gap-10 my-10 ">
          
           <div className={`overflow-y-auto max-h-[38rem] w-[26rem] md:w-[28rem] ${CSS.scrollbar} hidden md:block`}>
               <h1 className='text-xl font-medium text-gold mx-auto w-full text-center '>{cart.length > 0 ?  'Your Items' : 'Your Cart is Empty!'}</h1>
             {cart.map(item => (
                <CartCard2
                  key={item.id}
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onRemove={removeFromCart}
                />
              ))}     

             {cart.length === 0 && (
               <div className="flex flex-col gap-8 items-center justify-center mt-8">
                 

                 <EmpytCartLeaf size={200} />
                 <Link href="/shop" className="w-full bg-gold text-white hover:bg-goldLight hover:bg-opacity-80 hover:text-gold text-center py-2 rounded-md">
                     Shop Now
                  </Link>
               </div>
             )}
            </div>
    
   

         {cart.length > 0 &&
            <div className="w-[95%] mx-auto md:w-[20rem] h-[20rem] rounded-md bg-[#F9F1E7] shadow-sm shadow-gold p-8 flex flex-col items-center justify-start">
               <h1 className="font-bold text-2xl">Your Cart Total</h1> 
               <div className="w-full my-8 flex flex-col gap-2 opacity-80">
                  <p className="font-medium flex items-center justify-between">Total Price : &nbsp;&nbsp;<span className="font-normal">₹ {Total.toFixed(2)}</span></p>
                  <p className="font-medium flex items-center justify-between">Discount Applied : &nbsp;&nbsp;<span className="font-normal text-green-500">- ₹ {TotalSavings.toFixed(2)}</span></p>
                  {/* <p className="font-medium flex items-center justify-between">Delivery Charge: &nbsp;&nbsp;<span className="font-normal">₹ {transportationCharge}</span></p> */}
               </div>
                  <p className="w-full font-medium flex items-center justify-between">Bill Total : &nbsp;&nbsp;<span className="font-semibold text-gold">₹ {billTotal.toFixed(2)}</span></p>
               <Button
               className="w-full mt-8 bg-gold text-white hover:bg-goldLight hover:bg-opacity-80 hover:text-gold"
               onClick={() => {
                  if(cart.length === 0) return;
                  setActiveComponent('BillingForm')
               }}
               >
                  Check Out
               </Button>
            </div>
      }
            <h1 className='text-xl font-medium text-gold mx-auto w-full text-center md:hidden'>Your Items</h1>
            <div className={`overflow-y-auto max-h-[38rem] w-[26rem] md:w-[28rem] px-4 ${CSS.scrollbar} md:hidden`}>
             {cart.map(item => (
                <CartCard
                  key={item.id}
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onRemove={removeFromCart}
                />
              ))}     
               {cart.length === 0 && (
               <div className="flex flex-col gap-8 items-center justify-center mt-8">
                 

                 <EmpytCartLeaf size={150} />
                 <Link href="/shop" className="w-full bg-gold text-white hover:bg-goldLight hover:bg-opacity-80 hover:text-gold text-center py-2 rounded-md">
                     Shop Now
                  </Link>
               </div>
             )}
            </div>
   </div>
   )
}
