"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { useContext, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Auth from "@/components/Auth";
import { AuthContext } from "../context/AuthContext";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

function SignUpPage() {
  const router = useRouter();
  const { setIsLoggedIn } = useContext(AuthContext);

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
      setIsLoggedIn(true);
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
