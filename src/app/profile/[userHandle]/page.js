"use client";
import ProfilePage from "@/components/ProfilePage";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useEffect, useState } from "react";

function OtherUserProfile({ params }) {
  const { userHandle } = params;
  const [isEditable, setIsEditable] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const [profileData] = useUserProfile(userHandle);

  useEffect(() => {
    if (profileData?.isFollowing) {
      setIsFollowing(true);
    }
  }, [profileData]);

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
