"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schemas";

import {
    Form,
    FormControl,
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
  import { reset } from "@/actions/reset";

export const ResetForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer< typeof ResetSchema >>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: ""
        }
    });

    const onSubmit = (values: z.infer< typeof ResetSchema >) => {
        setError("");
        setSuccess("");

       startTransition (() => {
        reset(values)
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
            headerLabel="Forgot your password?"
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                disabled={isPending}
                                placeholder="araknet@dev.io"
                                type="email"
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
                >Send reset email
                </Button>
            </form>
          </Form>
        </CardWrapper>
        </>
    )
}

