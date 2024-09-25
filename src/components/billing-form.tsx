'use client';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { AddressSchema, GST_IN } from '@/schemas';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import ReactCountryFlag from "react-country-flag";
import { countries } from "@/lib/countriesList";
import { v4 as uuidv4 } from 'uuid';
import Link from "next/link";
import { CashPayment, MasterCard, OnlinePayment, UpiIcon, Visa } from "@/components/icons";
import { Product, RazorpayOrder } from "@/types/type";
import { createOrder, createShipmentOrder, successPayment, verifyPayment } from "@/actions/billing-form";
import { toast } from "sonner";
import { ArrowLeftIcon, X } from "lucide-react";
import { serviceAvailabilty } from "@/actions/delhivery";
import { motion, useInView } from 'framer-motion';
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

type CountryOption = {
  value: string;
  label: string; 
};

type BillingFormProps = {
   cart: Product[];
   Total: number;
   TotalSavings: number;
   transportationCharge: string;
   billTotal: number;
   billTotalWithCash: number;
   setActiveComponent: (value: string) => void;
   clearCart: () => void;
}


export const BillingForm :React.FC<BillingFormProps> = ({cart, Total, TotalSavings, transportationCharge, billTotal,billTotalWithCash, setActiveComponent, clearCart}) => {
   const user = useCurrentUser()
   const [isPending, setIsPending] = useState<boolean>(false);
   const [loading, startTransition] = useTransition();
   const [payment, setDisablePayement] = useState<boolean>(true);
   const [showSelect, setShowSelect] = useState(false);
   const formRef = useRef<HTMLFormElement>(null);
   const formRefGST = useRef<HTMLFormElement>(null);
   const selectId =`react-select-${uuidv4()}`
   const amountToCharge = Math.floor(billTotal * 1000) / 10;
   const description = cart.map((item)=> item.name).join(', ');
   const [gst_Input, setGSTInput] = useState<CheckedState>(false);
   const [openPaymentMode, setOpenPaymentMode] = useState<boolean>(false);
   const [submitedGST, setSubmitedGST] = useState<boolean>(false);
   const [diliveryAvailable, setDiliveryAvailable] = useState<boolean>(false);
   
   const defaultFormData = {
      phone: '',
      country: 'India',
      address: '',
      state: '',
      city: '',
      zip: '',
      otherInformation: '',
      businesName: user?.name || '',
      gst_in: '',
      pan: ''
    } 
   const defaultFormDataForGST = {
      businesName: user?.name || '',
      gst_in: '',
      pan: ''
    } 
   
   const [formData, setFormData] = useState<z.infer<typeof AddressSchema>>(defaultFormData);
   const [formDataGST, setFormDataGST] = useState<z.infer<typeof GST_IN>>(defaultFormDataForGST);

   const form = useForm<z.infer<typeof AddressSchema>>({
     resolver: zodResolver(AddressSchema),
     defaultValues: defaultFormData,
   });

   const formForGST = useForm<z.infer<typeof GST_IN>>({
     resolver: zodResolver(GST_IN),
     defaultValues: defaultFormDataForGST,
   });


   useEffect(() => {
      setShowSelect(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
      return () => {
         document.body.removeChild(script);
      };
   }, []);

   const processPayment = async () => {
      setSubmitedGST(true);
      if (formRef.current) {
         formRef.current.requestSubmit();
       }
       if (formRefGST.current) {
         formRefGST.current.requestSubmit();
       }
      const validatedData = GST_IN.safeParse(formDataGST);

       if (gst_Input && !validatedData.success) {
         toast.error('Please fill the GSTIN details to proceed with Cash on Delivery',{
            duration: 20000,
            closeButton: true,
         });
         return;
      }
      toast.error(
         'Online Payments are coming soon! Please use Cash on Delivery for now.',
      )

      // try {
      
      //    const order : RazorpayOrder = await createOrder(amountToCharge, formData, cart);
   
      //    const options = {
      //       key_id : process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      //       amount : order?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      //       currency : order?.currency,
      //       name : "Gurukirpa Ayurveda",
      //       description : description,
      //       image : `https://${process.env.NEXT_PUBLIC_WEBSITE_URL}/logo.png"`, 
      //       order_id : order?.id,
      //       // redirect : true,
      //       callback_url : "https://eneqd3r9zrjok.x.pipedream.net/",
      //       prefill : { 
      //           "name": order?.notes.name, 
      //           "email": order?.notes.email,
      //           "contact": form.getValues('phone') 
      //       },
      //       notes : {
      //           "name": "Gurukirpa Ayurveda",
      //           "userId": order?.notes.userId
      //       },
      //       theme : {
      //           "color": "#B88E2F"
      //       },
      //       send_sms_hash : true,
      //       app_name : "Gurukirpa Ayurveda",
      //       modal: {
      //          ondismiss: function () {
      //            // Handle the case where the user exits the payment page without paying
      //            toast.error('Payment was not completed. Please try again.', {
      //              duration: 20000,
      //              closeButton: true,
      //            });
      //            setIsPending(false);
      //            setDisablePayement(false);
      //            setIsPending(false);
      //          }
      //        },
      //       handler: function (response : any) {
      //          // Payment success    
      //          const verification = verifyPayment(response.razorpay_payment_id, order.id, response.razorpay_signature)
      //          if(!verification){
      //             toast.error('Payment verification failed! Please contact support',{
      //                duration: 20000,
      //                closeButton: true,
      //             });
      //             return;
      //          }
      //          startTransition(() => {
      //             successPayment(order.id, response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature, order.amount).then((response)=>{
                  
      //                if(response.status === 'captured'){
      //                   createShipmentOrder(formData, cart, billTotal, 'Pre-paid', transportationCharge.toString(),formDataGST,response.orderId).then((response)=>{

      //                      if(response.success){
      //                         toast.success(`Order Placed Successfully! Your order will be dispatched soon. Use this ${response.waybill} for track your order!`,{
      //                            duration: 30000,
      //                            closeButton: true,
      //                         });
      //                         clearCart();
      //                         setActiveComponent('SuccessPayment');
      //                      }else{
      //                         toast.error('An error occurred while placing the order. Please try again later.',{
      //                            duration: 20000,
      //                            closeButton: true,
      //                         });
      //                      }
                           
      //                   }).catch((error)=>{
      //                      toast.error(`An error occurred: ${(error as Error).message}`,{
      //                         duration: 20000,
      //                         closeButton: true,
      //                      });
      //                      console.log(error);
      //                   });
                        
      //                }
      //             clearCart();
      //             setActiveComponent('SuccessPayment');
      //             }).catch((error) => {
      //                console.error(error);
      //                throw new Error(`${(error as Error).message} Error in creating order`);
      //              });
      //          });
     
      //          toast.success(`Payment successful! Payment ID: ${response.razorpay_payment_id}`,{
      //             duration: 20000,
      //             closeButton: true,
      //          });
               
      //        },
      //    };
      //    if (typeof window !== "undefined") {
      //       // Client-side-only code
      //       const rzp = new (window as any).Razorpay(options);
      //       rzp.open();
      //       rzp.on('payment.failed', function (response : any) {
      //          // Payment failed
      //          toast.error(`Payment failed! Reason: ${response.error.description}`,{
      //             duration: 20000,
      //             closeButton: true,
      //          });
      //          console.log('Payment failed:', response);
      //        })
        
      //    }
   
      //    } catch (error) {
      //       console.error(error);
      //       toast.error(`An error occurred: ${(error as Error).message}`,{
      //          duration: 20000,
      //          closeButton: true,
      //       });
            
      //    }finally{
      //       setIsPending(false);
      //    }
   }

   const cashOnDelivery = async () => {

      if (formRef.current) {
         formRef.current.requestSubmit();
       }
      if (formRefGST.current) {
        formRefGST.current.requestSubmit();
      }
      const validatedData = GST_IN.safeParse(formDataGST);
      if (gst_Input && !validatedData.success) {
         toast.error('Please fill the GSTIN details to proceed with Cash on Delivery',{
            duration: 20000,
            closeButton: true,
         });
         return;
      }

      createShipmentOrder(formData, cart, billTotalWithCash, 'COD', transportationCharge.toString(), formDataGST).then((response)=>{
         if(response.success){
            toast.success(`Order Placed Successfully! Your order will be dispatched soon. Use this ${response.waybill} for track your order!`,{
               duration: 30000,
               closeButton: true,
            });
            clearCart();
            setActiveComponent('SuccessPayment');
         }else{
            toast.error('An error occurred while placing the order. Please try again later.',{
               duration: 20000,
               closeButton: true,
            });
         }
         
         setActiveComponent('SuccessPayment');
      }).catch((error)=>{
         toast.error(`An error occurred: ${(error as Error).message}`,{
            duration: 20000,
            closeButton: true,
         });
         console.log(error);
      });
      toast.success('Order Placed Successfully! Your order will be dispatched soon. Use this 123456789 for track your order!',{
         duration: 30000,
         closeButton: true,
      });

   }

   const onSubmit = async (data: z.infer<typeof AddressSchema>) => {   
      setFormData(data);
      setIsPending(true);
      setDisablePayement(true);
      setSubmitedGST(true);
      if(submitedGST) return;
      try{
         const res = await serviceAvailabilty(data.zip);
         if(res.delivery_codes[0] === undefined || res.delivery_codes.length == 0){
            toast.error('We are sorry, but we are unable to deliver to this location. Please try again with a different address.',{
               duration: 20000,
               closeButton: true,
            });
            return;
         }
         if (res && res.delivery_codes && res.delivery_codes.length > 0){
            const remarks = res.delivery_codes[0].postal_code.remarks;
            if (remarks === ''){
               toast.success('Delivery is available at this location, Please proceed with Payment!',{
                  duration: 20000,
                  closeButton: true,
               })
               setDisablePayement(false);
               setDiliveryAvailable(true);
               return;
            } else if( remarks.toLowerCase() === 'embargo'){
               toast.error('We are sorry, but we are unable to deliver to this location at the moment. Please try again later.',{
                  duration: 20000,
                  closeButton: true,
               });
               setDisablePayement(true);
               return
            } else{
               toast.error('We are sorry, but we are unable to deliver to this location. Please try again with a different address.',{
                  duration: 20000,
                  closeButton: true,
               });
               setDisablePayement(true);
               return;
            }
         }
      }catch(error){
         toast.error(`An error occurred: ${(error as Error).message}`,{
            duration: 20000,
            closeButton: true,
         });
         console.log(error);
      } finally{
         setIsPending(false);
      }

   }

   const onSubmitGST_IN = async (data: z.infer<typeof GST_IN>) => {
      setFormDataGST(data)
   }
 
   const fadeInUp = {
      hidden: { opacity: 0, y: 100 },
      visible: { opacity: 1, y: 0, transition: { duration:1 } },
      exit: { opacity: 0, y: -100, transition: { duration: 1 } },
   };

   return (
      <section className="w-full flex flex-col items-center md:flex-row pt-12 md:items-start justify-center gap-10">
         <div className="relative w-[26rem] md:w-[30rem] p-2 flex flex-col items-center justify-center">
          <Button variant={'link'} onClick={()=>setActiveComponent('CartCalculation')} className="absolute left-8 -top-10 md:-left-10 transition-all duration-300 hover:text-gold">Back <ArrowLeftIcon size={14} /></Button>
          <h4 className="mb-4  font-semibold text-gold text-xl">Delivery Address</h4>

            <Form {...form}>
               <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}
                 className="flex flex-col space-y-4 p-2"
                 >
                  <div className="flex flex-col gap-2 mx-4 ">
                 
                   <FormField
                     control={form.control}
                     name="phone"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className='font-medium text-sm'>
                              Phone Number <span className='text-red-500'>*</span>
                           </FormLabel>
                           <FormControl>
                              <Controller
                                 control={form.control}
                                 name="phone"
                                 render={({ field }) => (
                                    <PhoneInput
                                       country={'in'}  // Default country code
                                       enableSearch
                                       value={field.value}
                                       onChange={field.onChange} // Hook up with form controller
                                       inputProps={{
                                          name: 'phone',
                                          required: true,
                                       }}
                                       disabled={isPending || loading}
                                       dropdownClass="bg-white border border-gold w-full rounded-md" 
                                       containerClass="w-full border border-gold rounded-md"
                                       inputClass="w-full bg-white p-2 text-xs rounded-md focus:ring-2 focus:ring-gold border-none" 
                                       inputStyle={{
                                          width: '100%',
                                          backgroundColor: 'white',
                                          border: '#B88E2F',
                                          outline: 'none',
                                        }}
                                    />
                                 )}
                              />
                           </FormControl>
                           <FormMessage>{form.formState.errors.phone?.message}</FormMessage>
                        </FormItem>
                     )}
                  />
                  <FormField 
                     control={form.control}
                     name="country"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className='font-medium text-sm'>Country <span className='text-red-500'>*</span></FormLabel>
                           <FormControl>
                           {showSelect && (
                              <Select<CountryOption>
                                 {...field}
                                 inputId={selectId}
                                 options={countries} // Use the countries array directly
                                 className='react-select'
                                 classNamePrefix='select'
                                 isClearable={false}
                                 placeholder="Select Country"
                                 formatOptionLabel={({ label, value }) => (
                                    <div className="flex items-center">
                                       <ReactCountryFlag
                                          countryCode={value}
                                          svg
                                          style={{
                                             width: '1.5em',
                                             height: '1.5em',
                                             marginRight: '8px',
                                          }}
                                          aria-label={label}
                                       />
                                       {label}
                                    </div>
                                 )}
                                 styles={{
                                    control: (base) => ({
                                       ...base,
                                       borderColor: '#B88E2F',
                                       boxShadow: 'none',
                                       '&:hover': { borderColor: '#B88E2F' },
                                    }),
                                 }}
                                 value={countries.find(country => country.label === field.value)} // Set the current value
                                 onChange={(option: CountryOption | null) => {
                                    field.onChange(option ? option.label : ''); // Handle change correctly
                                 }} 
                              />
                            )}
                           </FormControl>
                           <FormMessage>{form.formState.errors.country?.message}</FormMessage>
                        </FormItem>
                     )}
                  />

                  <FormField 
                      control={form.control}
                      name="state"
                      render={({field})=>(
                         <FormItem>
                            <FormLabel className='font-medium text-sm'>State <span className='text-red-500'>*</span></FormLabel>
                            <FormControl>
                               <Input 
                               {...field}
                               placeholder='state'
                               type='text'
                               disabled={isPending || loading}
                               className='border border-gold rounded-md text-xs p-2 w-full active:outline-none focus:outline-none focus:ring-2 focus:ring-gold '
                               />
                            </FormControl>
                            <FormMessage>{form.formState.errors.state?.message}</FormMessage>
                         </FormItem>
                      )}
                   />
                  <FormField 
                      control={form.control}
                      name="city"
                      render={({field})=>(
                         <FormItem>
                            <FormLabel className='font-medium text-sm'>City <span className='text-red-500'>*</span></FormLabel>
                            <FormControl>
                               <Input 
                               {...field}
                               placeholder='city'
                               type='text'
                               disabled={isPending || loading}
                               className='border border-gold rounded-md text-xs p-2 w-full active:outline-none focus:outline-none focus:ring-2 focus:ring-gold '
                               />
                            </FormControl>
                            <FormMessage>{form.formState.errors.city?.message}</FormMessage>
                         </FormItem>
                      )}
                   />
                  <FormField 
                      control={form.control}
                      name="address"
                      render={({field})=>(
                         <FormItem>
                            <FormLabel className='font-medium text-sm'>Street Address <span className='text-red-500'>*</span></FormLabel>
                            <FormControl>
                               <Input 
                               {...field}
                               placeholder='Your local Address'
                               type='text'
                               disabled={isPending || loading}
                               className='border border-gold rounded-md text-xs p-2 w-full active:outline-none focus:outline-none focus:ring-2 focus:ring-gold '
                               />
                            </FormControl>
                            <FormMessage>{form.formState.errors.address?.message}</FormMessage>
                         </FormItem>
                      )}
                   />
                  <FormField 
                      control={form.control}
                      name='zip'
                      render={({field})=>(
                         <FormItem>
                            <FormLabel className='font-medium text-sm'>Zip Code <span className='text-red-500'>*</span></FormLabel>
                            <FormControl>
                               <Input 
                               {...field}
                               placeholder='zip code'
                               type='text'
                               disabled={isPending || loading}
                               className='border border-gold rounded-md text-xs p-2 w-full active:outline-none focus:outline-none focus:ring-2 focus:ring-gold '
                               />
                            </FormControl>
                            <FormMessage>{form.formState.errors.zip?.message}</FormMessage>
                         </FormItem>
                      )}
                   />
                  <FormField 
                      control={form.control}
                      name='otherInformation'
                      render={({field})=>(
                         <FormItem>
                            <FormLabel className='font-medium text-sm'>Additional Information </FormLabel>
                            <FormControl>
                            <textarea 
                               {...field}
                               placeholder='Optional'
                               disabled={isPending || loading}
                               className='border border-gold rounded-md text-xs p-2 w-full active:outline-none focus:outline-none focus:ring-2 focus:ring-gold max-h-52'
                               />
                            </FormControl>
                            <FormMessage>{form.formState.errors.otherInformation?.message}</FormMessage>
                         </FormItem>
                      )}
                   />
                  <Button type="submit" className="w-full rounded-md text-center hover:scale-105 transition-all duration-300 cursor-pointer font-semibold p-2 mt-2 border-2 bg-white border-gold text-gold hover:bg-goldLight hover:bg-opacity-80 hover:text-gold">
                     Check Delivery Availability       
                  </Button>
                  </div>
                  </form> 
            </Form>
         </div>

           <div className="w-[95%] md:w-[20rem] ">  
            <div className="w-full rounded-md bg-[#F9F1E7] shadow-sm relative shadow-gold p-8 flex flex-col items-center justify-start">
               <h1 className="font-bold text-2xl">Your Cart Total</h1> 
               <div className="w-full mt-8 mb-4 flex flex-col opacity-80 text-sm font-light">
                   <h5 className="w-full">Items</h5>
                   <div >
                      {cart.map((item)=>(
                        <div key={item.id} className="w-full text-sm flex items-center justify-between">
                           <p className=" flex flex-grow max-w-48">{(item.name).substring(0,12)} x {item.quantity}</p>
                           <p>₹ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                   </div>

                      <div className="w-full border-t border-dashed my-1 border-gold"/>
                  <p className="flex items-center justify-between">Total Price : &nbsp;&nbsp;<span className="font-normal">₹ {Total.toFixed(2)}</span></p>
                  <p className="flex items-center justify-between">Discount Applied : &nbsp;&nbsp;<span className="font-normal text-green-500">- ₹ {TotalSavings.toFixed(2)}</span></p>

                  {/* <p className="flex items-center justify-between">Delivery Charge : &nbsp;&nbsp;<span className="font-normal">₹ {transportationCharge}</span></p> */}
               </div>
               <div className="w-full border-t border-dashed my-1 border-gold"/>

                  <p className="w-full font-medium flex items-center justify-between">Bill Total : &nbsp;&nbsp;<span className="font-semibold text-gold">₹ {billTotal.toFixed(2)}</span></p>
               <Button
                  type="submit"
                  title={payment ? 'Please Check Delivery Availability' : undefined}
                  className={cn(
                    "w-full mt-8 bg-gold text-white hover:bg-goldLight hover:bg-opacity-80 hover:text-gold",
                    (!diliveryAvailable ) && "cursor-not-allowed"
                  )}
                  onClick={() => {
                     if(!diliveryAvailable){
                        toast.error('Please check delivery availability first!',{
                           duration: 20000,
                           closeButton: true,
                        });
                        return;
                     }
                     setOpenPaymentMode(true);
                  }}
                  disabled={loading}
                >
                  Place Order
               </Button>

               { openPaymentMode &&
               <div className="z-50 absolute -bottom-40">
               <motion.div
                 initial="hidden"
                 animate="visible"
                 exit="exit"
                 variants={fadeInUp}
                 className="w-full  flex flex-col items- justify-start p-5 border rounded-md backdrop-blur-xl shadow-md shadow-goldLight"
               >
                  <X className="absolute right-5 top-5 text-gold gont-bold cursor-pointer" onClick={()=>setOpenPaymentMode(false)}/>
                 <h1 className="font-medium text-sm mb-8 mx-auto">
                   Preferred Payment Option
                 </h1>
                           
                 <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeInUp}
                 >
                   <Button 
                     onClick={() =>{  processPayment();}}
                   className="bg-white flex items-center justify-center gap-2 w-full text-gold font-medium border-2 border-gold hover:bg-goldLight hover:bg-opacity-80 transition-all duration-300">
                     <OnlinePayment /> Pay Online Now
                   </Button>
                   <p className="text-xs mb-4">
                     * Pay Online to{" "}
                     <span className="text-green-600 font-medium">claim free</span>{" "}
                     delivery!
                   </p>
                           
                   <Button 
                   onClick={() => cashOnDelivery()}
                   className="bg-white flex items-center justify-center gap-2 w-full text-gold font-medium border-2 border-gold hover:bg-goldLight hover:bg-opacity-80 transition-all duration-300">
                     <CashPayment /> Cash On Delivery
                   </Button>
                   <p className="text-xs mb-4">
                     * Cash on Delivery will charge{" "}
                     <span className="text-red-600 font-medium">Rs. 70</span> extra.
                   </p>
                   <span className="text-xs flex items-center">Bill Total With cash : <span className="text-gold">₹ {billTotalWithCash} /-</span></span>
                 </motion.div>
               </motion.div>
               </div>
               }
            </div> 
            <div className="flex items-center gap-4 mt-4">
                  <Checkbox
                            color="#B88E2F"
                            checked={gst_Input}
                            onCheckedChange={(checked: CheckedState) => {
                              setGSTInput(checked);
                            }}
                          />
                  <h4 className="fpnt-medium text-xs">Claim GST Input if applicable!</h4>
            </div>
               {gst_Input && <div>
                  <Form {...formForGST}>
                     <form ref={formRefGST} onSubmit={formForGST.handleSubmit(onSubmitGST_IN)}>
                    
                     <FormField 
                      control={formForGST.control}
                      name='businesName'
                      render={({field})=>(
                         <FormItem>
                            <FormLabel className='font-medium text-sm'>Business Name <span className='text-red-500'>*</span></FormLabel>
                            <FormControl>
                               <Input 
                               {...field}
                               placeholder='Business Name same as GSTIN'
                               type='text'
                               disabled={loading}
                               className='border border-gold rounded-md text-xs p-2 w-full active:outline-none focus:outline-none focus:ring-2 focus:ring-gold '
                               />
                            </FormControl>
                            <FormMessage>{formForGST.formState.errors.businesName?.message}</FormMessage>
                         </FormItem>
                      )}
                   />
                  <FormField 
                      control={formForGST.control}
                      name="gst_in"
                      render={({field})=>(
                         <FormItem>
                            <FormLabel className='font-medium text-sm'>GST Number <span className='text-red-500'>*</span></FormLabel>
                            <FormControl>
                               <Input 
                               {...field}
                               placeholder='GST Number'
                               type='text'
                               disabled={ loading}
                               className='border border-gold rounded-md text-xs p-2 w-full active:outline-none focus:outline-none focus:ring-2 focus:ring-gold '
                               />
                            </FormControl>
                            <FormMessage className="text-xs">{formForGST.formState.errors.gst_in?.message}</FormMessage>
                         </FormItem>
                      )}
                   />
                    <FormField 
                      control={formForGST.control}
                      name="pan"
                      render={({field})=>(
                         <FormItem>
                            <FormLabel className='font-medium text-sm'>PAN Number <span className='text-red-500'>*</span></FormLabel>
                            <FormControl>
                               <Input 
                               {...field}
                               placeholder='PAN Number Registered with GSTIN'
                               type='text'
                               disabled={loading}
                               className='border border-gold rounded-md text-xs p-2 w-full active:outline-none focus:outline-none focus:ring-2 focus:ring-gold '
                               />
                            </FormControl>
                            <FormMessage className="text-xs">{formForGST.formState.errors.pan?.message}</FormMessage>
                         </FormItem>
                      )}
                   />
                  </form>
                  </Form>
               </div>}

            <div>
               <h6 className="text-xs font-light mt-4">Fast, secure, and hassle-free — we accept all major payment methods for your convenience!</h6>
               <ul className="flex items-center gap-5 my-4">
                  <li><Visa/></li>
                  <li><MasterCard/></li>
                  <li><UpiIcon/></li>
                  <li className="text-sm">Debit/Credit Card</li>
               </ul>
               <h6 className="text-xs font-normal my-2">After successful payment, you will receive an <b> email</b> confirmation with your consignment and shipment number. You can <b>track</b> your order status directly in your <Link href='/myaccount' className="text-gold font-semibold">account</Link>. </h6>
               <h6 className="text-xs font-light my-2">Expected Delivery: Your order will be delivered within <b className="text-gold">4 to 5 working days.</b></h6>
               <p className="text-xs my-4">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <Link href='/privacy-policy'> <b>privacy policy.</b></Link></p>
            </div>
            </div>      

      </section>
   )
}