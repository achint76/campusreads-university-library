"use client";

import dynamic from 'next/dynamic';
import { signInSchema } from "@/lib/validations";
import { signInWithCredentials } from "@/lib/actions/auth";

const AuthForm = dynamic(() => import("@/components/AuthForm"), {
  ssr: false
});

const Page = () => {
  const handleSignIn = async (data: Record<string, any>) => {
    return signInWithCredentials({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleSignIn}
    />
  );
};

export default Page;