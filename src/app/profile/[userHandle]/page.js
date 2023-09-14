"use client";
import ProfilePage from "@/components/ProfilePage";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useState } from "react";

function OtherUserProfile({ params }) {
  const { userHandle } = params;
  const [isEditable, setIsEditable] = useState(false);
  const [profileData, isFollowing, setIsFollowing] = useUserProfile(userHandle);

  // const followers = profileData?.
  if (profileData === "Not found") {
    return "User Not Found";
  }

  return (
    <ProfilePage
      profileData={profileData}
      isEditable={isEditable}
      isFollowing={isFollowing}
      setIsFollowing={setIsFollowing}
    />
  );
}

export default OtherUserProfile;
