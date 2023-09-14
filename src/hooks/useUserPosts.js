import { useEffect, useState } from "react";

export function useUserPosts() {
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
  return posts;
}
