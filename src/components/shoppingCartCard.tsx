import React from 'react';
import { X } from 'lucide-react';
import CartCard from "@/components/cartItem";
import { useCart } from '@/components/cartContext';
import Link from 'next/link';

export const ShoppingCart = ({clickOutside, setOpenCart} :{clickOutside :React.RefObject<HTMLDivElement>, setOpenCart : (value :  boolean)=> void}) => {
   const {cart, updateCartItemQuantity, removeFromCart} = useCart();
   
   
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

  return (
        <div className="absolute top-10 -right-3 md:right-[5%] mt-4 mr-4 p-4 bg-white shadow-lg rounded-lg w-[22rem] md:w-[24rem] z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button
              className="p-2 text-gold rounded-full hover:scale-105"
               onClick={() => setOpenCart(false)}
            >
              <X size={24} />
            </button>
          </div>
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
            <div>
               Your Cart Is Empty!
            </div>
         )}
         {cart.length > 0 &&
          <div className='flex items-end justify-between mt-8'>
             
             <div className='w-full pr-4'>
                <p className='font-medium text-sm flex items-center justify-between w-full'>
                 Item Total
                 <span className=' text-nowrap font-normal'>₹ {Total.toFixed(2)} /-</span>
                </p>
                <p className='font-medium text-sm flex items-center justify-between w-full'>
                 Discount Applied
                 <span className='text-green-500 text-sm text-nowrap font-normal'>- ₹ {TotalSavings.toFixed(2)} /-</span>
                </p>
                <p className='font-medium flex items-center justify-between w-full border-t border-gold border-dashed mt-2 pt-1'>
                Bill Total
                <span className='text-gold text-nowrap font-semibold'> ₹ {TotalAfterDiscount.toFixed(2)} /-</span>
 
                </p>
             </div>
 
             <Link href="/checkout" className='bg-gold text-white rounded-md text-nowrap px-4 py-2 font-medium hover:bg-goldLight hover:bg-opacity-90 hover:scale-105 hover:text-gold transition-all duration-500'>Check Out</Link>
          </div>
         }

        </div>

  );
};