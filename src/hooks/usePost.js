import { getQueryClient } from "@/app/get-query-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
const fetchPost = async (postId) => {
  const data = fetch(`/api/post/${postId}`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => data);
  return data;
};
const creatPost = async (title, content) => {
  const data = await fetch("/api/create-post", {
    body: JSON.stringify({
      title,
      content,
    }),
    method: "POST",
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => {
      console.error(e);
    });
  return data;
};

export function useIndividualPost(postId) {
  const {
    data: postData,
    isSuccess: isPostSuccess,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
  });
  return { postData, isPostError, isPostLoading, isPostSuccess };
}
export function useAllPosts() {
  const {
    isLoading: isAllPostLoading,
    isError: isAllPostError,
    isPending: isALlPostPending,
    data: allPosts,
  } = useQuery({
    queryKey: ["feedPost"],
    queryFn: async () => {
      return fetch("/api/feed")
        .then((res) => res.json())
        .then((data) => {
          return data;
        });
    },
  });
  return { isALlPostPending, isAllPostError, isAllPostLoading, allPosts };
}

export function useCreatePost() {
  const queryClient = getQueryClient();
  const router = useRouter();
  const {
    isPending: isCreatePostPending,
    isSuccess: isCreatePostSuccess,
    isError: isCreatePostError,
    data: newPost,
    mutate: createPostMutation,
  } = useMutation({
    mutationFn: (post) => {
      const { title, content } = post;
      return creatPost(title, content);
    },
    onSettled: async (data) => {},
    onSuccess: async (data) => {
      if (data.message === "Success") {
        await queryClient.cancelQueries({
          queryKey: ["profile"],
        });
        queryClient.setQueryData(["profile"], (old) => {
          const oldData = old.data;
          const oldPosts = old.data.posts || [];
          return {
            ...old,
            data: {
              ...oldData,
              posts: [...oldPosts, data.data],
            },
          };
        });
        router.push("/profile");
      }
    },
  });
  return {
    isCreatePostError,
    isCreatePostPending,
    isCreatePostSuccess,
    newPost,
    createPostMutation,
  };
}
