"use client";
import ProfilePage from "@/components/ProfilePage";
import { useQuery } from "@tanstack/react-query";

function UserProfile() {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return fetch("/api/profile")
        .then(async (res) => res.json())
        .then((data) => data);
    },
  });
  if (isLoading) {
    return <h1>Loadingg....</h1>;
  }
  const { data: profileData } = data;
  return <ProfilePage profileData={profileData} isEditable={true} />;
}

export default UserProfile;
