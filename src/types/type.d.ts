export type Product = {
   id : string;
   name : string;
   price : number;
   image : string;
   subImages : string[];
   description : string;
   discount : string;
   rating : number;
   category : string;
   quantity : number;
}

export type User = {
   id : string;
   name : string;
   email : string;
   role ?: 'ADMIN' | 'USER' | undefined ;
   image ?: string;
} | null | undefined;


export type Session = {
   user: User;
   expires: string;
 };

export type RazorpayOrder = {
   id: string;
   entity: string;
   amount:  string | number;
   amount_paid: number;
   amount_due: number;
   currency: string;
   receipt?: string | undefined;
   offer_id?: string | null | undefined;
   status: string;
   attempts: number;
   notes?: IMap<string | number> | undefined;
   created_at: number;
 } 
 


export interface ShippingAddress {
   phone: string;
   country: string;
   address: string;
   state: string;
   city: string;
   zip: string;
   otherInformation?: string;
   name: string;
 }


 export type Transactions = {
   id: string;
   order_id: string;
   userId?: string | null;
   payment_id: string;
   gateway_order_id: string;
   payment_status: string;
   payment_method: string;
   transaction_amount: number;
   taxAndFees: number;
   currency: string;
   transaction_date: Date;
   webHookResponse?: JsonValue;
   createdAt: Date;
   updatedAt: Date;
 };
 
 export type Order = {
   order_id: string;
   userId: string | null;
   gateway_order_id: string;
   order_status: string;
   total_price: number;
   shipping_address: JsonValue;
   payment_status: string;
   order_date: Date;
   updatedAt: Date;
   payment_method: string;
   shipping_method: string;
   cart_items: JsonValue;
   shipping: Shipping[];
   transactions: Transactions[];
 };
 
 export type OrdersData = {
   orders: Order[];
   totalOrders: number;
   currentPage: number;
   totalPages: number;
 };
 

export type OrderCardData = {
   id: string;
   order_id: string;
   carrier: string;
   tracking_number_waybill: string;
   shipping_status: string;
   shipping_address: ShippingAddress;
   delivery_charge: string;
   estimated_delivery: string;
   responseDelhivery: {
     cash_pickups_count: number;
     package_count: number;
     upload_wbn: string;
     replacement_count: number;
     pickups_count: number;
     packages: {
       status: string;
       client: string;
       sort_code: string;
       remarks: string[];
       waybill: string;
       cod_amount: number;
       payment: string;
       serviceable: boolean;
       refnum: string;
     }[];
     cash_pickups: number;
     cod_count: number;
     success: boolean;
     prepaid_count: number;
     cod_amount: number;
   };
   updatedAt: string;
 }

 export type CartCard = {
   id: string;
   name: string;
   price: number;
   image: string;
   subImages: string[];
   description: string;
   discount: string;
   rating: number;
   category: string;
   quantity: number;
 }
 