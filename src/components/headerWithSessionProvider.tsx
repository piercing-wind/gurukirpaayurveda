'use client'
import { SessionProvider } from "next-auth/react";
import { Header } from "@/components/header";

export const HeaderWithSessionProvider = () => {
   return(
      <SessionProvider >
      <Header/>
     </SessionProvider>
   )
};