import { Footer } from "@/components/footer";
import { HeaderWithSessionProvider } from "@/components/headerWithSessionProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Gurukirpa Ayurveda Contact",
   metadataBase: new URL("https://vaidgurmeet.com/about"),
   description:"Get in touch with Gurukirpa Ayurveda for inquiries about our Ayurvedic products and services. Our dedicated team is here to assist you with your health and wellness needs.",
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
            alt : "Gurukirpa Ayurveda"
         }
      ],
      description : "Get in touch with Gurukirpa Ayurveda for inquiries about our Ayurvedic products and services. Our dedicated team is here to assist you with your health and wellness needs.",
   },  
   other:{
      ["bingbot"]: "noarchive",
   }
 };

const ContactPage = () => {
   return (
      <main className="w-full">
         <HeaderWithSessionProvider/>
         <section className="p-6 w-full md:w-[70%] mx-auto">
            <h1 className="text-3xl font-bold text-gold mb-8">Contact Us</h1>
            <h2 className="text-2xl font-bold text-gold mb-2">1. Contact Information</h2>
            <p className="text-lg mb-4">
               If you have any questions or concerns about our Privacy Policy, please contact us at:
            </p>
            <ul className="list-disc list-inside mb-4">
               <li><span className="text-gold">Email: </span> {process.env.MAIL}</li>
               <li><span className="text-gold">Phone:</span> +91 95136 51313</li>
               <li className="w-[95%] md:w-[40%] "><span className="text-gold">Address:</span> 2/2B, Darshan Avenue, Daburji Byepass, SpeedPost Centre BDC, Amritsar -I, Amritsar- 143001, Punjab</li>
            </ul>
            <h2 className="text-2xl font-bold text-gold mb-2">2. Mailing Address</h2>
            <p className="text-lg mb-4">
               You can also reach us by mail at the following address:
            </p>
            <address className="text-lg mb-4">
               {process.env.ADDRESS}
            </address>
            <h2 className="text-2xl font-bold text-gold mb-2">3. Business Hours</h2>
            <p className="text-lg mb-4">
               Our business hours are as follows:
            </p>
            <ul className="list-disc list-inside mb-4">
               <li>Monday-Friday: 9:00 AM - 5:00 PM <span className="text-xs">GMT +5:30</span></li>
               <li>Saturday: 10:00 AM - 3:00 PM <span className="text-xs">GMT +5:30</span></li>
               <li>Sunday: Closed</li>
            </ul>
            <h2 className="text-2xl font-bold text-gold mb-2">4. Feedback</h2>
            <p className="text-lg mb-4">
               We value your feedback and suggestions. Please let us know how we can improve our services.
            </p>
            </section>            
         <Footer/>
      </main>
   );
   }
export default ContactPage;