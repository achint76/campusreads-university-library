"use client";
import React from 'react'
import { useForm, DefaultValues, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FieldValues } from 'react-hook-form'
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FIELD_NAMES } from '@/constants';
import ImageUpload from './ImageUpload';
import { FIELD_TYPES } from '@/constants';

interface Props {
  schema: z.ZodObject<any>;
  defaultValues: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = ({
  type,
  schema,
  defaultValues,
  onSubmit
}: Props) => {
  const router = useRouter();
  const isSignIn = type === "SIGN_IN";
  
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<Record<string, any>>,
  });

  const handleSubmit: SubmitHandler<Record<string, any>> = async (data) => {
    try {
      const result = await onSubmit(data);

      if (result.success) {
        toast.success(
          isSignIn
            ? "You have successfully signed in."
            : "You have successfully signed up."
        );

        router.push("/");
      } else {
        toast.error(
          result.error ?? `Error ${isSignIn ? "signing in" : "signing up"}`
        );
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome back to BookWise" : "Create your library account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field === "universityCard" ? (
                      <ImageUpload onFileChange={formField.onChange}/>
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field as keyof typeof FIELD_TYPES]
                        }
                        {...formField}
                        className="form-input"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="form-btn">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-light-100">
        {isSignIn ? "New to BookWise? " : "Already have an account? "}

        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;