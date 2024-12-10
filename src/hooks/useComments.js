import { getQueryClient } from "@/app/get-query-client";
import { useMutation, useQuery } from "@tanstack/react-query";

const fetchComment = async (postId) => {
  const data = fetch(`/api/comment/${postId}`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => data);
  return data;
};
const postComment = async (postId, comment) => {
  return fetch(`/api/comment/${postId}`, {
    body: JSON.stringify({
      postId,
      content: comment,
    }),
    method: "POST",
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => data);
};

export function useComments(postId) {
  const queryClient = getQueryClient();
  const {
    data: commentsData,
    isSuccess: isCommentSuccess,
    isLoading: isCommentLoading,
    isError: isCommentError,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => fetchComment(postId),
  });
  const {
    isPending: isNewComentPending,
    isSuccess: isNewCommentSuccess,
    mutate: commentMutation,
    data: newComment,
  } = useMutation({
    mutationFn: (comment) => {
      return postComment(postId, comment);
    },
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({
        queryKey: ["comments", postId],
      });
      const previousComments = queryClient.getQueryData(["comments", postId]);
      queryClient.setQueryData(["comments", postId], (old) => ({
        ...old,
        newComment,
      }));
      return { previousComments };
    },
    onSuccess: (data) => {
      console.log("Cdata: ", data);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
  return {
    commentMutation,
    commentsData,
    isCommentError,
    isCommentLoading,
    isCommentSuccess,
    isNewComentPending,
    isNewCommentSuccess,
    newComment,
  };
}
