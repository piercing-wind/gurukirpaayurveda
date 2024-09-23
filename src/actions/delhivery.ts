'use server'
import * as z from 'zod';
import { AddressSchema } from "@/schemas";
import { Product } from '@/types/type';
export const serviceAvailabilty = async (pin: string) => {
   console.log(process.env.DELHIVERY_API);
   try {
     const apiUrl = `https://${process.env.DELHIVERY_API_URL}/c/api/pin-codes/json/?filter_codes=${pin}`;
 
     const response = await fetch(apiUrl, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Token ${process.env.DELHIVERY_API}`
       }
     });
     const responseData = await response.json();
     console.log('Service Availability:', responseData);
     return responseData;
   } catch (error) {
     console.error("Error fetching service availability:", error);
     throw error; // Re-throw the error after logging it
   }
 };

 export const createShipment = async (formData: z.infer<typeof AddressSchema>, order_id: string, name: string, payment_mode: 'COD' | 'Pre-paid' | 'Pickup', cart : Product[], price: number) => {
      const url = 'https://track.delhivery.com/api/cmu/create.json';
      const apiKey = process.env.DELHIVERY_API;
      const productDesc = cart.map(item => item.name).join(' + ');
      if (!order_id) {
         throw new Error("Order ID must be provided and unique.");
      }

       
      const payload =  {
         shipments: [
           {
             add: formData.address,
             address_type: "home",  // optional
             phone: formData.phone,   // mandatory
             payment_mode: payment_mode,   // mandatory (Prepaid/COD/Pickup/REPL)
             name: name,        // mandatory
             pin: formData.zip,           // mandatory
             order: order_id,   // mandatory
             hsn_code: "30049011",   // Required for e-waybill
             shipping_mode: "Surface", // Surface/Express
             city : formData.city, // mandatory
             seller_name: "Gurukirpa Ayurved Jagdeep Singh", // optional
             fragile_shipment: true,    // Optional, for fragile items
             return_phone: "7009459011",// optional
             shipment_height: 5,
             shipment_width: 5,
             shipment_length : 5,
             commodity_value: price,    
             return_city: "Amritsar",  // optional
             weight: "100 (gms)",
          
             category_of_goods: "Ayurved", // optional
             return_country: "India",   // optional
             products_desc: `${productDesc} | Ayurvedic Products`, // optional, for intra-state
             state: "Punjab",        // optional
             dangerous_good: false,
             waybill : "",     // optional, True/False
             order_date: new Date().toISOString(), // optional
             return_add: "daburji bye pass , near goldan gate , darshan avenue , opposite skoda agency", // optional
             total_amount: price,       // optional
             seller_add: "daburji bye pass , near goldan gate , darshan avenue , opposite skoda agency", // optional
             country: "India",          // optional
             return_pin: "143001",      // optional
             extra_parameters: {        // optional
               return_reason: "Damaged Item"
             },
             return_name: "Return Name", // optional
             plastic_packaging: false,   // optional
             quantity: cart.length,                // optional
           }
         ],
         pickup_location: {
           name: "DESI",          // mandatory
           city: "Amritsar",                 // mandatory
           pin: "143001",                // mandatory
           country: "India",             // mandatory
           phone: "9149948103",          // mandatory
           add: "daburji bye pass , near goldan gate , darshan avenue , opposite skoda agency"  // mandatory
         }
       };


    if (payment_mode === "COD" && price !== undefined) {
         (payload.shipments[0] as { cod_amount?: number }).cod_amount = price;
    }
      const requestBody = `format=json&data=${encodeURIComponent(JSON.stringify(payload))}`;
   
      try {
         const response = await fetch(`${url}?api_key=${apiKey}`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': `Token ${apiKey}`,
               "type" : "text"
            },
            body: requestBody
         });
         console.log('Shipment Creation:', response);
         const data = await response.json();
   
         console.log('Shipment Creation:', JSON.stringify(data, null, 2));
         if (!response.ok) {
            throw new Error(`Failed to create shipment: ${data.message || 'Unknown error'}`);
         }
   
         return data;
      } catch (error) {
         console.error('Error:', error);
         throw error; 
      }
   };
   



export const trackShipment = async (waybillOrRefId: string, iswaybill = true) => {
   const url = `https://${process.env.DELHIVERY_API_URL}/api/v1/packages/json/?${iswaybill ? 'waybill' : 'ref_ids'}=${waybillOrRefId}`;
   const apiKey = process.env.DELHIVERY_API;
  console.log('Shipment Tracking:', url);
   try {
      const response = await fetch(url, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${apiKey}`
         }
      });
   
      const data = await response.json();
      console.log('Shipment Tracking:',  JSON.stringify(data, null, 2));
      return data;
   } catch (error) {
      console.error('Error fetching shipment tracking:', error);
      throw error;
   }
}
