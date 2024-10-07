'use client';
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useAnimation, AnimationControls, useInView } from "framer-motion";
import Link from "next/link";


interface AnimatedDivProps {
   src: string;
   alt: string;
   duration?: number;
   link : string;
 }
 
 const AnimatedDiv: React.FC<AnimatedDivProps> = ({ src, alt, duration = 1 , link}) => {
   const controls: AnimationControls = useAnimation();
   const ref = useRef(null);
   const inView = useInView(ref, {
     once: false,
   });
 
   useEffect(() => {
     if (inView) {
       controls.start("visible");
     } else {
       controls.start("hidden");
     }
   }, [controls, inView]);
 
   const variants = {
     hidden: { opacity: 0, y: 100 },
     visible: { opacity: 1, y: 0, transition: { duration: duration } },
   };
 
   return (
     <motion.div
       ref={ref}
       initial="hidden"
       animate={controls}
       variants={variants}
       className="relative h-72 w-48 sm:h-96 sm:w-80 lg:h-[38rem] lg:w-[26rem] overflow-hidden rounded-lg shadow-lg"
     >
       <Image
         src={src}
         alt={alt}
         fill
         style={{
           objectFit: "cover",
           zIndex: 1,
         }}
         className="hover:scale-105 transition-transform duration-500"
       />
       <Link href={link} className="absolute z-20 bottom-4 text-nowrap left-1/2 transform -translate-x-1/2 border-2 border-gold bg-gold bg-opacity-75 rounded-sm text-white font-semibold px-8 py-1 sm:px-12 hover:bg-opacity-100 hover:scale-105 transition-all duration-500">
         View Product
       </Link>
     </motion.div>
   );
 };

export const SuperItemSection = () => {
   const items = [
      { image: '/product/top3Product/ashwagandha.jpg', link: '/shop/8' },
      { image: '/product/top3Product/special-kutki-tablet.jpg', link: '/shop/5' },
      { image: '/product/top3Product/hair-oil-1x1.jpg', link: '/shop/7' },
   ];
   const headingVariants = {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0, transition: { duration: 1 } },
   };
   const ref = useRef(null);
   const isInView = useInView(ref, { once: false });

   return (
      <section className="flex flex-col items-center my-16 px-4 sm:px-8 md:px-16">
      <motion.h3
        ref={ref}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mx-2 md:mx-0"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={headingVariants}
      >
        Browse the Most Loved Items
      </motion.h3>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 my-10">
        {items.map((item, index) => (
          <AnimatedDiv key={index} src={item.image} alt="product" duration={(index * 0.25) + 0.5} link={item.link} />
        ))}
      </div>
      <p className="tracking-wide opacity-90 text-center text-sm sm:text-base md:text-lg">
        Experience natural healing with Ayurveda&apos;s time-tested products for balance and wellness.
      </p>
    </section>
   )
}