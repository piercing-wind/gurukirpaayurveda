"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserbyEmail } from "@/data/user";
import {generateVerificationToken} from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validatedData = RegisterSchema.safeParse(data);
  if (!validatedData.success) {
    return { error: "Invalid Field" };
  }
  const {name, email, password } = validatedData.data
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserbyEmail(email);

   if (existingUser) {
      return { error: "Email already in use!" };
   }

   await db.user.create({
      data: {
         name,
         email,
         password: hashedPassword,
      },
   });

   const verificationToken = await generateVerificationToken(email);

   await sendVerificationEmail(name, verificationToken.email, verificationToken.token)

   return { success: "We have sent your confirmation email. Please log in using the link provided in mail." };
};
