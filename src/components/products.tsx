'use client';
import { Product } from "@/types/type";
import Image from "next/image";
import { CheckIcon, X } from "lucide-react";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cartContext";
import { toast } from "sonner";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";

export const ProductCard = ({ product, duration = 1, addedToCart, handleAddToCart }: { product: Product, duration?: number,addedToCart: boolean, handleAddToCart: (id: string) => void }) => {
  const discountedPrice = (product.price - (product.price * (parseFloat(product.discount) / 100))).toFixed(2);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const router = useRouter();
 

  return (
   <motion.div
   ref={ref}
   className="flex flex-col w-full sm:w-[18rem] items-center overflow-hidden rounded-lg relative"
   style={{ boxShadow: '0 0 10px 0 rgba(184, 142, 47,1)' }}
   onMouseEnter={() => setIsHovered(true)}
   onMouseLeave={() => setIsHovered(false)}
   initial={{ opacity: 0, y: 100 }}
   animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
   transition={{ duration: duration }}
 >
   <div className="absolute top-[4%] right-[8%] h-14 w-14 bg-opacity-50 rounded-full border flex items-center justify-center bg-red-300 p-2">
     -{product.discount}
   </div>

   <div className="relative h-[14rem] sm:h-[20rem] w-full sm:w-[18rem] -z-10">
     <Image
       src={product.image}
       alt={product.name}
       fill
       style={{
         objectFit: 'cover',
       }}
     />
   </div>
   <div className="mx-2 md:mx-4">
     <h3 className="text-base sm:text-xl font-bold my-2 md:my-4 tracking-wide">{product.name}</h3>
     <p className="text-xs md:text-sm md:my-4">
       {product.description.length > 100 ? product.description.substring(0, 100) + '...' : product.description}
     </p>
     <div className="flex justify-between items-center md:my-2">
       <p className="text-sm font-bold">
         ₹ {parseFloat(discountedPrice).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
       </p>
       <p className="text-sm sm:mx-8 opacity-80 my-2">
         <s>₹ {product.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</s>
       </p>
     </div>
   </div>
   {isHovered && (
     <motion.div
       className="absolute bg-black bg-opacity-60 h-full w-full top-0 left-0 flex flex-col items-center justify-center gap-6"
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ duration: 0.3 }}
     >
       <motion.button
         className={`py-2 md:px-8 sm:px-12 flex items-center justify-center text-center w-[80%] font-bold text-nowrap text-gold bg-white rounded-md hover:bg-goldLight hover:bg-opacity-50 hover:scale-105 hover:text-white ${addedToCart && 'hover:bg-white hover:bg-opacity-90'}`}
         whileHover={{ scale: 1.05 }}
         onClick={() => {
            toast(
               <div className='text-sm'>
                  {!addedToCart ? (<p className="flex items-center"><span className="text-gold">{product.name}</span> &nbsp;added to the Cart! </p>) : (<p className="flex items-center"><span className="text-gold">{product.name}</span> &nbsp; already in the Cart! </p>)}
               </div>, {
               closeButton: true,
             });
            handleAddToCart(product.id)}
         }
       >
         {addedToCart ? (<div className="text-green-500 flex items-center gap-4"><CheckIcon/>Added</div>) : 'Add to Cart'}
         
       </motion.button>
       <motion.button
         className="py-2 md:px-12 sm:px-12 flex items-center justify-center text-center w-[80%] text-nowrap font-bold text-white border-2 border-gold rounded-md bg-goldLight bg-opacity-50 hover:bg-white hover:text-gold hover:scale-105"
         whileHover={{ scale: 1.05 }}
         onClick={()=>{
            toast(
               <div className='text-sm'>
                 <p className="flex items-center">Opening &nbsp; &nbsp; <ClipLoader size={18} loading color="#b88e2f" /></p>
               </div>, {
               closeButton: true,
               duration: 1000
             });
            router.push(`/shop/${product.id}`);
         }}
       >
         View Product
       </motion.button>

      <Button onClick={()=>setIsHovered(!isHovered)} className="absolute md:hidden top-0 right-0 text-gold bg-white rounded-bl-full" variant={'link'}>
         <X size={24} />
      </Button>

     </motion.div>
   )}
 </motion.div>
)};

export const Products = ({products, title="Our Products"}: {products: Product[], title?:string}) => {
   const ref = useRef(null);
   const router = useRouter();
   const isInView = useInView(ref, { once: false });

   const {cart, addToCart} = useCart();

   const initialAddedItems = cart.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    
    const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>(initialAddedItems);
    
   const handleAddToCart = (id: string) => {
      if (!cart.some(item => item.id === id)) {
         addToCart(products.find(product => product.id === id)!);
         setAddedItems(prevState => ({ ...prevState, [id]: true }));
       }
    };
  return (
   <section className="flex flex-col items-center my-10 px-4 sm:px-8 md:px-16">
   <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-center">{title}</h2>
   <div className="my-16 grid gap-4 md:gap-8 grid-cols-2 lg:grid-cols-4">
     {products.map((product, index) => (
       <ProductCard key={product.id + index} product={product} duration={Math.min((index * 0.25) + 0.5, 2)} addedToCart={!!addedItems[product.id]} handleAddToCart={handleAddToCart}/>
     ))}
   </div>

   <motion.button
     ref={ref}
     className="text-gold border border-gold py-2 px-12 font-medium shadow-md"
     whileHover={{ scale: 1.05 }}
     whileTap={{ scale: 0.95 }}
     transition={{ type: "spring", stiffness: 80 }}
     animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
     onClick={()=>router.push('/shop')}
   >
    More Products Comming Soon
   </motion.button>
 </section>
  );
}