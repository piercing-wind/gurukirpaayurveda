"use server";

import { signOut } from "@/auth";

export const logout = async () => {

   //do some stuff before logout if needed
   await signOut({
      redirectTo: "/",
      redirect : true
   });
};