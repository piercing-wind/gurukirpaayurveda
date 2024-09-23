import { db } from "@/lib/db";

export const getPasswordResetToken = async (token: string) => {
   try {
      const passwordResetToken = await db.resetPasswordToken.findUnique({
         where:{
            token
         }
      })
      return passwordResetToken

   } catch (error) {
      return null
   }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
   try {
      const passwordResetToken = await db.resetPasswordToken.findFirst({
         where:{
            email
         }
      })
      return passwordResetToken

   } catch (error) {
      return null
   }
}