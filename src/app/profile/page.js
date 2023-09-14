"use client";

import ProfilePage from "@/components/ProfilePage";
import { useCurrentProfile } from "@/hooks/useCurrentProfile";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

function UserProfile() {
  const profileData = useCurrentProfile();
  return <ProfilePage profileData={profileData} isEditable={true} />;
}

export default UserProfile;
