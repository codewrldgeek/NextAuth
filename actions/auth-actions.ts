"use client";

import { signIn as nextAuthSignIn } from "next-auth/react";

export const signIn = (provider: "google" | "github", callbackUrl: string) => {
  return nextAuthSignIn(provider, { callbackUrl });
};