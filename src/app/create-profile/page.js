"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormFieldComp from "@/components/FormFieldComp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  bio: z.string(),
  name: z.string(),
  userHandle: z.string().min(4).max(15),
  profilePic: z.string(),
});

function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: "",
      name: "",
      userHandle: "",
      profilePic: "",
    },
  });

  function onSubmit(values) {
    const { bio, name, userHandle, profilePic } = values;
    fetch("http://localhost:3000/api/create-profile", {
      body: JSON.stringify({
        bio,
        name,
        userHandle,
        profilePic,
      }),
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <div className="flex h-screen items-center">
      <Card className="w-[350px] mx-auto  ">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Add more details about you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormFieldComp form={form} fieldName="bio" />
              <FormFieldComp form={form} fieldName="name" />
              <FormFieldComp form={form} fieldName="userHandle" />
              <FormFieldComp form={form} fieldName="profilePic" />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileForm;
