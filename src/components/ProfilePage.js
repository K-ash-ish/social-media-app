import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreatePost from "./CreatePost";
import Link from "next/link";

function ProfilePage({ userData, isEditable }) {
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
          {!isEditable && <Button className="self-end">Follow</Button>}
        </div>
        <div className="flex flex-row justify-between border-b-2 pb-2">
          <p>{userData?.bio}</p>
          {isEditable && (
            <Button asChild>
              <Link href="/edit-profile">Edit Profile</Link>
            </Button>
          )}
        </div>
        {isEditable && <CreatePost />}
      </div>
      <ScrollArea className="  rounded-md md:w-1/2 md:mx-auto h-[580px]">
        {userData?.posts?.length === 0 && <h1>No posts yet</h1>}
        {userData?.posts?.map((post, index) => {
          return (
            <Card key={index} className="my-4 mx-2">
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
