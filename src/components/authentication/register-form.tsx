'use client';
import * as z from 'zod';
import { Social } from "./social";
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
import { RegisterSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError, FormSuccess } from '@/components/authentication/formMessage';
import Link from 'next/link';
import { register } from '@/actions/register';

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof RegisterSchema>>({
   resolver: zodResolver(RegisterSchema),
   defaultValues : {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
   }
  })
  
  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
   setError('');
   setSuccess('');

   startTransition(() => {
      register(data).then((response)=>{
         setError(response.error);
         setSuccess(response.success);
      });

   });
  }


   return (
      <div className=" h-full w-full flex flex-col items-center justify-center overflow-hidden">
            <h1 className="text-2xl font-semibold drop-shadow-sm mb-4" >Register </h1>
         <div className="w-[22rem] md:w-[28rem] border-2 border-gold rounded-xl p-4 shadow-xl pb-8">
            <p className='text-opacity-60 text-sm text-center mx-auto'>Create an Account</p>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}
               className='flex flex-col space-y-4 my-8'
               >   
               <div className='mb-4 md:grid md:grid-cols-2 gap-4 place-items-center'>
                  <FormField 
                     control={form.control}
                     name="name"
                     render={({field})=>(
                        <FormItem>
                           <FormLabel className='font-medium text-sm'>Name <span className='text-red-500'>*</span></FormLabel>
                           <FormControl>
                              <Input 
                              {...field}
                              placeholder='Your Name'
                              type='text'
                              disabled={isPending}
                              className='border border-gold rounded-md p-2 text-xs w-full active:outline-none focus:outline-none focus:ring-2 focus:ring-gold '
                              />
                           </FormControl>
                           <FormMessage className=" text-[10px]">{form.formState.errors.email?.message}</FormMessage>
                        </FormItem>
                     )}
                  />
                  <FormField 
                     control={form.control}
                     name="email"
                     render={({field})=>(
                        <FormItem>
                           <FormLabel className='font-medium text-sm'>Email <span className='text-red-500'>*</span></FormLabel>
                           <FormControl>
                              <Input 
                              {...field}
                              placeholder='yournice@email.com'
                              type='email'
                              disabled={isPending}
                              className='border border-gold rounded-md p-2 text-xs w-full active:outline-none focus:outline-none focus:ring-2 focus:ring-gold '
                              />
                           </FormControl>
                           <FormMessage className=" text-[10px]">{form.formState.errors.email?.message}</FormMessage>
                        </FormItem>
                     )}
                  />
                  <FormField 
                     control={form.control}
                     name="password"
                     render={({field})=>(
                        <FormItem>
                           <FormLabel className='font-medium text-sm'>Password <span className='text-red-500'>*</span></FormLabel>
                           <FormControl>
                              <Input 
                              {...field}
                              placeholder='Your Secret Password'
                              type='password'
                              disabled={isPending}
                              className='border border-gold rounded-md p-2 text-xs w-full active:outline-none focus:outline-none focus:ring-2 focus:ring-gold '
                              />
                           </FormControl>
                           <FormMessage className=" text-[10px]">{form.formState.errors.email?.message}</FormMessage>
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
                              placeholder='Retype Your Secret Password'
                              type='password'
                              disabled={isPending}
                              className='border border-gold rounded-md p-2 text-xs w-full active:outline-none focus:outline-none focus:ring-2 focus:ring-gold '
                              />
                           </FormControl>
                           <FormMessage className=" text-[10px]">{form.formState.errors.email?.message}</FormMessage>
                        </FormItem>
                     )}
                  />
               </div>
                     <FormError message={error} />
                     <FormSuccess message={success} />
                     <Button type='submit' disabled={isPending} className='bg-gold hover:bg-gold hover:bg-opacity-70 text-white font-semibold rounded-md p-2 shadow-md'>Register</Button>
               </form>
            </Form>
            <p className='text-gold mx-auto my-4 text-center' >* * * * *</p>
            <Social disable={isPending} className="text-sm" />
            <p className='mx-auto mt-12 text-center text-sm' >Already Have an Account? <Link href='/login' className='text-gold'>Login</Link></p>
         </div>
      </div>
   )
}