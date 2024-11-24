import { cookies } from 'next/headers'
import { getUserSession } from "@/actions/userSession"
import { getAllOrders } from "@/data/admin"
import { notFound } from 'next/navigation'
import { OrdersList } from "./order"
import { HeaderWithSessionProvider } from "@/components/headerWithSessionProvider";

async function getCookieData() {
   const cookieData = cookies().getAll()
   return new Promise((resolve) =>
     setTimeout(() => {
       resolve(cookieData)
     }, 1000)
   )
 }

export default async function({ searchParams }: { searchParams: { [key: string]: string } }){
   const cookieData = await getCookieData()
   const user = await getUserSession()
   if(!user || user.role !== 'ADMIN') return notFound(); null;

   const orderIdFilter = searchParams.orderId ? { order_id: searchParams.orderId } : {};
   const page = parseInt(searchParams.page) || 1;
   const pageSize = 10;

   const data = await getAllOrders(page, pageSize, orderIdFilter);
   return (
      <main className="w-full pb-4">
         <HeaderWithSessionProvider/>
         <OrdersList 
            page={page}
            pageSize={pageSize}
            orderIdFilter={orderIdFilter}
         />

      </main>
   )
}