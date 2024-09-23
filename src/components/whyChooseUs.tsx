'use client'
import Image from "next/image";
import TypingAnimation from "./magicui/typing-animation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const WhyChooseUs = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const isInView1 = useInView(ref1, { once: false });
  const isInView2 = useInView(ref2, { once: false });
  const isInView3 = useInView(ref3, { once: false });
  const isInView4 = useInView(ref4, { once: false });

  return (
    <section className="flex flex-col justify-center items-center gap-y-10">
      <TypingAnimation
        className="md:text-6xl font-semibold my-5 tracking-wide"
        text="WHY CHOOSE US"
      />

      <motion.div
        ref={ref1}
        className="w-[95%] md:w-[40%] h-36 border relative flex rounded-l-full"
        style={{
          boxShadow:
            "0 -10px 10px -10px #b88e2f, 10px 0 10px -10px #b88e2f, 0 10px 10px -10px #b88e2f, 10px -10px 10px -10px #b88e2f, 10px 10px 10px -10px #b88e2f",
        }}
        initial={{ opacity: 0, x: -50 }}
        animate={isInView1 ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="relative rounded-full h-36 w-36 overflow-hidden flex-shrink-0"
          style={{
            boxShadow: "0 0 10px 0px #b88e2f",
          }}
          initial={{ scale: 0 }}
          animate={isInView1 ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Image
            src="/certificate/iso-logo.png"
            alt="Ayurved ISO Certificate"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </motion.div>
        <motion.div
          className="flex flex-col justify-center h-full pl-8 md:pl-20"
          initial={{ opacity: 0 }}
          animate={isInView1 ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h6 className="font-medium text-xl mt-4">ISO Certified</h6>
          <p className=" md:w-[70%] my-4">
            Guaranteeing quality, safety, and efficiency in all our products.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        ref={ref2}
        className="w-[95%] md:w-[40%] h-36 border relative flex rounded-r-full"
        style={{
          boxShadow:
            "0 -10px 10px -10px #b88e2f, -10px 0 10px -10px #b88e2f, 0 10px 10px -10px #b88e2f, -10px -10px 10px -10px #b88e2f, -10px 10px 10px -10px #b88e2f",
        }}
        initial={{ opacity: 0, x: 50 }}
        animate={isInView2 ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col justify-center h-full pl-8 md:pl-20"
          initial={{ opacity: 0 }}
          animate={isInView2 ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h6 className="font-medium text-xl mt-4">GMP Certified</h6>
          <p className=" md:w-[70%] my-4">
            Certified for maintaining the highest standards in product safety
            and quality.
          </p>
        </motion.div>
        <motion.div
          className="relative rounded-full h-36 w-36 overflow-hidden flex-shrink-0"
          style={{
            boxShadow: "0 0 10px 0px #b88e2f",
          }}
          initial={{ scale: 0 }}
          animate={isInView2 ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Image
            src="/certificate/GMP.webp"
            alt="Ayurved ISO Certificate"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        ref={ref3}
        className="w-[95%] md:w-[40%] h-36 border relative flex rounded-l-full"
        style={{
          boxShadow:
            "0 -10px 10px -10px #b88e2f, 10px 0 10px -10px #b88e2f, 0 10px 10px -10px #b88e2f, 10px -10px 10px -10px #b88e2f, 10px 10px 10px -10px #b88e2f",
        }}
        initial={{ opacity: 0, x: -50 }}
        animate={isInView3 ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="relative rounded-full h-36 w-36 overflow-hidden flex-shrink-0"
          style={{
            boxShadow: "0 0 10px 0px #b88e2f",
          }}
          initial={{ scale: 0 }}
          animate={isInView3 ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Image
            src="/certificate/precision.jpg"
            alt="Ayurved ISO Certificate"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </motion.div>
        <motion.div
          className="flex flex-col justify-center h-full pl-8 md:pl-20"
          initial={{ opacity: 0 }}
          animate={isInView3 ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h6 className="font-medium text-xl mt-4">100% Satisfaction</h6>
          <p className=" md:w-[70%] my-4">
            Satisfaction for delivering trusted quality and exceptional service.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        ref={ref4}
        className="w-[95%] md:w-[40%] h-36 border relative flex rounded-r-full"
        style={{
          boxShadow:
            "0 -10px 10px -10px #b88e2f, -10px 0 10px -10px #b88e2f, 0 10px 10px -10px #b88e2f, -10px -10px 10px -10px #b88e2f, -10px 10px 10px -10px #b88e2f",
        }}
        initial={{ opacity: 0, x: 50 }}
        animate={isInView4 ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col justify-center h-full pl-6 md:pl-20"
          initial={{ opacity: 0 }}
          animate={isInView4 ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h6 className="font-medium text-xl mt-4">Halal Certified</h6>
          <p className="md:w-[80%] my-4">
            Ensuring products meet the highest standards of purity and
            compliance.
          </p>
        </motion.div>
        <motion.div
          className="relative rounded-full h-36 w-36 overflow-hidden flex-shrink-0"
          style={{
            boxShadow: "0 0 10px 0px #b88e2f",
          }}
          initial={{ scale: 0 }}
          animate={isInView4 ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Image
            src="/certificate/halal.png"
            alt="Ayurved ISO Certificate"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};