'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

const images = [
   {
      image : "/product/hair-oil.jpg",
      link : "/shop",
      description : "Revitalize your hair naturally with our Ayurvedic hair care solutions, crafted to promote strength, shine, and healthy growth."
   },
   {
      image : "/product/tila-oil.jpg",
      link : "/shop/1",
      description : "Nourishing herbal oil for soothing skin, promoting relaxation, and supporting overall wellness."
   },
   // {
   //    image : "/product/night-josh.jpg",
   //    link : "/shop/2",
   //    description : "Boost stamina, enhance strength, and improve performance for longer, satisfying intimate moments."
   // },
   {
      image : "/product/special-kutki-tablate.jpg",
      link : "/shop/5",
      description : "Herbal remedy to support liver health, detoxify the body, and promote better digestion naturally."
   },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setProgress(0);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    setProgress(newProgress);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          handleNext();
          return 0;
        }
        return prevProgress + 1;
      });
    }, 50);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          handleNext();
          return 0;
        }
        return prevProgress + 1;
      });
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
   <>
    <section className="h-[16rem] md:h-[44rem] relative flex items-center justify-center overflow-hidden">
      <button
        onClick={handlePrev}
        className="absolute -left-8 md:left-2 p-2 z-10"
      >
       <ChevronLeftIcon size={100} className='text-white'/> 
      </button>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="w-full h-full flex items-center justify-center absolute"
        >
          <Image 
            src={images[currentIndex].image} 
            alt="Gurukirpa Ayurveda Product for sexual wellness, penis enlaregment, stamina" 
            className="h-full w-full" 
            fill
            style={{
               objectFit: 'fill',
            }}
          />

        { currentIndex != 0 &&  <div className='h-28 w-[12rem] sm:h-48 sm:w-[20rem] md:h-96 md:w-[32rem] rounded-md z-20 absolute left-10 md:left-[15%] bottom-8 md:bottom-14 bg-[#FFF3E3] shadow-lg p-4 sm:p-6 md:px-8 flex flex-col items-start justify-center'>
              <span className='tracking-widest sm:mb-4 text-[8px] sm:text-base md:text-lg'>New Arrival</span>
              <h2 className='font-extrabold text-xs sm:text-2xl md:text-3xl lg:text-5xl leading-tight text-gold mb-1 sm:mb-4'>Discover Our New Collections</h2>
              <p className='tracking-wide opacity-80 text-[8px] sm:text-sm md:text-base'>{images[currentIndex].description}</p>
              <Link href={images[currentIndex].link} className='bg-gold text-white px-2 py-1 md:py-2 sm:px-12 text-[8px] md:text-base mt-1 sm:mt-8 rounded-md hover:bg-goldLight hover:text-gold shadow-md'>Shop Now</Link>
            </div>}

        </motion.div>
      </AnimatePresence>
      <button
        onClick={handleNext}
        className="absolute -right-8 md:right-4  p-2"
      >
       <ChevronRightIcon size={100} className='text-white'/> 
      </button>
    </section>
      <div
        className="h-[4px] bg-goldLight cursor-pointer w-40 rounded-2xl mx-auto my-4"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-gold rounded-2xl"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-center space-x-2 my">
         {images.slice().reverse().map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${index === images.length - 1 - currentIndex ? 'bg-gold' : 'bg-goldLight'}`}
              onClick={() => handleDotClick(images.length - 1 - index)}
            />
          ))}
      </div>
    </>
  );
};

export default Carousel;