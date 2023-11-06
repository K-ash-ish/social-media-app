"use client";
import PostCard from "@/components/PostCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserPosts } from "@/hooks/useUserPosts";
import Link from "next/link";

function Feed() {
  const { posts } = useUserPosts();

  return (
    <div className="rounded-md md:w-1/2 md:mx-auto h-5/6 ">
      {/* <h1 className="text-3xl font-bold text-center mt-2">Feed</h1> */}
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
