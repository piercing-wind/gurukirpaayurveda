import { Google } from "@/components/icons"
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils"
import { DEFAULT_LOGIN_REDIRECT } from "@/route"
import { AuthError } from "next-auth";

export const Social = ({disable = false, className} : {disable?:boolean, className?:string}) => {
      const handleSignIn = ()=>{

         try{
            signIn('google', {callbackUrl: DEFAULT_LOGIN_REDIRECT})

         }catch(err){
            if (err instanceof AuthError) {
               if (err.stack === "OAuthProviderError") {
               }
               throw err;
             }
             throw err;
           }

      }

   return(
      <form className="w-full" action={handleSignIn}>
         <button disabled={disable} 

           className={cn(`flex w-full items-center justify-center hover:bg-gold hover:bg-opacity-40 px-2 md:px-8 border-2 border-gold font-medium tracking-wide py-2 rounded-md shadow-md my-4 ${disable && 'opacity-60 cursor-not-allowed hover:bg-white'}`, className)} >
            <Google size={24}/> &nbsp; &nbsp; 
            Continue With Google
         </button>
      </form>
   )
}