import { CheckoutPageContent } from "@/components/checkoutPageContent";
import { Footer } from "@/components/footer";
import { HeaderWithSessionProvider } from "@/components/headerWithSessionProvider";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CheckoutPage = () => {
   return (
      <main className="w-full overflow-x-hidden">
         <HeaderWithSessionProvider />
         <section>
         <div className="relative w-full h-[10rem] md:h-[14rem] flex flex-col items-center justify-center gap-4">
            <Image 
               src='/bgBannerofCart.jpg'
               alt='GuruKirpa Ayurveda Shopping Cart Banner'
               fill
               style={{
                  objectFit: 'fill',
                  zIndex: -1
               }}
            />
            <div className="h-full w-full backdrop-blur-sm flex flex-col items-center justify-center gap-4">
               <h2 className="font-bold text-4xl">Checkout</h2>
               <p className="text-sm flex items-center"><Link href='/'>Home </Link><ChevronRight size={18}/> Checkout</p>
            </div>
         </div>
            <CheckoutPageContent />
         </section>
         <Footer/>
      </main>
   )
}

export default CheckoutPage;