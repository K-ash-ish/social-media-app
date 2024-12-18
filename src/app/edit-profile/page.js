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
import { UploadButton } from "@uploadthing/react";
import { useState } from "react";
import {
  useCreateProfile,
  useCurrentProfile,
  useEditProfile,
} from "@/hooks/useProfile";

const formSchema = z.object({
  bio: z.string(),
  name: z.string(),
  userHandle: z.string().min(3).max(15).optional(),
  pictureUrl: z.string(),
});
const editFormSchema = formSchema.omit({ userHandle: true });

function ProfileForm() {
  const [picture, setPicture] = useState({ url: "", name: "" });
  const { profileData, isProfileLoading } = useCurrentProfile();
  const { editProfileMutation, isEditProfilePending } = useEditProfile();
  const { createProfileMutation, isCreateProfilePending } = useCreateProfile();
  const schema = profileData?.data?.userHandle ? editFormSchema : formSchema;
  const isPending = isEditProfilePending || isCreateProfilePending;
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      bio: "",
      name: "",
      userHandle: "",
      pictureUrl: "",
    },
  });

  function onSubmit(values) {
    if (profileData?.data?.userHandle) {
      editProfileMutation({ ...values, pictureUrl: picture.url });
    } else {
      createProfileMutation({ ...values, pictureUrl: picture.url });
    }
  }
  if (isProfileLoading) {
    return <h1>Loading...</h1>;
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
              {!profileData?.data?.userHandle && (
                <FormFieldComp
                  form={form}
                  fieldName="userHandle"
                  required={true}
                />
              )}
              {picture?.name && (
                <p className="text-center text-xs text-gray-400">
                  {picture?.name}
                </p>
              )}
              <UploadButton
                endpoint="imageUploader"
                value
                onClientUploadComplete={(res) => {
                  setPicture({ url: res[0].url, name: res[0].name });
                }}
                onUploadError={(error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
              {/* <FormFieldComp form={form} fieldName="profilePic" /> */}
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileForm;
