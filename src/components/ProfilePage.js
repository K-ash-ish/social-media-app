import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useFollow } from "@/hooks/useFollow";

function ProfilePage(props) {
  const { profileData, isEditable, isFollowing, setIsFollowing } = props;

  const followings = profileData?.currentUsers?.length;
  const followers = profileData?.following?.length;

  const follow = useFollow();

  function handleFollow() {
    follow(profileData, isFollowing, setIsFollowing);
  }

  return profileData === "Not Authorised" ? (
    <h1>Not Authorised</h1>
  ) : (
    <div className=" flex flex-col  m-4 overflow-hidden ">
      <div className="flex flex-col md:w-1/2 md:mx-auto ">
        <div className="flex  justify-between">
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage
                src={profileData?.profilePic || "https://github.com/shadcn.png"}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg capitalize">{profileData?.name}</h1>
              <p className="text-xs text-gray-400">
                @{profileData?.userHandle}
              </p>
            </div>
          </div>
          {!isEditable && (
            <Button className="self-end" onClick={handleFollow}>
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
        <div className="flex flex-col justify-between border-b-2 pb-2 my-2">
          <p>{profileData?.bio}</p>
          <div className="text-xs text-gray-400  flex space-x-4 mt-1">
            <span>Following: {followings || 0}</span>
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
        {profileData?.posts?.length === 0 && <h1>No posts yet</h1>}
        {profileData?.posts?.map((post) => {
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
