'use client';
import {FieldValues, useForm} from "react-hook-form";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect } from "react";
import { toast } from "sonner"


export const SearchItem = ({searchProduct}:{searchProduct : (search : string)=>void}) => {


  const form = useForm<FieldValues>({
   defaultValues: {
     search: ''
   }
 })
  const onSubmit = (data: FieldValues) => {
   searchProduct(data.search)
   toast(
      <div>
         <p className='text-sm'>Search Results for <span className='font-semibold text-gold'>{data.search}</span></p>
      </div>, {
      closeButton: true,
   
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   form.setValue('search', event.target.value);
   form.handleSubmit(onSubmit)();
 };

 useEffect(() => {
   const subscription = form.watch((value) => {
     if (value.search) {
       window.scrollTo({ top: 0, behavior: 'smooth' });
     }
   });
   return () => subscription.unsubscribe();
 }, [form]);




   return (
      <div className=" h-full w-full flex items-center justify-center overflow-hidden">
          <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}
               className='flex items-center gap-4 md:mx-2'
               >   
               <div className='my-2'>
                  <FormField 
                     control={form.control}
                     name="search"
                     render={({field})=>(
                        <FormItem>
                           <FormControl>
                              <Input 
                              {...field}
                              placeholder='Find Your Favorite Product'
                              type='text'
                              onChange={handleChange}
                              className='border border-gold rounded-full text-xs px-4 w-full active:outline-none focus:outline-none focus:ring-2 focus:ring-gold mx-2'
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />
                  
               </div>
                     <Button type='submit' className='bg-gold hover:bg-gold hover:bg-opacity-70 text-white text-sm rounded-full font-semibold px-4  shadow-md'>Search</Button>
               </form>
            </Form>
      
      </div>
   )
}