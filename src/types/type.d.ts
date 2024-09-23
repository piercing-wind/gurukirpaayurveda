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
 