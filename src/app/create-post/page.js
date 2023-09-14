"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import FormFieldComp from "@/components/FormFieldComp";
import { useUserPosts } from "@/hooks/useUserPosts";

const formSchema = z.object({
  title: z.string().min(2).max(30),
  content: z.string().min(1),
});

function CreatePost() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { createPost } = useUserPosts();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(values) {
    const { title, content } = values;
    createPost(title, content);
  }

  return (
    <div className="flex h-screen items-center">
      <Card className="w-[350px] mx-auto  ">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormFieldComp form={form} fieldName="title" />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="capitalize">
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="content" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Publishing" : "Publish"}
              </Button>{" "}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreatePost;
