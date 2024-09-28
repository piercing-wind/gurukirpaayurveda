'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

export const ConsentTaking18 = () => {
   const user = useCurrentUser();
   const [hasConsented, setHasConsented] = useState<boolean>(() => {
      if (typeof window !== 'undefined') {
         const consentStatus = localStorage.getItem('hasConsented');
         console.log(consentStatus);
         console.log(consentStatus === 'true');
         return consentStatus === 'true';
      }
      return false;
   });
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
      setIsMounted(true);
   }, []);

   const handleConsent = () => {
      setHasConsented(true);
      if (typeof window !== 'undefined') {
         localStorage.setItem('hasConsented', 'true');
      }
   };

   const handleExit = () => {
      if (typeof window !== 'undefined') {
         localStorage.setItem('hasConsented', 'false');
         window.close();
         window.location.href="https://www.google.com";
      }

   };
   if (user || !isMounted || hasConsented) {
      return null;
   }

   return (
      <div className="absolute top-0 left-0 backdrop-blur-md bg- h-[100vh] w-full overflow-hidden flex items-center justify-center z-50">
         <div className="w-[22rem] md:w-[34rem] bg-white rounded-md shadow-md flex items-center justify-start p-5 flex-col">
            <Image
               src='/GurukirpaAyurveda.svg'
               alt="Gurukirpa Ayurveda"
               width={200}
               height={30}
            />

         <h1 className="my-4 text-xl font-semibold text-center">Age Verification and Consent</h1>
         <p className=" my-4">This website offers age-restricted products related to sexual wellness. By entering this site, you affirm the following:</p>
         <ul className="text-sm flex flex-col gap-2 ml-4 list-disc">
            <li>I am at least 18 years old or the age of majority in my jurisdiction.</li>
            <li>I understand that this site contains content and products intended for adult use only.</li>
            <li>I consent to viewing and purchasing these products in accordance with all applicable laws</li>
         </ul>
            <div className="w-full flex flex-col md:flex-row my-5 mt-8 gap-4 items-center justify-between ">
               <Button 
               onClick={handleConsent}
               className="bg-gold w-full font-semibold text-lg shadow-md hover:scale-105  hover:bg-gold hover:bg-opacity-20 hover:text-gold transition-all duration-300">
                  I am 18 + or Older Enter
               </Button>
               <Button 
               onClick={handleExit}
               className="bg-goldLight bg-opacity-70 w-full font-semibold text-lg shadow-md hover:scale-105 border-2 border-gold  hover:bg-gold hover:bg-opacity-20 text-gold transition-all duration-300">
                  I am Under 18 Exit
               </Button>

            </div>
         </div>
      </div>
   )
}