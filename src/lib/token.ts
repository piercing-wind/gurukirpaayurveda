import { getVerificationTokenByEmail } from '@/data/verification-token';
import { db } from '@/lib/db';
import {v4 as uuidv4} from 'uuid';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';

export const generatePasswordResetToken = async (email: string) => {
   const token = uuidv4(); 
   const expiration = new Date(new Date().getTime() + 3600 * 1000); // 1 hour from now

   const existingToken = await getPasswordResetTokenByEmail(email);

   if (existingToken) {
      await db.resetPasswordToken.delete({
         where: {
            id: existingToken.id
         }
      })
   }

   const newToken = await db.resetPasswordToken.create({
      data: {
         email,
         token,
         expires: expiration
      }
   });

   return newToken;
}


export const generateVerificationToken = async (email: string) => {
   const token = uuidv4();
   const  expiration = new Date(new Date().getTime() + 3600 * 1000);  // 1 hour from now

   const exsitingToken = await getVerificationTokenByEmail(email);

   if (exsitingToken) {
      await db.verificationToken.delete({
         where: {
            id: exsitingToken.id
         }
      })
   }

   const newToken = await db.verificationToken.create({
      data: {
         email,
         token,
         expires : expiration,
      }
   });

   return newToken;
}