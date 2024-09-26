import Link from "next/link"
import { Facebook, Instagram, Location, Mail, Phone, Twitter, Youtube } from "./icons"
import Image from "next/image"

export const Footer=()=>{

   return(
      <section className="flex flex-col md:flex-row py-10 px-8 md:px-20 justify-between">
         <div className="">
            <Link href='/'>
            <div className="relative w-64 h-24 mb-4">
              <Image
                src="/GurukirpaAyurveda.svg"
                alt="logo"
                fill
                style={{
                   objectFit: "contain",
                  }}
                  />
            </div>
            </Link>
            <p className="text-sm my-4 w-64">Shop No 13, Bus Stand, Bachre, Tarn Taran Sahib, Punjab 143401</p>
            <p className="font-semibold mt-8">Follow Us</p> 
               <ul className="flex gap-4 mt-8">
                  <li><Link target="_blank" href='https://www.instagram.com/vaid.gurmeetsingh?igsh=dGo3ODNzdmdhajU4'><Instagram /></Link></li>
                  <li><Link target="_blank" href='https://www.facebook.com/profile.php?id=100084620025877&mibextid=ZbWKwL'><Facebook /></Link></li>
                  <li><Link target="_blank" href='https://www.youtube.com/@vaidgurmeetsingh6207'><Youtube /></Link></li>
                  <li><Link target="_blank" href='https://www.google.com/maps/place/Gurukirpa+Ayurveda/@31.463195,74.9341128,17z/data=!3m1!4b1!4m6!3m5!1s0x39197fc73a0bff29:0x5c26ea29a21cf55d!8m2!3d31.463195!4d74.9341128!16s%2Fg%2F11sbqk0ghr?entry=ttu&g_ep=EgoyMDI0MDkyMi4wIKXMDSoASAFQAw%3D%3D'><Location /></Link></li>
               </ul>
         </div>

         <div className="mt-14 md:mt-0">
            <span className="opacity-70">Links</span>
            <ul className="flex flex-col gap-5 my-8">
               <li><Link href='/'>Home</Link></li>
               <li><Link href='/shop'>Shop</Link></li>
               <li><Link href='/about'>About</Link></li>
               <li><Link href='/contact'>Contact</Link></li>
               <li><Link href='/myaccount'>My Account</Link></li>
               <li><Link href='/myaccount'>Track Order</Link></li>
            </ul>
         </div>

         <div>
            <span className="opacity-70">Help</span>
            <ul className="flex flex-col gap-5 my-8">
               <li><Link href='/refund-policy'>Refund Policy</Link></li>
               <li><Link href='/terms-and-condition'>Terms & Condition</Link></li>
               <li><Link href='/privacy-policy'>Privacy Policy</Link></li>
               <li><Link href='/shipping-policy'>Shipping Policy</Link></li>
            </ul>
         </div>
         <div>
            <span className="opacity-70">Get In Touch</span>
            <ul className="flex flex-col gap-5 my-8">
               <li><Link href='tel:9513651313' className="flex items-center"><Phone size={24} />&nbsp;&nbsp;&nbsp;+91 95136 51313</Link></li>
               <li><Link href={`mailto:${process.env.MAIL}`} className="flex items-center flex-wrap text-wrap break-words whitespace-normal"><Mail size={24} /> <span className="md:px-2"/> {process.env.MAIL}</Link></li>
            </ul>
         </div>
      </section>
   )
}