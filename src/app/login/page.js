"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormFieldComp from "@/components/FormFieldComp";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    const { email, password } = values;
    setIsLoading(true);
    fetch("http://localhost:3000/api/login", {
      body: JSON.stringify({
        email,
        password,
      }),
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.message === null) {
          return router.push("/create-profile");
        }
        console.log(data);
        return router.push("/feed");
      });
  }

  return (
    <div className="flex h-screen items-center">
      <Card className="w-[350px] mx-auto  ">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to access the app</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormFieldComp form={form} fieldName="email" />
              <FormFieldComp form={form} fieldName="password" type="password" />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading" : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
