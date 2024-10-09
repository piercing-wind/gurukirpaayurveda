import { Footer } from "@/components/footer";
import { HeaderWithSessionProvider } from "@/components/headerWithSessionProvider";
import CSS from "@/app/about/about.module.css"
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Gurukirpa Ayurveda Shop | Vaid Gurmeet Singh",
   metadataBase: new URL("https://vaidgurmeetsingh.com/about"),
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
   alternates: { canonical: "/about" },
   twitter:{
      card : 'summary_large_image'
   },
   openGraph:{
      type : 'website',
      url : 'website',
      title : "Gurukirpa Ayurveda",
      siteName : "Gurukirpa Ayurveda",
      images:[
         {
           url: "/opengraph-image.jpg"	,
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
      <section className="w-[95%] lg:w-[70%] mx-auto flex flex-col items-center justify-start  my-16 tracking-wide px-4 lg:px-24">
        <h1 className="text-3xl font-semibold text-gold mb-4">
          About Us – Gurukirpa Ayurveda
        </h1>
        <p className="tracking-wide my-4">
  Welcome to Gurukirpa Ayurveda, where we blend ancient wisdom with modern living to offer natural health solutions. Our mission is to promote balance and healing through high-quality products that nurture the body, mind, and spirit.
</p>
<div>
  <h2 className="text-gold font-semibold text-2xl my-8">Why Choose Us?</h2>
  <p>
    Our approach focuses on holistic healing by addressing the root causes of health issues rather than just symptoms. We provide remedies that aim to restore harmony and balance.
  </p>
  
  <h2 className="text-gold font-semibold text-2xl my-8">Our Products</h2>
  <p className="my-2"> We offer a diverse range of natural products designed to enhance:</p>
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
    <li><span className="text-gold">Natural and Safe:</span> Made with 100% natural ingredients for daily use.</li>
    <li><span className="text-gold">Boosts Immunity:</span> Strengthens the body’s natural defenses.</li>
    <li><span className="text-gold">Detoxification:</span> Cleanses and rejuvenates your system.</li>
    <li><span className="text-gold">Mind and Body Balance:</span> Supports mental clarity and emotional well-being.</li>
  </ul>
  
  <h2 className="text-gold font-semibold text-2xl my-8">Quality Commitment</h2>

  <p className="my-2">
    We uphold the highest quality standards with ethically sourced ingredients and eco-friendly practices. Our products undergo rigorous testing for purity, and we are committed to sustainable, fair-trade sourcing.
  </p>

  <h2 className="text-gold font-semibold text-2xl my-8">Our Vision</h2>
  <p className="my-2">We strive to share the healing benefits of nature with everyone, empowering individuals to lead healthier lives naturally.</p>
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
