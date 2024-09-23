export const dynamic = "force-dynamic"
import { getOrdersById } from "@/actions/orders";
import { getUserSession } from "@/actions/userSession";
import { HeaderWithSessionProvider } from "@/components/headerWithSessionProvider";
import { Shop } from "@/components/icons";
import { PastOrder } from "@/components/pastOrder";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MyAccount = async ()=>{
   const user = await getUserSession();
   const orders = await getOrdersById(user?.id!);
  return ( 
   <main className="w-full h-full overflow-x-hidden">
      <HeaderWithSessionProvider />
      <section className="w-[95%]  mx-auto">
         <div className=" my-14 flex items-center gap-5 justify-center">
            {user?.image !== null ? (
               <div className="relative h-24 w-24 p-1 rounded-full border-2 border-gold overflow-hidden flex-shrink-0">
                  <Image
                     src={user?.image!}
                     alt="profile"
                     fill
                     className="hover:scale-105 transition-all duration-500"
                     style={{
                        objectFit: "cover",
                     }}
                  />
               </div>
            ) :(        
            <div className="realtive h-24 w-24 rounded-full border-2 border-gold overflow-hidden flex-shrink-0 p-2">
               <User className=" h-full w-full"/>
            </div>) }
               <div className="flex-col flex gap-y-2">
                  <h6 className="text-2xl font-semibold mt-4">{user?.name}</h6>
                  <p className="tracking-wide text-xs ">{user?.email}</p>
               </div>
         </div>

         <div className="flex gap-8 text-gold font-medium px-8 items-center justify-center">
               <p>My Orders</p>
         </div>

        {orders && orders?.length > 0 &&
             <div className="flex gap-5 flex-wrap items-center justify-center my-10">
               {orders?.map((order) => (
                  <PastOrder key={order.order_id} order={order} />
               ))
               }
         </div>
         }
         {orders && orders.length === 0 && 
         <div className="w-[20rem] flex flex-col my-10  items-center justify-center gap-10 mx-auto">
            <h1 className="text-xl md:text-3xl font-semibold">You don&apos;t have orders!</h1>

            <Shop size={200}/>

            <Link href="/shop" className="text-gold border-2 border-gold px-10 py-1 rounded-md">
               Go to shop
            </Link>
         </div>

         }


      </section>

   </main>
)
}

export default MyAccount;