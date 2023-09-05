"use client";
import ProfilePage from "@/components/ProfilePage";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function OtherUserProfile({ params }) {
  const { userHandle } = params;
  const router = useRouter();
  const [userData, setUserData] = useState();
  const [isEditable, setIsEditable] = useState(false);
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

      setUserData(data?.message);
      console.log(userData);
      if (userData === "redirect user") {
        console.log("here");
        router.push("/profile");
        // setUserData(data?.userData);
        // setIsEditable(true);
      }
    })();
  }, []);
  return <ProfilePage userData={userData} isEditable={isEditable} />;
}

export default OtherUserProfile;
