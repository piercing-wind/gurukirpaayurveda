import { db } from "@/lib/db"
export const getOrdersById=async (userId:string)=>{
   if(!userId){
      return;
   }
   try{
      const order = await db.order.findMany({
         where:{
            userId
         },
         include:{
            shipping : true,
         },  
         orderBy:{
            updatedAt: "asc"
         }
      })
      return order;
   }catch(e){
      console.error(e)
   }
}