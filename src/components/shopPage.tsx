'use client'
import { Products } from "@/components/products";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CheckboxReactHookFormMultiple } from "@/components/filter";
import { SearchItem } from "@/components/searchItem";
import { products } from "@/products/data";
import { Product } from "@/types/type";
import { useState } from "react";
import { Herbs, PriceCup } from "@/components/icons";
import { BadgeCheck , HandCoins} from 'lucide-react';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ShopPage = () => {
   const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 16;

   // Animation
   const ref1 = useRef(null);
   const ref2 = useRef(null);
   const ref3 = useRef(null);
   const ref4 = useRef(null);
 
   const isInView1 = useInView(ref1, { once: false });
   const isInView2 = useInView(ref2, { once: false });
   const isInView3 = useInView(ref3, { once: false });
   const isInView4 = useInView(ref4, { once: false });



   const searchProduct = (search : string) => {
      const filteredItems = products.filter(product => {
         return product.name.toLowerCase().includes(search.toLowerCase())
      })
      setFilteredProducts(filteredItems);
      setCurrentPage(1);
   }

   const filter = (data: string[]) => {

      const filteredItems = products.filter(product => {
        return data.some(filterItem => product.category.includes(filterItem));
      });
      setFilteredProducts(filteredItems);
      setCurrentPage(1);
    };

   const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };
  
    const paginatedProducts = filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

   return (
      <section className="w-full">
               <div className="relative w-full h-[10rem] md:h-[14rem] flex flex-col items-center justify-center gap-4">
            <Image 
               src='/bgBannerofShop.jpg'
               alt='Guru Kirpa Ayurveda Banner'
               fill
               style={{
                  objectFit: 'fill',
                  zIndex: -1
               }}
            />
            <div className="h-full w-full backdrop-blur-sm flex flex-col items-center justify-center gap-4">
               <h2 className="font-bold text-4xl">Shop</h2>
               <p className="text-sm flex items-center"><Link href='/'>Home </Link><ChevronRight size={18}/> Shop</p>
            </div>
         </div>
         <div className="bg-[#FCF8F3] p-4 md:px-12 relative  ">
           <div className="flex flex-col md:flex-row items-center justify-center mx-auto">
            <div className="flex items-center justify-center gap-6 flex-shrink">
             <CheckboxReactHookFormMultiple filter={filter} />
             <SearchItem searchProduct={searchProduct}/>
            </div>
              <span className="text-xs flex text-nowrap ">Showing 1 - 16 of {filteredProducts.length} Results</span>    
           </div>
         </div>
         <div className="w-full">
            <Products products={paginatedProducts}/>
         </div>
         <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-gold text-white' : 'bg-white text-black'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>


   <section className="w-full grid grid-cols-2 space-y-4 md:grid-cols-4 items-start gap-4 justify-between py-12 md:px-28 md:p-12 bg-[#FCF8F3] my-4">
      <motion.div
        ref={ref1}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isInView1 ? 1 : 0, y: isInView1 ? 0 : 100 }}
        transition={{ duration: 1 }}
        className="flex items-center gap-4 flex-1 mt-4 md:mt-0"
      >
        <PriceCup size={46}/>
        <div className="flex flex-col gap-y-2 items-start">
          <h2 className="font-bold text-sm">Uncompromised Ayurvedic Quality</h2>
          <p className="text-opacity-70 text-xs">Pure ingredients, premium quality, guaranteed results.</p>
        </div>
      </motion.div>
      <motion.div
        ref={ref2}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isInView2 ? 1 : 0, y: isInView2 ? 0 : 100 }}
        transition={{ duration: 1.25 }}
        className="flex items-center gap-4 flex-1"
      >
        <BadgeCheck size={46} className="text-gold flex-shrink-0"/>
        <div className="flex flex-col gap-y-2 items-start">
          <h2 className="font-bold text-sm">100% Pure Ayurvedic Wellness</h2>
          <p className="text-opacity-70 text-xs">Made with pure Ayurvedic care, naturally.</p>
        </div>
      </motion.div>
      <motion.div
        ref={ref3}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isInView3 ? 1 : 0, y: isInView3 ? 0 : 100 }}
        transition={{ duration: 1.5 }}
        className="flex items-center gap-4 flex-1"
      >
        <Herbs size={46}/>
        <div className="flex flex-col gap-y-2 items-start">
          <h2 className="font-bold text-sm">Rare Herbal Remedies</h2>
          <p className="text-opacity-70 text-xs">Unique & Suitable handpicked herbs, selected for maximum benefits.</p>
        </div>
      </motion.div>
      <motion.div
        ref={ref4}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isInView4 ? 1 : 0, y: isInView4 ? 0 : 100 }}
        transition={{ duration: 1.75 }}
        className="flex items-center gap-4 flex-1"
      >
        <HandCoins size={46} className="text-gold flex-shrink-0 "/>
        <div className="flex flex-col gap-y-2 items-start">
          <h2 className="font-bold text-sm">Trusted Ayurvedic Wellness</h2>
          <p className="text-opacity-70 text-xs">Proven quality, natural ingredients, trusted results.</p>
        </div>
      </motion.div>
    </section>

      </section>
   )
}

export default ShopPage;