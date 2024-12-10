"use client";
import ProfilePage from "@/components/ProfilePage";
import { useCurrentProfile } from "@/hooks/useProfile";

function UserProfile() {
  const { profileData, isProfileLoading } = useCurrentProfile();
  if (isProfileLoading) {
    return <h1>Loadingg....</h1>;
  }
  return <ProfilePage profileData={profileData.data} isEditable={true} />;
}

export default UserProfile;
