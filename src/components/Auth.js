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

function Auth(props) {
  const { title, description, form, onSubmit, isLoading, errorMessage } = props;
  return (
    <div className="flex h-screen items-center">
      <Card className="w-[350px] mx-auto  ">
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
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Auth;
