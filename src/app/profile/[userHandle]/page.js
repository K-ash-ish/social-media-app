"use client";
import ProfilePage from "@/components/ProfilePage";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function OtherUserProfile({ params }) {
  const { userHandle } = params;
  const router = useRouter();
  const [userData, setUserData] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/profile/userHandle", {
        body: JSON.stringify({
          userHandle,
        }),
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data?.message);
      setUserData(data?.message);
      if (data?.message.isFollowing) {
        setIsFollowing(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (userData === "redirect user") {
      router.push("/profile");
    }
  }, [userData]);

  if (userData === "Not found") {
    return "User Not Found";
  }
  return (
    <ProfilePage
      userData={userData}
      isEditable={isEditable}
      isFollowing={isFollowing}
      setIsFollowing={setIsFollowing}
    />
  );
}

export default OtherUserProfile;
