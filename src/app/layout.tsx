import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/components/cartContext";
import { Toaster } from "@/components/ui/sonner"
import Link from "next/link";
import { WhatsAppGreen } from "@/components/icons";

const poppins = localFont({
   src: [
      {
         path: './fonts/Poppins/Poppins-Black.ttf',
         weight: '900',
         style: 'normal',
       },
       {
         path: './fonts/Poppins/Poppins-BlackItalic.ttf',
         weight: '900',
         style: 'italic',
       },
       {
         path: './fonts/Poppins/Poppins-Bold.ttf',
         weight: '700',
         style: 'normal',
       },
       {
         path: './fonts/Poppins/Poppins-BoldItalic.ttf',
         weight: '700',
         style: 'italic',
       },
       {
         path: './fonts/Poppins/Poppins-ExtraBold.ttf',
         weight: '800',
         style: 'normal',
       },
       {
         path: './fonts/Poppins/Poppins-ExtraBoldItalic.ttf',
         weight: '800',
         style: 'italic',
       },
       {
         path: './fonts/Poppins/Poppins-ExtraLight.ttf',
         weight: '200',
         style: 'normal',
       },
       {
         path: './fonts/Poppins/Poppins-ExtraLightItalic.ttf',
         weight: '200',
         style: 'italic',
       },
       {
         path: './fonts/Poppins/Poppins-Italic.ttf',
         weight: '400',
         style: 'italic',
       },
       {
         path: './fonts/Poppins/Poppins-Light.ttf',
         weight: '300',
         style: 'normal',
       },
       {
         path: './fonts/Poppins/Poppins-LightItalic.ttf',
         weight: '300',
         style: 'italic',
       },
       {
         path: './fonts/Poppins/Poppins-Medium.ttf',
         weight: '500',
         style: 'normal',
       },
       {
         path: './fonts/Poppins/Poppins-MediumItalic.ttf',
         weight: '500',
         style: 'italic',
       },
       {
         path: './fonts/Poppins/Poppins-Regular.ttf',
         weight: '400',
         style: 'normal',
       },
       {
         path: './fonts/Poppins/Poppins-SemiBold.ttf',
         weight: '600',
         style: 'normal',
       },
       {
         path: './fonts/Poppins/Poppins-SemiBoldItalic.ttf',
         weight: '600',
         style: 'italic',
       },
       {
         path: './fonts/Poppins/Poppins-Thin.ttf',
         weight: '100',
         style: 'normal',
       },
       {
         path: './fonts/Poppins/Poppins-ThinItalic.ttf',
         weight: '100',
         style: 'italic',
       },
     ],
   variable: '--font-poppins',
 });
 
 export const metadata: Metadata = {
   title: "Gurukirpa Ayurveda | Vaid Gurmeet Singh",
   metadataBase: new URL("https://vaidgurmeetsingh.com"),
   description:"Discover Gurukirpa Ayurveda, your destination for authentic Ayurvedic products designed for sexual wellness, including penis enlargement, stamina enhancement, and vitality boosts. Experience natural solutions for improved intimacy and confidence.",
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
      description : "Discover Gurukirpa Ayurveda, your destination for authentic Ayurvedic products designed for sexual wellness, including penis enlargement, stamina enhancement, and vitality boosts. Experience natural solutions for improved intimacy and confidence.",
   },  
   other:{
      ["bingbot"]: "noarchive",
   }
 };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (  
     <html lang="en">
      <body
        className={`${poppins.variable} antialiased relative`}
        >
       <CartProvider >
        {children}
       </CartProvider>
       <Toaster toastOptions={{
         classNames:{
            toast : 'border border-gold',
            actionButton : 'bg-gold text-white border-2 border-gold',
            'closeButton' : 'bg-gold text-white hover:text-gold hover:border hover:border-gold',
            'title' : 'text-gold',
         }
         }}/>
         <Link href={'https://wa.me/+919513651313?text=Hi%20*Vadi%20Gurmeet%20Singh*%2C%20I%E2%80%99m%20interested%20in%20your%20Ayurvedic%20products%20and%20would%20like%20to%20know%20more.%20Can%20you%20assist%20me%20with%20further%20details%3F'} className="fixed bottom-[50%] z-20 left-12 opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-200 ">
            <WhatsAppGreen size={40}/>
         </Link>
      </body>
    </html>
  );
}
