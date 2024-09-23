'use server'
import * as z from 'zod';
import { ResetSchema } from "@/schemas"
import { getUserbyEmail } from "@/data/user"
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/token';

export const reset = async (data : z.infer<typeof ResetSchema>) => {
   const validateField = ResetSchema.safeParse(data);

   if(!validateField.success){
      return {error: "Invalid Email!"}
   }

   const {email} = validateField.data;
   const existingUser = await getUserbyEmail(email);

   if(!existingUser){
      return {error: "Email not found!"}
   }

   const passwordResetToken = await generatePasswordResetToken(email);
   await sendPasswordResetEmail(existingUser.name,passwordResetToken.email , passwordResetToken.token)

   return {success: "Reset link sent to your email!"}

}