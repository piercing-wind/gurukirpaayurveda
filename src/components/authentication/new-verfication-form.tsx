'use client';

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormError, FormSuccess } from "./formMessage";

export const NewVerificationForm = () => {
   const [error, setError] = useState<string >("");
   const [success, setSuccess] = useState<string>("");

   const  searchParams = useSearchParams();
   const token = searchParams.get('token');

   const onSubmit = useCallback(()=>{
      if(!token) {
         setError("Token not Found!");
         return;
      }
      newVerification(token)
      .then((data)=>{
         setSuccess(data?.success!);
         setError(data?.error!);
      }).catch(()=>{
         setError("Something went wrong!");
      }); 

   },[token])

   useEffect(()=>{
      onSubmit();
      
   },[onSubmit])

   return (
      <div className=" h-full w-full flex flex-col items-center justify-center overflow-hidden">
            <h1 className="text-2xl font-semibold drop-shadow-sm mb-4" >New Verification</h1>
         <div className="w-[20rem] md:w-[24rem] shadow-md shadow-gold  rounded-xl p-4 shadow-x pb-8 flex flex-col items-center justify-center"
         
         >
         <p className='text-opacity-60 text-sm text-center mx-auto'>Verifying your details!</p>
            {!success && !error && <ClimbingBoxLoader color="#B88E2F" />}
           <div className="my-8">
            <FormSuccess message={success} />
            <FormError message={error} />
           </div>
         <Link href='/login' className="text-gold">Back to Login</Link>
         </div>
      </div>
   )
}