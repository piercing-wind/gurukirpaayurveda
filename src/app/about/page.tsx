import { Footer } from "@/components/footer";
import { HeaderWithSessionProvider } from "@/components/headerWithSessionProvider";
import CSS from "@/app/about/about.module.css"
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Gurukirpa Ayurveda Shop | Vaid Gurmeet Singh",
   metadataBase: new URL("https://vaidgurmeet.com/about"),
   description:"Learn about Gurukirpa Ayurveda, your trusted source for Ayurvedic solutions in sexual wellness and stamina enhancement. Discover our commitment to quality and holistic health.",
   applicationName: "Gurukirpa Ayurveda", 
   authors: [
     {
       name: "Sourabh",
       url: "https://www.linkedin.com/in/sourabh-sharma-8987451a2/",
     },
   ],
   generator: "Gurukirpa Ayurveda",
   referrer: "origin",
   creator: "Gurukirpa Ayurveda",
   publisher: "Gurukirpa Ayurveda",
   robots: {
     index: true,
     follow: true,
   },
   alternates: { canonical: "/" },
   twitter:{
      card : 'summary_large_image'
   },
   openGraph:{
      type : 'website',
      // url : website,
      title : "Gurukirpa Ayurveda",
      siteName : "Gurukirpa Ayurveda",
      images:[
         {
            url : "/GurukirpaAyurveda.svg"	,
            height : 630,  
            width : 1200,
            alt : "Gurukirpa Ayurveda | Vaid Gurmeet Singh"
         }
      ],
      description : "Learn about Gurukirpa Ayurveda, your trusted source for Ayurvedic solutions in sexual wellness and stamina enhancement. Discover our commitment to quality and holistic health.",
   },  
   other:{
      ["bingbot"]: "noarchive",
   }
 };

const AboutPage = () => {
  return (
    <main className="w-full">
      <HeaderWithSessionProvider />
      <section className="w-[70%] mx-auto flex flex-col items-center justify-start  my-16 tracking-wide px-24">
        <h1 className="text-3xl font-semibold text-gold mb-4">
          About Us – Gurukirpa Ayurveda
        </h1>
        <p className="tracking-wide my-4">
          Welcome to Gurukirpa Ayurveda, where we blend the wisdom of Ayurveda
          with modern living to offer natural health solutions. Our mission is
          to promote balance, wellness, and healing through high-quality
          Ayurvedic products that support the body, mind, and spirit.
        </p>
         <div>
          <h2 className="text-gold font-semibold text-2xl my-8">Why Ayurveda?</h2>
          <p>
            Ayurveda is an ancient system of healing that focuses on balancing
            the three doshas—Vata, Pitta, and Kapha. It provides natural
            remedies to restore health and harmony, focusing on the root cause
            rather than symptoms.
          </p>
          <h2 className="text-gold font-semibold text-2xl my-8">Our Products</h2>
          <p className="my-2"> We offer a wide range of Ayurvedic products designed to improve:</p>
          <ul className={`list-disc list-inside ${CSS.list_gold_bullets} flex flex-col gap-4 my-4`}>
            <li>Immunity and overall wellness</li>
            <li>Digestive health and detoxification</li>
            <li>Joint support and pain relief</li>
            <li>Natural beauty for skin and hair</li>
            <li>Stress relief and mental clarity</li>
          </ul>
         <p className="my-2">Each product is crafted from authentic herbs and ingredients, free from harmful chemicals and additives.</p>
         
         <h2 className="text-gold font-semibold text-2xl my-8">Health Benefits</h2>
         
         <ul className={`list-disc list-inside ${CSS.list_gold_bullets} flex flex-col gap-4 my-4`}>
         <li><span className="text-gold">Natural and Safe:</span> Made with 100% natural ingredients for safe, daily use.</li>
            <li><span className="text-gold">Boosts Immunity:</span> Strengthens the body’s natural defenses.</li>
            <li><span className="text-gold">Detoxification:</span> Helps cleanse and rejuvenate your system.</li>
            <li><span className="text-gold">Mind and Body Balance:</span> Supports mental clarity and emotional well-being.</li>
          </ul>
          <h2 className="text-gold font-semibold text-2xl my-8">Quality Commitment</h2>

         <p className="my-2">
          We ensure the highest standards of quality with ethically sourced ingredients and eco-friendly practices.
          Our products are rigorously tested for purity, and we maintain sustainable, fair-trade sourcing.
          </p>

          <h2 className="text-gold font-semibold text-2xl my-8">Our Vision</h2>
         <p className="my-2">We aim to bring the healing power of Ayurveda to everyone, empowering people to lead healthier lives naturally.</p>

         </div>
      <Link href='/shop' className="my-8 border-2 border-gold px-4 rounded-md ">
      Shop Now
      </Link>
      </section>
      <Footer />
     
    </main>
  );
};
export default AboutPage;
