'use client';
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const NewsPresence = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const newsItems = [
   { src: "/news/hindustan.png", description: "Featured for delivering premium health products and trusted wellness solutions.", alt: "Hindustan" },
   { src: "/news/theindianexpress.png", description: "Celebrated for providing effective health products and reliable wellness solutions.", alt: "The Indian Express" },
   { src: "/news/thetimesofindia.png", description: "Acknowledged for excellence in health products and innovative wellness solutions.", alt: "The Times of India" },
   { src: "/news/theindianexpress.png", description: "Recognized for quality health products and impactful wellness solutions.", alt: "The Indian Express" },
   { src: "/news/hindustan.png", description: "Praised for top-tier health products and comprehensive wellness solutions.", alt: "Hindustan" },
 ];
  return (
    <section className="my-20 flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-5xl font-semibold mx-auto text-center leading-snug text-gold my-8">
        Better Health with Ayurveda <br /> 2 Million+ Happy Users
      </h1>
      <div ref={ref} className="grid grid-cols-2 md:flex md:gap-4 p-4">
        {newsItems.map((news, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="w-full p-4"
          >
            <div className="relative w-full h-28">
              <Image
                src={news.src}
                alt={news.alt}
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              className="p-1 px-2 rounded-md h-28 flex items-center justify-center"
              style={{ boxShadow: "0 0 10px 0 rgba(184, 142, 47,1)" }}
            >
              <p className="text-sm md:text-base">
                {news.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};