"use server";
import { signIn } from "@/auth";
import * as z from "zod";
import { AuthError } from "next-auth";

import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!"}}

   const { email, password } = validatedFields.data;

   const existingUser = await getUserByEmail(email);

   if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" }
   }

   if (!existingUser.emailVerified) {
    const verificationToken = generateVerificationToken(
        existingUser.email,
    );

    return { success: "Confirmation email sent!" }
   }
   
   try {
    await signIn("credentials", {
        email,
        password,
        callbackUrl: DEFAULT_LOGIN_REDIRECT_URL
    })
   } catch (error) {
    if (error instanceof AuthError) {
        switch (error.type) {
            case "CredentialsSignin":
                return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
        }
    }

    throw error;
   }
}