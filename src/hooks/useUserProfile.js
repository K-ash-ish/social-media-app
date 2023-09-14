import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useUserProfile(userHandle) {
  const router = useRouter();
  const [profileData, setProfileData] = useState();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetch(`/api/profile/${userHandle}`)
      .then(async (res) => res.json())
      .then((data) => {
        setProfileData(data?.message);
        if (data?.message?.isFollowing) {
          setIsFollowing(true);
        }
      });
  }, []);

  useEffect(() => {
    if (profileData === "redirect user") {
      router.push("/profile");
    }
  }, [profileData]);

  return [profileData, isFollowing, setIsFollowing];
}
