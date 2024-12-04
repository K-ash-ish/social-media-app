"use client";
import PostCard from "@/components/PostCard";
import { useUserPosts } from "@/hooks/useUserPosts";

function Feed() {
  const { posts } = useUserPosts();

  return (
    <div className=" md:w-1/2 min-h-[83%] md:mx-auto  m-4  ">
      {/* <h1 className="text-3xl font-bold text-center mt-2">Feed</h1> */}
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
