import { Footer } from "@/components/footer";
import { HeaderWithSessionProvider } from "@/components/headerWithSessionProvider";
import { ProductItem } from "@/components/productItem";
import { Products } from "@/components/products";
import { products } from "@/products/data";
import { ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams(){
   return products.map((product) => ({
      params: { id: product.id },
    }));
}

export async function generateMetadata({ params }: { params: { id: string } }) : Promise<Metadata>{
   const product = products.find((product) => product.id === params.id);
   return{
      title: `Gurukirpa Ayurved ${product?.name}`,
      description: `Gurukirpa Ayurved ${product?.description}`,
      openGraph:{
         images:[
            {
               url : product?.image!,
            }
         ]
      }
   }
}


export default async function Product({ params }: { params: { id: string } }) {
   const product = products.find((product) => product.id === params.id);
   if (!product) {
      return <div>Product not found</div>;
    }
    const filteredProducts = products.filter((item) => item.category.includes(product.category));

   return (
      <main className="w-full">
          <HeaderWithSessionProvider />
         <section>
            <div className="w-full px-20 p-10 bg-[#FCF8F3] ">
               <div className="flex items-center gap-2 ">
                  <Link href='/' className="hover:text-gold text-opacity-50 opacity-60 transition-all duration-500 hover:scale-105 ">Home</Link>
                  <ChevronRight size={20}/>
                  <Link href='/shop' className="hover:text-gold text-opacity-50 opacity-60 transition-all duration-500 hover:scale-105 ">Shop</Link>
                  <ChevronRight size={20}/>
                  <span className="font-extralight text-2xl opacity-60">|</span>
                  <span className="font-semibold">{product.name}</span>
               </div>
            </div>
            <ProductItem product={product} />
         <div className="w-full flex flex-col items-center justify-center">
               
            <Products products={filteredProducts} title="Related Products" />
               
         </div>
      
         </section>
         <Footer/>
      </main>
 );
}