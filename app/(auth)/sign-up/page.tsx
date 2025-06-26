"use client";

import dynamic from 'next/dynamic';
import { signUpSchema } from "@/lib/validations";
import { signUp } from "@/lib/actions/auth";
import { AuthCredentials } from "@/types";

const AuthForm = dynamic(() => import("@/components/AuthForm"), {
  ssr: false
});

const Page = () => {
  const handleSignUp = async (data: Record<string, any>) => {
    return signUp(data as AuthCredentials);
  };

  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={handleSignUp}
    />
  );
};

export default Page;