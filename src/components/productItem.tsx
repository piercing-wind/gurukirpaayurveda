'use client';
import { Product } from "@/types/type";
import Image from "next/image";
import { useCart } from "@/components/cartContext";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner"
import { Facebook, Instagram, Twitter, WhatsApp } from "./icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";

export const ProductItem = ({ product }: { product: Product }) => {
   const [quantity, setQuantity] = useState(product.quantity);
   const { cart, addToCart, updateCartItemQuantity } = useCart();
   const router = useRouter();
   


   const billPrice = useMemo(() => {
      const discountedPrice = product.price - (product.price * (parseFloat(product.discount) / 100));
      return discountedPrice * quantity;
    }, [product.price, product.discount, quantity]);
  
  const addedToCart = !!cart.find((item) => item.id === product.id);

  const handleIncrease = () => {
   setQuantity(quantity + 1);
   product.quantity = quantity + 1;
 };

 const handleDecrease = () => {
   if (quantity > 1) {
     setQuantity(quantity - 1);
     product.quantity = quantity - 1;
   }
 };
 const handleAddToCart = () => {
   if (addedToCart) {
     const existingItem = cart.find((item) => item.id === product.id);
     if (existingItem && existingItem.quantity !== quantity) {
       updateCartItemQuantity(product.id, quantity - existingItem.quantity);
       toast(
         <div className='text-sm'>
           <p className="flex items-center"><span className="text-gold">{product.name}</span> &nbsp;quantity updated in the Cart!</p>
         </div>, {
         closeButton: true,
       });
     } else {
       toast(
         <div className='text-sm'>
           <p className="flex items-center"><span className="text-gold">{product.name}</span> &nbsp;already in the Cart!</p>
         </div>, {
         closeButton: true,
       });
     }
   } else {
     addToCart({ ...product, quantity });
     toast(
       <div className='text-sm'>
         <p className="flex items-center"><span className="text-gold">{product.name}</span> &nbsp;added to the Cart!</p>
       </div>, {
       closeButton: true,
     });
   }
 };

 const handleBuyNow = () => {
   handleAddToCart();
   toast(
      <div className='text-sm'>
        <p className="flex items-center">Redirecting you to checkout &nbsp; &nbsp; <ClipLoader size={18} loading color="#b88e2f" /></p>
      </div>, {
      closeButton: true,
      duration: 1000
    });
   router.push('/checkout');
 }

 const shareUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/shop/${product.id}`;
 const shareText = `Check out this product: ${product.name}`;

  return (
    <div className="w-full px-4 md:px-20 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <div className="relative h-[30rem] w-[30rem]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{
                objectFit: 'cover'
              }}
            />
          </div>
          {/* <div className="flex gap-2 mt-4">
            {product.subImages.map((subImage, index) => (
              <Image key={index} src={subImage} alt={`${product.name} ${index + 1}`} width={100} height={100} className="w-24 h-24 object-cover" />
            ))}
          </div> */}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-4">{product.description}</p>
          <p className="">Price: ₹ {(product.price * quantity).toFixed(2)}</p>
          <p className="text text-green-600 mb-4">Discount: {product.discount}</p>
          <p className="text-lg font-semibold mb-4">Bill Price: ₹  {billPrice.toFixed(2)}</p>
          <p className="text text-yellow-500 mb-4">Rating: {product.rating} / 5</p>
          <p className="text-xs text-gray-700 mb-4">Category: {product.category}</p>
          <div className="flex items-center mb-4">
            <Button variant={'link'} onClick={handleDecrease} className="text-gold px-2 hover:bg-goldLight transition-all duration-300"><Minus size={20} /></Button>
            <span className="px-4 py-1">{quantity}</span>
            <Button variant={'link'} onClick={handleIncrease} className="text-gold px-2 hover:bg-goldLight transition-all duration-300"><Plus size={20}/></Button>
          </div>
          <div className="flex items-center gap-8">
            <Button onClick={() => handleAddToCart() } 
               className="bg-gold text-white px-6 py-2 w-[10rem] rounded-md hover:bg-opacity-90 hover:bg-goldLight hover:text-gold transition-all duration-300">
               Add to Cart
            </Button>

            <Button onClick={() => handleBuyNow()} className="w-[10rem] border-2 border-gold bg-goldLight bg-opacity-70 text-gold px-6 py-2 rounded-md hover:bg-opacity-80 hover:text-white  hover:bg-gold  transition-all duration-300">
                Buy Now
            </Button>
          </div>
          {/* Social Sharing */}
          <div className="mt-6">
             <h3 className="font-semibold mb-2">Share this product:</h3>
             <div className="flex space-x-6">
               <Link
                 href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 <Facebook size={24} />
               </Link>
               <Link
                 href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 <Twitter size={24} />
               </Link>
               <Link
                 href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 <Instagram size={24} />
               </Link>
               <Link
                 href={`https://wa.me/?text=${shareText} ${shareUrl}`}
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 <WhatsApp size={24} />
               </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};