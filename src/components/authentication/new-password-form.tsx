'use client';
import * as z from 'zod';
import {useForm} from "react-hook-form";
import { useState, useTransition } from 'react';
import {zodResolver} from "@hookform/resolvers/zod";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from "@/components/ui/form";
import { NewPasswordSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError, FormSuccess } from '@/components/authentication/formMessage';
import { newPassword } from '@/actions/new-password';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
 


  const form = useForm<z.infer<typeof NewPasswordSchema>>({
   resolver: zodResolver(NewPasswordSchema),
   defaultValues : {
      password: '',
      confirmPassword: ''
   }
  })
  
  const onSubmit = (data: z.infer<typeof NewPasswordSchema>) => {
   setError('');
   setSuccess('');

   startTransition(() => {
      newPassword(data, token).then((response)=>{
        setError(response?.error);
        setSuccess(response?.success);

      });

   });
  }


   return (
      <div className=" h-full w-full flex flex-col items-center justify-center overflow-hidden">
            <h1 className="text-2xl font-semibold drop-shadow-sm mb-4" >Enter a New Password </h1>
         <div className="w-[20rem] md:w-[24rem] border-2 border-gold rounded-xl p-4 shadow-x pb-8 overflow-hidden">
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}
               className='flex flex-col space-y-4 my-8'
               >   
               <div className='space-y-4 mb-4'>
                  <FormField 
                     control={form.control}
                     name="password"
                     render={({field})=>(
                        <FormItem>
                           <FormLabel className='font-medium text-sm'>Password <span className='text-red-500'>*</span></FormLabel>
                           <FormControl>
                              <Input 
                              {...field}
                              placeholder='Your New Password'
                              type='password'
                              disabled={isPending}
                              className='border border-gold rounded-md text-xs p-2 w-full active:outline-none focus:outline-none focus:ring-2 focus:ring-gold '
                              />
                           </FormControl>
                           <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                        </FormItem>
                     )}
                  />
                  <FormField 
                     control={form.control}
                     name="confirmPassword"
                     render={({field})=>(
                        <FormItem>
                           <FormLabel className='font-medium text-sm'>Confirm Password <span className='text-red-500'>*</span></FormLabel>
                           <FormControl>
                              <Input 
                              {...field}
                              placeholder='Re-enter your password'
                              type='password'
                              disabled={isPending}
                              className='border border-gold rounded-md text-xs p-2 w-full active:outline-none focus:outline-none focus:ring-2 focus:ring-gold '
                              />
                           </FormControl>
                           <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                        </FormItem>
                     )}
                  />
                  
               </div>
                     
                     <FormError message={error } />
                     <FormSuccess message={success} />
                     <Button type='submit' disabled={isPending} className='bg-gold hover:bg-gold hover:bg-opacity-70 text-white font-semibold rounded-md p-2 shadow-md'>Reset Password</Button>
               </form>
            </Form>
            <p className='mx-auto mt-8 text-center text-sm' >Back to <Link href='/login' className='text-gold'>login</Link></p>
         </div>
      </div>
   )
}