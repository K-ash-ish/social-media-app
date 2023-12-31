"use client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormFieldComp from "@/components/FormFieldComp";
import Link from "next/link";

function Auth(props) {
  const { title, description, form, onSubmit, isLoading, errorMessage } = props;
  return (
    <div className="rounded-md md:w-1/2  w-5/6 mx-auto h-5/6 flex items-center md:border-2">
      <Card className="md:w-[350px] w-full mx-auto  ">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {errorMessage?.length > 0 && (
                <p className={`text-red-400 text-xs `}>{errorMessage}</p>
              )}
              <FormFieldComp form={form} fieldName="email" />
              <FormFieldComp form={form} fieldName="password" type="password" />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading" : "Submit"}
              </Button>
            </form>
            <p className="text-xs mt-2 text-right text-blue-400 font-semibold ">
              <Link href={`${title === "Login" ? "/signup" : "/login"}`}>
                {`${title === "Login" ? " Need an account?" : "Sign in?"}`}
              </Link>
            </p>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Auth;
