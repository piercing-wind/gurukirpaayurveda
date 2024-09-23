"use server"
import {auth} from "@/auth"
import { User } from "@/types/type";


export const getUserSession = async () : Promise<User> => {
      try {
            const session = await auth();

            if (!session || !session.user?.id) {
               return null;
            }
            return Promise.resolve(session.user as User);
      } catch (e) {
            console.log(e);
         return null
      }
}
