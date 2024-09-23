'use server'
import { db } from "@/lib/db"
import { getUserbyEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"

export const newVerification = async (token: string) => {
   const exsitingToken = await getVerificationTokenByToken(token)
   if(!exsitingToken){
      return {
         error: 'Token does not Exist!'
      }
   }

   const expired = new Date(exsitingToken.expires) < new Date()

   if (expired) {
      return {
         error: 'Token has Expired!'
      }
   }

   const existingUser = await getUserbyEmail(exsitingToken.email)

   if (!existingUser) {
      return {
         error: 'Email does not Exist!'
      }
   }

   await db.user.update({
      where :{
         id : existingUser.id
      },
      data: {
         emailVerified: new Date(),
         email : exsitingToken.email
      }
   })

   await db.verificationToken.delete({
      where : {
         id : exsitingToken.id
      }
   })

   return {success : "Email Verified! Please Continue to Login!"}
}