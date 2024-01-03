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

function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const { setIsLoggedIn } = useContext(AuthContext);

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
    if (loginData.error) {
      setErrorMessage(loginData.error);
    } else if (loginData.message === "Not Found") {
      setIsLoggedIn(true);
      return router.push("/create-profile");
    } else {
      setIsLoggedIn(true);
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
