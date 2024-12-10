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
    data: likesData,
    isSuccess: isLikesSuccess,
    isLoading: isLikesLoading,
    isError: isLikesError,
  } = useQuery({
    queryKey: ["likes", postId],
    queryFn: async () => fetchLikes(postId),
    select: (data) => ({
      count: data?.data?.likes,
      isLiked: data?.data?.isLiked ?? false,
    }),
  });

  const {
    isPending: isNewLikePending,
    isSuccess: isNewLikeSuccess,
    mutate: likeMutation,
    data: newLikeData,
  } = useMutation({
    mutationFn: (like) => postLike(postId, like),
    onMutate: async (newLike) => {
      await queryClient.cancelQueries({
        queryKey: ["likes", postId],
      });
      const previousLikesData = queryClient.getQueryData(["likes", postId]);
      queryClient.setQueryData(["likes", postId], (old) => ({
        ...old,
        newLike,
      }));
      return { previousLikesData };
    },
    onSuccess: (data) => {},
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", postId] });
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
