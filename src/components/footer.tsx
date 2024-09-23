import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, Twitter, Youtube } from "./icons"
import Image from "next/image"

export const Footer=()=>{

   return(
      <section className="flex flex-col md:flex-row py-10 px-10 md:px-20 justify-between">
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
            <p className="text-sm my-4 w-64">2/2B, Darshan Avenue, Daburji Byepass, SpeedPost Centre BDC,<br/>Amritsar -I, Amritsar- 143001, Punjab</p>
            <p className="font-semibold mt-8">Follow Us</p> 
               <ul className="flex gap-4 mt-8">
                  <li><Instagram /></li>
                  <li><Facebook /></li>
                  <li><Youtube /></li>
                  <li><Twitter /></li>
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
               <li><Link href='tel:7009459011' className="flex items-center"><Phone size={24} />&nbsp;&nbsp;&nbsp;+91 70094 59011</Link></li>
               <li><Link href={`mailto:${process.env.MAIL}`} className="flex items-center"><Mail size={24} />&nbsp;&nbsp;&nbsp;{process.env.MAIL}</Link></li>
   
            </ul>
         </div>
      </section>
   )
}