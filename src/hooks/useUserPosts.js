import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useUserPosts() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
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

  const createPost = async (title, content) => {
    return fetch("/api/create-post", {
      body: JSON.stringify({
        title,
        content,
      }),
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        router.push("/profile");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return { posts, createPost };
}
