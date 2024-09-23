import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import type { NextAuthConfig } from "next-auth";
import { getUserbyEmail } from "@/data/user";

// console.log(process.env.GOOGLE_CLIENT_ID);
// console.log(process.env.GOOGLE_CLIENT_SECRET);

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserbyEmail(email);
          if (!user || !user.password) return null;

          const matchPassword = await bcrypt.compare(password, user.password);

          if (matchPassword) return user;
        }
        return null;
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret : process.env.AUTH_SECRET,
  trustHost: true,
} satisfies NextAuthConfig;
