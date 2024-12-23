"use client";
import { useAuth } from "@/app/context/AuthContext";
import { getQueryClient } from "@/app/get-query-client";
import { Comment, CommentShimmer } from "@/components/Comment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useComments } from "@/hooks/useComments";
import { useLikes } from "@/hooks/useLikes";
import { useIndividualPost } from "@/hooks/usePost";
import { pusherClient } from "@/lib/pusher";
import Link from "next/link";
import { useEffect, useState } from "react";

function PostPage({ params }) {
  const { postId } = params;
  const [comment, setComment] = useState("");
  const {
    commentMutation,
    commentsData,
    isNewComentPending,
    isCommentLoading,
    newComment,
    isNewCommentSuccess,
    commentVariables,
  } = useComments(postId);
  const {
    isLikesError,
    isLikesLoading,
    isLikesSuccess,
    isNewLikePending,
    isNewLikeSuccess,
    likeMutation,
    likesData,
    newLikeData,
  } = useLikes(postId);
  const { postData, isPostError, isPostLoading, isPostSuccess } =
    useIndividualPost(postId);

  useEffect(() => {
    const channel = pusherClient.subscribe(postId);
    const queryClient = getQueryClient();
    channel.bind("like-updates", async ({ likes }) => {
      await queryClient.setQueryData(["likes", postId], (old) => {
        return {
          ...old,
          data: {
            ...old.data,
            likes,
          },
        };
      });
    });
    channel.bind("comment-updates", async ({ newComment }) => {
      await queryClient.setQueryData(["comments", postId], (old) => {
        return {
          ...old,
          data: [...(old?.data ?? []), newComment],
        };
      });
    });
    return () => {
      pusherClient.unsubscribe(postId);
      channel.unbind("like-updates");
      channel.unbind("comment-updates");
    };
  }, []);

  async function handleComment(e) {
    e.preventDefault();
    commentMutation(comment);
  }

  async function handleLike(e) {
    e.preventDefault();
    likeMutation();
  }

  return (
    <Card className="md:w-1/2 h-5/6 w-[95%] mx-auto bg-slate-50 border-dashed border-blue-400 ">
      <CardHeader className="h-full">
        <CardContent className="flex flex-col gap-2  h-full p-0 ">
          <>
            {isPostLoading ? (
              <div className="   p-4   rounded-xl border-dashed border-red-200 border-2 h-32 w-full animate-pulse bg-slate-100"></div>
            ) : (
              <div className="   p-4   rounded-xl border-dashed border-red-200 border-2">
                <div className="flex flex-col gap-1">
                  <div className="capitalize font-semibold flex flex-col gap-1 max-w-fit">
                    {/* <h1 className=" capitalize text-2xl">{post?.author?.name}</h1> */}
                    <Link
                      href={`/profile/${postData?.data?.author?.userHandle}`}
                    >
                      <p className="text-xl capitalize text-gray-400 ml-2  ">
                        @{postData?.data?.author?.userHandle}
                      </p>
                    </Link>
                  </div>
                  <p className="break-words   text-xl px-2 my-2 ">
                    {postData?.data?.content}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="max-w-fit flex gap-2 items-center px-2">
                    <Button
                      onClick={handleLike}
                      variant="ghost"
                      className="underline underline-offset-2 border   hover:bg-primary hover:text-white h-10"
                      disabled={isNewLikePending}
                    >
                      {likesData?.isLiked ? "Unlike" : "Like"}
                    </Button>
                    <span>{likesData?.count || 0}</span>
                  </div>
                  <Textarea
                    placeholder="comment"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    value={comment}
                  />
                  <Button
                    className="self-end"
                    onClick={handleComment}
                    disabled={comment?.length === 0 || isNewComentPending}
                  >
                    {isNewComentPending ? "Posting..." : "Comment"}
                  </Button>
                </div>
              </div>
            )}
          </>

          <h3 className="text-base font-semibold underline underline-offset-4 my-2  decoration-blue-400">
            Comments:
          </h3>
          <ScrollArea className="max-h-1/2 ">
            {isCommentLoading ? (
              <div className="border-2 border-dotted border-rose-200 px-2 py-4 m-2 rounded-lg flex flex-col gap-2 ml-2 h-12 bg-slate-100 animate-pulse "></div>
            ) : (
              commentsData?.data?.map((comment) => {
                return <Comment key={comment.id} {...comment} />;
              })
            )}
          </ScrollArea>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
export default PostPage;

// const postQueries = [
//   { key: "post", fn: usePost },
//   { key: "comments", fn: useComments },
//   { key: "likes", fn: useLikes },
// ];
// const combinedQueries = useQueries({
//   queries: postQueries.map(({ key, fn }) => ({
//     queryKey: [key, postId],
//     queryFn: () => fn(postId),
//   })),
//   combine: (results) => {
//     const isLoading = results.some((result) => result.isLoading);
//     return {
//       data: results.map((result) => result.data),
//       error: results.map((result) => result.isError),
//       success: results.map((result) => result.isSuccess),
//       isLoading,
//     };
//   },
// });
