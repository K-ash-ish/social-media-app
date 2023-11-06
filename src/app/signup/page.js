"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Auth from "@/components/Auth";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { signUp } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    const { email, password } = values;
    setIsLoading(true);
    const signUpData = await signUp(email, password);
    setIsLoading(false);
    if (signUpData.error) {
      setErrorMessage(signUpData.error);
    } else {
      return router.push("/create-profile");
    }
  }

  return (
    <Auth
      title="Sign Up"
      description="Create a new account."
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
}

export default SignUpPage;
