'use client'
import Image from "next/image";
import { Consulting, HeartPump, Herbs, Yoga } from "./icons";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const WhatWeOffer = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const inView1 = useInView(ref1, { once: false });
  const inView2 = useInView(ref2, { once: false });
  const inView3 = useInView(ref3, { once: false });
  const inView4 = useInView(ref4, { once: false });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="flex items-center justify-center mt-[16rem]">
      <div className="flex w-[36rem] relative">
        <div className="">
          <motion.div
            ref={ref1}
            initial="hidden"
            animate={inView1 ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.5 }}
            className="relative h-[15rem] w-[15rem] md:h-[20rem] md:w-[20rem] flex flex-col items-center pt-4 md:pt-8"
          >
            <Image
              src="/hex2.svg"
              alt="Design"
              fill
              style={{
                objectFit: "cover",
              }}
            />
            <Herbs size={100} />
            <h1 className="text-sm md:text-xl font-semibold my-2 md:mt-4">Natural Remedies</h1>
            <p className="w-[62%] text-center md:my-4 text-xs md:text-sm">
              Experience the healing power of nature with herbal treatments and
              Ayurvedic solutions.
            </p>
          </motion.div>
          <motion.div
            ref={ref2}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[15rem] w-[15rem] md:h-[20rem] md:w-[20rem] flex flex-col items-center pt-4 md:pt-8"
          >
            <Image
              src="/hex3.svg"
              alt="Design"
              fill
              style={{
                objectFit: "cover",
              }}
            />
            <Yoga size={80} />
            <h1 className="text-sm md:text-xl font-semibold mt-2 md:mt-4 text-center">
              Holistic Wellness <br /> Programs
            </h1>
            <p className="w-[75%] md:w-[70%] text-center my-2 md:my-4 text-xs md:text-sm">
              Embrace complete well being with our integrated diet, lifestyle,
              and mindfulness programs.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-[7.5rem] md:bottom-[10rem] right-0">
          <motion.div
            ref={ref3}
            initial="hidden"
            animate={inView3 ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative h-[15rem] w-[15rem] md:h-[20rem] md:w-[20rem] flex flex-col items-center pt-8"
          >
            <Image
              src="/hex.svg"
              alt="Design"
              fill
              style={{
                objectFit: "cover",
              }}
            />
            <HeartPump size={80} />
            <h1 className=" text-sm md:text-xl font-semibold  md:mt-6 my-2 md:my-4">Expert Guidance</h1>
            <p className="w-[75%] md:w-[65%] text-center md:my-4 text-xs md:text-sm">
              Receive professional advice from certified Ayurveda experts for a
              balanced, healthy lifestyle.
            </p>
          </motion.div>
          <motion.div
            ref={ref4}
            initial="hidden"
            animate={inView4 ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative h-[15rem] w-[15rem] md:h-[20rem] md:w-[20rem] flex flex-col items-center md:pt-6"
          >
            <Image
              src="/hex3.svg"
              alt="Design"
              fill
              style={{
                objectFit: "cover",
              }}
            />
            <Consulting size={100} />
            <h1 className="text-sm md:text-xl font-semibold md:my-2 text-center">
              Personalized <br /> Consultations
            </h1>
            <p className="w-[75%] md:w-[65%] text-center my-2 text-xs md:text-sm">
              Get tailored Ayurvedic health plans designed specifically for your
              body type and wellness goals.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};