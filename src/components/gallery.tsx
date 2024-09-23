import Image from "next/image"
import TypingAnimation from "./magicui/typing-animation"

export const Gallery =()=>{
   return (
      <section className="flex flex-col items-center my-16">

         <h6 className="opacity-80 font-medium text-center">Share your Experience With Us!</h6>
         <TypingAnimation
           className="text-4xl font-bold my-5"
           text="#Gallery"
         />
      <div className="relative h-[30vh] md:h-[100vh] w-full">
      <Image
         src='/gallery.jpg'
         alt='gallery'
         fill
         style={{
            objectFit: 'cover',
         }}
      />
      </div>
      </section>
   )
}