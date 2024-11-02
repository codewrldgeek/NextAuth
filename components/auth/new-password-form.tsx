"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import { useSearchParams } from "next/navigation";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { CardWrapper } from "./card-wrapper";
  import { Button } from "@/components/ui/button";
  import { FormError } from "@/components/form-error";
  import { FormSuccess } from "@/components/form-success";
  import { newPassword } from "@/actions/new-password";

export const NewPasswordForm = () => {

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer< typeof NewPasswordSchema >>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    });

    const onSubmit = (values: z.infer< typeof NewPasswordSchema >) => {
        setError("");
        setSuccess("");

       startTransition (() => {
        newPassword(values, token)
        .then((data) => {
            setError(data?.error);
            // TODO: Add when we add 2FA
            setSuccess(data?.success);
        })
       });

    }

    return (
        <>
           <CardWrapper 
            headerLabel="Enter a new password"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
          <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            >
                <div className="space-y-4">
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                disabled={isPending}
                                placeholder="******"
                                type="password"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    >
                    </FormField>
                </div>
                {error && <FormError message={error} />}
                {success && <FormSuccess message={success} />}
                <Button
                disabled={isPending}
                type="submit"
                className="w-full"
                >Reset password
                </Button>
            </form>
          </Form>
        </CardWrapper>
        </>
    )
}
