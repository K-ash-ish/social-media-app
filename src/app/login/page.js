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

function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
    const loginData = await login(email, password);
    setIsLoading(false);
    console.log(loginData);
    if (loginData.error) {
      setErrorMessage(loginData.error);
    } else if (loginData.message === null) {
      return router.push("/create-profile");
    } else {
      return router.push("/");
    }
  }

  return (
    <Auth
      title="Login"
      description="Login to access your account."
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
}

export default Login;
