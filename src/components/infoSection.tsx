'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export const InfoSection = () => {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const isInView = useInView(ref, { once: false });
  const isInView2 = useInView(ref2, { once: false }); 
  return (
    <section className="bg-[#FCF8F3] min-h-[100vh] flex flex-col lg:flex-row items-center justify-center mt-20 md:px-32 p-4 overflow-x-hidden ">
      <motion.div
        ref={ref}
        className="w-full md: mt-16"
        initial={{ opacity: 0, x: -200 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -200 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-10">We Love What We do</h1>
        <div className="w-full lg:w-[22rem] gap-6 flex flex-col">
          <p className="tracking-wide opacity-85">Ayurveda promotes natural healing, balances mind and body, boosts immunity, and supports long-term wellness through personalized remedies and lifestyle practices.</p>
          <p className="tracking-wide opacity-85">Experience the power of personalized Ayurvedic healing with our natural remedies, designed to balance your mind, body, and spirit for lasting wellness and vitality.</p>
        </div>
        <Link href="/shop">
        <motion.button
          className="bg-gold text-white font-semibold py-2 px-10 bg-opacity-80 hover:bg-opacity-100 my-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Explore More
        </motion.button>
        </Link>
      </motion.div>
      
      <motion.div
        ref={ref2}
        className="flex items-start justify-center gap-4 sm:gap-6 lg:gap-8 w-full "
        initial={{ opacity: 0, x: 200 }}
        animate={isInView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 200 }}
        transition={{ duration: 1 }}
      >
        <div className="relative h-[20rem] lg:h-[36rem] w-full lg:w-[24rem] rounded-lg overflow-hidden z-10">
          <Image
            src='/product/info1.jpg'
            alt="Ayurved"
            fill
            style={{
              objectFit: 'cover',
            }}
            className='hover:scale-110 transition-all duration-500'
          />
        </div>
        <div className="relative h-[16rem] lg:h-[30rem] w-full lg:w-[24rem] rounded-lg overflow-hidden z-10">
          <Image
            src='/product/info2.jpg'
            alt="Ayurved"
            fill
            style={{
              objectFit: 'cover',
            }}
            className='hover:scale-110 transition-all duration-500'
          />
        </div>
      </motion.div>
    </section>
  );
};