"use client";

import ProfilePage from "@/components/ProfilePage";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

function UserProfile() {
  const [userData, setUserData] = useState();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/profile");
      const data = await res.json();
      console.log(data);
      setUserData(data?.message);
    })();
  }, []);

  // const message = {
  //   id: 3,
  //   bio: "Here is a cool bio for my profile",
  //   name: "user1",
  //   userHandle: "awesomUser1",
  //   profilePic: "",
  //   userId: 13,
  //   user: {
  //     id: 13,
  //     email: "user1@test.com",
  //     password: "$2b$10$SgIHzDcAx.6Vm0Ii9xXp2uEe0fCCpMmJMRbKkaHBDmv4F1wcYV.za",
  //     authType: "PASSWORD",
  //   },
  //   posts: [
  //     {
  //       title: "Post1",
  //       content:
  //         "New content here.lorem uLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //     },
  //     {
  //       title: "Post1",
  //       content: "New content here",
  //     },
  //     {
  //       title: "Post1",
  //       content: "New content here",
  //     },
  //     {
  //       title: "Post1",
  //       content: "New content here",
  //     },
  //     {
  //       title: "Post1",
  //       content: "New content here",
  //     },
  //     {
  //       title: "Post1",
  //       content: "New content here",
  //     },
  //     {
  //       title: "Post1",
  //       content: "New content here",
  //     },
  //     {
  //       title: "Post1",
  //       content: "New content here",
  //     },
  //   ],
  // };
  return <ProfilePage userData={userData} isEditable={true} />;
}

export default UserProfile;
