"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Auth from "@/components/Auth";
import { useAuth } from "../context/AuthContext";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

function Login() {
  const { login, isLoading, errorMessage } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    const { email, password } = values;
    return await login(email.toLowerCase(), password);
  }

  return (
    <Auth
      title="Login"
      description="Login to access your account."
      form={form}
      isLoading={isLoading}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
}

export default Login;
