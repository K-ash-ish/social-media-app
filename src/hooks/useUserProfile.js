import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useUserProfile(userHandle) {
  const router = useRouter();
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    if (userHandle) {
      fetch(`/api/profile/${userHandle}`)
        .then(async (res) => res.json())
        .then((data) => {
          setProfileData(data?.message);
        });
    }
  }, []);

  useEffect(() => {
    if (profileData === "redirect user") {
      router.push("/profile");
    }
  }, [profileData]);

  const createProfile = async (bio, name, userHandle, pictureUrl) => {
    return fetch("api/edit-profile", {
      body: JSON.stringify({
        bio,
        name,
        userHandle,
        pictureUrl,
      }),
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          router.push("/profile");
        } else {
          router.push("/login");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return { profileData, createProfile };
}
