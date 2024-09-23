'use server';
import { signIn } from "@/auth"

export const handleSignIn = async () => {
   console.log("handleSignIn")
   try {
      await signIn("google")
      
   } catch (error) {
      console.error(error)
   }
}