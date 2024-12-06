"use client";
import ProfilePage from "@/components/ProfilePage";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function OtherUserProfile({ params }) {
  const { userHandle } = params;
  const [isEditable, setIsEditable] = useState(false);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["profle", userHandle],
    queryFn: async () => {
      return fetch(`/api/profile/${userHandle}`)
        .then(async (res) => res.json())
        .then((data) => data);
    },
  });
  if (isLoading) {
    return "Loading...";
  }
  const { message, data: profileData } = data; 
  if (message === "Not found") {
    return "User Not Found";
  }

  return (
    <ProfilePage
      profileData={profileData}
      isEditable={isEditable}
    />
  );
}

export default OtherUserProfile;
