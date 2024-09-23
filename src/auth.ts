import NextAuth, { type DefaultSession } from "next-auth"
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import authConfig from "@/auth.config"
import { db } from "@/lib/db";
import { getUserbyId } from "@/data/user";
import  {JWT}  from "next-auth/jwt";

type ExtendedUser = DefaultSession["user"] & { role:'ADMIN' | 'USER'};

declare module "next-auth" {
   interface Session {
      user: ExtendedUser;
   }
}

declare module "next-auth/jwt" {
   interface JWT {  
      role? : 'ADMIN' | 'USER';
    }
}



export const { handlers  : { GET, POST }, signIn, signOut, auth } = NextAuth({
   pages: {
      signIn: "/login",
      error: "/error",
    },
    events : {
       async linkAccount({ user}){
          await db.user.update({
             where: {id: user.id},
             data: {emailVerified: new Date()}
          })
       },
    },
   callbacks :{
      async signIn({user, account}){
         if (account?.provider !== 'credentails' ) return true;
         
         const existingUser = await getUserbyId(user.id!);
      
         if(!existingUser?.emailVerified) return false
         
         return true
      },
      async session({session, token}){
         if(token.sub && session.user){
            session.user.id = token.sub;
         }
         
         if(token.role && session.user){
            session.user.role = token.role;
         }
         
         return session;
      },
      async jwt({token}){
         if(!token.sub ) return token;
         const existingUser = await getUserbyId(token.sub);
         if (!existingUser) return token;

         token.role = existingUser.role;
         
         return token;
      }
   },
   adapter: PrismaAdapter(db),
   session : {strategy: "jwt"},
   basePath: "/api/auth",
   ...authConfig,
}) 