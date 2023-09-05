import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormFieldComp from "./FormFieldComp";

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
    fetch("/api/create-post", {
      body: JSON.stringify({
        title,
        content,
      }),
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // router.push("/profile");
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="md:self-end my-2 md:text-sm text-xs md:h-10 h-8">
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>Create a new post</DialogDescription>
        </DialogHeader>
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
            {/* <Button type="submit">Submit</Button> */}
            <DialogFooter>
              <DialogTrigger asChild>
                <Button type="submit">Publish</Button>
              </DialogTrigger>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePost;
