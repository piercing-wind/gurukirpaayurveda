'use server';
import { db } from "@/lib/db";

export const getAllOrders = async (page: number = 1, pageSize: number = 10, orderIdFilter: { order_id?: string }) => {
   const skip = (page - 1) * pageSize;
   const orders = await db.order.findMany({
      skip,
      take: pageSize,
      where: orderIdFilter,
      include: {
         shipping: true,
         transactions: true,
      },
      orderBy: {
         order_date: 'desc', // Change 'desc' to 'asc' for ascending order
      },
   });

   const totalOrders = await db.order.count({
      where: orderIdFilter,
   });

   return {
      orders,
      totalOrders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / pageSize),
   };
}
export const deleteOrderById = async (orderId: string) => {
   try {
      const result = await db.order.delete({
         where: {
            order_id: orderId,
         },
      });

      return true
   }catch(error){ 
      console.error(`Error deleting order: ${error}`);
      throw error;
   }
}