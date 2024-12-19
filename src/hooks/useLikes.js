import { useAuth } from "@/app/context/AuthContext";
import { getQueryClient } from "@/app/get-query-client";
import { useMutation, useQuery } from "@tanstack/react-query";
const fetchLikes = async (postId) => {
  const data = fetch(`/api/like/${postId}`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => data);
  return data;
};
const postLike = async (postId, like) => {
  return fetch(`/api/like/${postId}`, {
    body: JSON.stringify({
      postId,
    }),
    method: "POST",
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

export function useLikes(postId) {
  const queryClient = getQueryClient();
  const {
    currentUser: { profileId },
  } = useAuth();
  const {
    data: likesData,
    isSuccess: isLikesSuccess,
    isLoading: isLikesLoading,
    isError: isLikesError,
  } = useQuery({
    queryKey: ["likes", postId],
    queryFn: async () => fetchLikes(postId),
    select: (data) => {
      const isLiked = data?.data?.isAlreadyLiked?.authorId === profileId;
      return {
        isLiked,
        count: data?.data?.likes,
      };
    },
  });

  const {
    isPending: isNewLikePending,
    isSuccess: isNewLikeSuccess,
    mutate: likeMutation,
    data: newLikeData,
  } = useMutation({
    mutationKey: ["likes", postId],
    mutationFn: (like) => postLike(postId, like),
    onMutate: async (newLike) => {
      await queryClient.cancelQueries({
        queryKey: ["likes", postId],
      });
      const previousLikesData = queryClient.getQueryData(["likes", postId]);
      queryClient.setQueryData(["likes", postId], (old) => {
        let likes, isAlreadyLiked;
        const isLiked = old?.data?.isAlreadyLiked?.authorId === profileId;
        if (isLiked) {
          likes = old.data.likes - 1;
          isAlreadyLiked = {};
        } else {
          likes = old.data.likes + 1;
          isAlreadyLiked = {
            id: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            postId,
            authorId: profileId,
          };
        }

        return {
          ...old,
          data: {
            isAlreadyLiked,
            likes,
          },
        };
      });
      return { previousLikesData };
    },
    onSuccess: (data) => {},
    onSettled: async () => {
      if (queryClient.isMutating({ mutationKey: ["comments", postId] })) {
        await queryClient.invalidateQueries({ queryKey: ["likes", postId] });
      }
    },
  });
  return {
    isLikesError,
    isLikesLoading,
    isLikesSuccess,
    isNewLikePending,
    isNewLikeSuccess,
    likeMutation,
    likesData,
    newLikeData,
  };
}
