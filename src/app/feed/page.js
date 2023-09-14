"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserPosts } from "@/hooks/useUserPosts";
import Link from "next/link";

function Feed() {
  const posts = useUserPosts();

  return (
    <div className="rounded-md md:w-1/2 md:mx-auto h-[580px]">
      <h1 className="text-3xl font-bold text-center mt-2">Feed</h1>
      {posts?.map((post) => {
        return (
          <Link key={post.id} href={`/post/${post.id}`}>
            <Card className="my-4 mx-2">
              <CardHeader className="">
                <CardTitle className="capitalize font-semibold">
                  {post.author.userHandle}
                </CardTitle>
                <CardContent className="text-sm">{post.content}</CardContent>
              </CardHeader>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

export default Feed;
