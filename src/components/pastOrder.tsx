import { Product } from '@/types/type';
import { Order, Shipping } from '@prisma/client';

type OrderWithShipping = Order & {
   shipping: Shipping[] | null; // Adjusted to be an array
};

export const PastOrder=({order}:{order : OrderWithShipping})=>{
   
   const totalDiscount = (order?.cart_items as Product[] | undefined)?.reduce((acc, item) => {
      const discountPercentage = parseFloat(item.discount) / 100;
      const itemDiscount = item.price * item.quantity * discountPercentage;
      return acc + itemDiscount;
    }, 0);
    const trackingNumber = order.shipping && order.shipping.length > 0 ? order.shipping[0].tracking_number_waybill : 'N/A';
   return(

      <div className=" px-8 w-[24rem] md:w-[24rem] border p-4 rounded-md border-gold shadow-md">
         <div className="flex flex-col justify-between items-baseline">
            <h2 className='flex items-center justify-between w-full'><span className='text-gold'>Tracking Id</span>{trackingNumber}</h2>
            <h2 className='flex items-center justify-between w-full text-sm'><span className='text-gold'>Order Id</span>{order.order_id}</h2>
         </div>
         <div className="w-full border-t border-opacity-55 border-gold border-dotted my-2"/>
         <p className='text-xs font-medium'>Ordered Items</p>
         <ul className='text-xs'>
            {(order.cart_items as Product[])?.map((item: Product) => (
               <li key={item.id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹ {item.price * item.quantity}</span>
               </li>
            ))}
         </ul>
         <p className='text-green-600 flex justify-between text-xs mt-1'><span>Discount</span><span>- ₹ {totalDiscount?.toFixed(2)}</span></p>

         <div className="w-full border-t border-opacity-55 border-gold border-dashed my-2"/>
         <p className='text-gold flex justify-between text-sm'><span>Total</span><span>₹ {order.total_price}</span></p>
         <div className="w-full border-t border-opacity-55 border-gold border-dashed my-2"/>
         <p className='text-xs font-medium'>Ordered on</p>
         <p className="text-xs opacity-70">{order.order_date.toLocaleString('en-US', {
                                                                             month: 'long',
                                                                             day: 'numeric',
                                                                             hour: 'numeric',
                                                                             minute: 'numeric',
                                                                             hour12: true,
                                                                           })}
         </p>
         <p className='text-xs flex justify-between mt-1'><span>Payment Mode</span><span>{order.payment_method}</span></p>
      </div>
   )
}