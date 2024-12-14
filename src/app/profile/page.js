"use client";
import ProfilePage from "@/components/ProfilePage";
import { ProfileShimmer } from "@/components/ProfileShimmer";
import { useCurrentProfile } from "@/hooks/useProfile";
function UserProfile() {
  const { profileData, isProfileLoading } = useCurrentProfile();
  if (isProfileLoading) {
    return <ProfileShimmer />;
  }
  return <ProfilePage profileData={profileData.data} isEditable={true} />;
}

export default UserProfile;
