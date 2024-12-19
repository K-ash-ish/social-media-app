"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAllPosts } from "@/hooks/usePost";
import { pusherClient } from "@/lib/pusher";
import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { getQueryClient } from "./get-query-client";

export function PostCard({ id, userHandle, content }) {
  return (
    <Link href={`/post/${id}`}>
      <Card className="my-4 mx-2 bg-slate-50 border-dashed border-blue-400">
        <CardHeader className="">
          <CardTitle className="capitalize font-semibold">
            @{userHandle}
          </CardTitle>
          <CardContent className="text-sm capitalize">{content}</CardContent>
        </CardHeader>
      </Card>
    </Link>
  );
}
function Feed() {
  const { allPosts, isAllPostLoading } = useAllPosts();
  const { currentUser } = useAuth();
  const profileId = currentUser?.profileId;

  useEffect(() => {
    const queryClient = getQueryClient();
    const channel = pusherClient.subscribe(`user-${profileId}`);

    channel.bind("new-post", async ({ newPost }) => {
      await queryClient.setQueryData(["feedPost"], (old) => {
        return {
          ...old,
          data: [...(old?.data ?? []), newPost],
        };
      });
    });
    return () => {
      pusherClient.unsubscribe(`user-${profileId}`);
      channel.unbind("new-post");
    };
  }, [profileId]);

  if (isAllPostLoading) {
    return (
      <div className=" md:w-1/2 min-h-[83%] md:mx-auto flex flex-col gap-4  m-4  ">
        {Array(3)
          .fill()
          .map((_, i) => {
            return <Card key={i} className="animate-pulse bg-slate-100 h-16" />;
          })}
      </div>
    );
  }
  const { data: posts } = allPosts;

  return (
    <div className=" md:w-1/2 min-h-[83%] md:mx-auto  m-4  ">
      {posts?.length === 0 && (
        <h1 className="text-center">
          Post from people you follow will be shown here.
        </h1>
      )}

      {posts?.map((post) => {
        return (
          <PostCard
            key={post?.id}
            id={post?.id}
            userHandle={post?.author?.userHandle}
            content={post?.content}
          />
        );
      })}
    </div>
  );
}

export default Feed;
