import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useUserProfile(userHandle) {
  const router = useRouter();
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    fetch(`/api/profile/${userHandle}`)
      .then(async (res) => res.json())
      .then((data) => {
        setProfileData(data?.message);
      });
  }, []);

  useEffect(() => {
    if (profileData === "redirect user") {
      router.push("/profile");
    }
  }, [profileData]);

  return [profileData];
}
