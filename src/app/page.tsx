import { Footer } from "@/components/footer";
import Carousel from "@/components/frontPageCrousel";
import { Gallery } from "@/components/gallery";
import { HeaderWithSessionProvider } from "@/components/headerWithSessionProvider";
import { InfoSection } from "@/components/infoSection";
import { NewsPresence } from "@/components/newsPresence";
import { Products } from "@/components/products";
import { SuperItemSection } from "@/components/superItemSection";
import { WhatWeOffer } from "@/components/whatWeOffer";
import { WhyChooseUs } from "@/components/whyChooseUs";
import Image from "next/image";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import { products } from "@/products/data";
import { ConsentTaking18 } from "@/components/consentTaking18+";



export default async function Home() {
   
  return (
   <SessionProvider>
    <main className="overflow-x-hidden relative">
    <ConsentTaking18 />
    <HeaderWithSessionProvider />
      <Carousel/>
      <SuperItemSection/>
      <Products products={products.slice(0, 8)}/>
      <InfoSection/>
      <Gallery />

      <section className="relative mt-24 mb-14 h-[16rem] md:h-[100vh]">
         <Image
            src="/middleImage.jpg"
            alt="main product"
            fill
            style={{
               objectFit : 'fill',
               zIndex: -1
            }}
         />
            <h1 className="text-base md:text-7xl font-bold text-white absolute left-[10%] md:left-[10%] top-[20%] leading-snug">Natural Wellness <br/> With Ayurveda</h1>
            <Link href="#" className="border-2 border-goldLight bg-gold hover:bg-goldLight md:py-2 px-4 md:px-16 absolute top-40 md:top-[60%] left-10 md:left-[10%] hover:text-gold hover:bg-opacity-70 transition-all duration-300 rounded-sm text-white font-semibold">Buy Now</Link>
      </section>

      <WhyChooseUs />
      <WhatWeOffer />
      <NewsPresence />
      <Footer />
    </main>
    </SessionProvider>
  );
}
