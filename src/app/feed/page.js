"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/feed");
        const data = await res.json();
        setPosts(data?.message);
      } catch (error) {
        // Handle errors if the fetch fails
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="rounded-md md:w-1/2 md:mx-auto h-[580px]">
      <h1 className="text-3xl font-bold text-center mt-2">Feed</h1>
      {posts?.map((post) => {
        return (
          <Card key={post.id} className="my-4 mx-2">
            <CardHeader className="">
              <CardTitle className="capitalize font-semibold">
                {post.author.userHandle}
              </CardTitle>
              <CardContent className="text-sm">{post.content}</CardContent>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}

export default Feed;
