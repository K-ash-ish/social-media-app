"use client";
import FormFieldComp from "@/components/FormFieldComp";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2).max(30),
  content: z.string().min(1),
});

function CreatePost() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(values) {
    const { title, content } = values;
    // const { title,content } = values;
    fetch("http://localhost:3000/api/create-post", {
      body: JSON.stringify({
        title,
        content,
      }),
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        router.push("/profile");
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <div className="flex h-screen items-center">
      <Card className="w-[350px] mx-auto  ">
        <CardHeader>
          <CardTitle>Add Post</CardTitle>
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
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreatePost;
