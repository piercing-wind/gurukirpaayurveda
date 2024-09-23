"use server"

import * as z from 'zod';
import { NewPasswordSchema } from '@/schemas';
import { getPasswordResetToken } from '@/data/password-reset-token';
import { getUserbyEmail } from '@/data/user';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';


export const newPassword = async (data: z.infer<typeof NewPasswordSchema>, token? : string | null) => {

      if(!token){
         return {error: "Missing Token!"}
      }

      const validateField = NewPasswordSchema.safeParse(data);
      if(!validateField.success){
         return {error: "Invalid Password!"}
      }

      const {password} = validateField.data;

      const existingToken = await getPasswordResetToken(token);

      if(!existingToken){
         return {error: "Invalid Token!"}
      }

      const expiration = new Date(existingToken.expires) < new Date();

      if(expiration){
         return {error: "Token Expired!"}
      }  

      const existingUser = await getUserbyEmail(existingToken.email);

      if(!existingUser){
         return {error: "Email does not Exist!"}
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await db.user.update({
         where: {
            id: existingUser.id
         },
         data: {
            password: hashedPassword
         }
      });

      await db.resetPasswordToken.delete({
         where: {
            id: existingToken.id
         }
      });

      return {success: "Password Updated!"}
       
}