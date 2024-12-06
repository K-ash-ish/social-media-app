"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

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
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      return fetch("/api/feed")
        .then((res) => res.json())
        .then((data) => data);
    },
  });
  if (isLoading) {
    return (
      <div className=" md:w-1/2 min-h-[83%] md:mx-auto  m-4  ">
        <Card className="animate-pulse bg-slate-100 h-10" />
      </div>
    );
  }
  const { data: posts } = data;

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
