import { HeaderWithSessionProvider } from "@/components/headerWithSessionProvider";

import { Footer } from "@/components/footer";
import ShopPage from "@/components/shopPage";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Gurukirpa Ayurveda Shop | Vaid Gurmeet Singh",
   metadataBase: new URL("https://vaidgurmeet.com/shop"),
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
      </main>
   )
};

export default ProductPage;