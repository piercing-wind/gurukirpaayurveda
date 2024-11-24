import { HeaderWithSessionProvider } from "@/components/headerWithSessionProvider";

import { Footer } from "@/components/footer";
import ShopPage from "@/components/shopPage";
import { Metadata } from "next";
import Link from "next/link";
import { WhatsAppGreen } from "@/components/icons";

export const metadata: Metadata = {
   title: "Gurukirpa Ayurveda Shop | Vaid Gurmeet Singh",
   metadataBase: new URL("https://vaidgurmeetsingh.com/shop"),
   description:"Shop Gurukirpa Ayurveda for premium Ayurvedic products focused on sexual wellness, including penis enlargement, stamina enhancement, and vitality boosters. Explore natural solutions to elevate your intimacy and overall confidence.",
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
   alternates: { canonical: "/shop" },
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
      description : "Shop Gurukirpa Ayurveda for premium Ayurvedic products focused on sexual wellness, including penis enlargement, stamina enhancement, and vitality boosters. Explore natural solutions to elevate your intimacy and overall confidence.",
   },  
   other:{
      ["bingbot"]: "noarchive",
   }
 };

const ProductPage = () => {

   return (
      <main className="">
         <HeaderWithSessionProvider />
         <ShopPage/>
         <Footer/>
         <Link href={'https://wa.me/+919513651313?text=Hi%20*Vadi%20Gurmeet%20Singh*%2C%20I%E2%80%99m%20interested%20in%20your%20Ayurvedic%20products%20and%20would%20like%20to%20know%20more.%20Can%20you%20assist%20me%20with%20further%20details%3F'} className="fixed bottom-[10%] z-20 left-12 opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-200">
           <WhatsAppGreen size={40}/>
         </Link>
      </main>
   )
};

export default ProductPage;