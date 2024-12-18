"use client";
import { useAuth } from "@/app/context/AuthContext";
import ProfilePage from "@/components/ProfilePage";
import { ProfileShimmer } from "@/components/ProfileShimmer";
import { useUserProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
function OtherUserProfile({ params }) {
  const { userHandle } = params;
  const { currentUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (currentUser.userHandle === userHandle) {
      router.push("/profile");
    }
  }, [currentUser]);

  const { profileData, isProfileLoading, isProfileError } =
    useUserProfile(userHandle);
  if (isProfileLoading) {
    return <ProfileShimmer />;
  }

  if (profileData?.message === "Not found") {
    return "User Not Found";
  }

  return <ProfilePage profileData={profileData?.data} isEditable={false} />;
}

export default OtherUserProfile;
