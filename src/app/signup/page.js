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

function SignUpPage() {
  const { signUp, errorMessage, isLoading } = useAuth();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    const { email, password } = values;
    return await signUp(email.toLowerCase(), password);
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
