"use client";
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

  console.log(posts);

  return (
    <div>
      {posts?.map((post) => {
        return (
          <div className="border-2">
            <div>
              <h1 className="text-xl capitalize font-bold">
                {post.author.name}
              </h1>
              <h1>{post.author.userHandle}</h1>
            </div>
            <div className="border-2">
              <h1>{post.title}</h1>
              <p>{post.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Feed;
