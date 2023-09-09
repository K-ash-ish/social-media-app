import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";

function ProfilePage({ userData, isEditable, isFollowing, setIsFollowing }) {
  const following = userData?.currentUsers?.length;
  const followers = userData?.following?.length;
  function onSubmit() {
    fetch("/api/follow", {
      method: "POST",
      body: JSON.stringify({
        userData,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollowing(!isFollowing);
      });
  }
  return userData === "Not Authorised" ? (
    <h1>Not Authorised</h1>
  ) : (
    <div className=" flex flex-col  m-4 overflow-hidden ">
      <div className="flex flex-col md:w-1/2 md:mx-auto ">
        <div className="flex  justify-between">
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage
                src={userData?.profilePic || "https://github.com/shadcn.png"}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg capitalize">{userData?.name}</h1>
              <p className="text-xs text-gray-400">@{userData?.userHandle}</p>
            </div>
          </div>
          {!isEditable && (
            <Button className="self-end" onClick={onSubmit}>
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
        <div className="flex flex-col justify-between border-b-2 pb-2 my-2">
          <p>{userData?.bio}</p>
          <div className="text-xs text-gray-400  flex space-x-4 mt-1">
            <span>Following: {following || 0}</span>
            <span>Followers: {followers || 0}</span>
          </div>
          {/* {isEditable && (
            <Button asChild>
              <Link href="/edit-profile">Edit Profile</Link>
            </Button>
          )} */}
        </div>
        {isEditable && (
          <Button asChild className="md:self-end">
            <Link href="/create-post">Create Post</Link>
          </Button>
        )}
      </div>
      <ScrollArea className="  rounded-md md:w-1/2 md:mx-auto h-[580px]">
        {userData?.posts?.length === 0 && <h1>No posts yet</h1>}
        {userData?.posts?.map((post) => {
          return (
            <Card key={post.id} className="my-4 mx-2">
              <CardHeader className="">
                <CardTitle className="capitalize font-semibold">
                  {post.title}
                </CardTitle>
                <CardContent className="text-sm">{post.content}</CardContent>
              </CardHeader>
            </Card>
          );
        })}
      </ScrollArea>
    </div>
  );
}

export default ProfilePage;
