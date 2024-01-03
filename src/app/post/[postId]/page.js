"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useComments } from "@/hooks/useComments";
import { useIndividualPost } from "@/hooks/useIndividualPost";
import { useLikes } from "@/hooks/useLikes";
import Link from "next/link";
import { useEffect, useState } from "react";

function PostPage({ params }) {
  const { postId } = params;

  const [post, allComments, likes, isLiked, setIsLiked] =
    useIndividualPost(postId);
  const addLike = useLikes();
  const addComment = useComments();

  const [comment, setComment] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function handleComment(e) {
    e.preventDefault();
    setIsLoading(true);
    const commentData = await addComment(postId, comment);
    setIsLoading(false);
  }

  async function handleLike(e) {
    e.preventDefault();
    const likeData = await addLike(postId);
    if (likeData?.isLiked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }
  return (
    <Card
      key={post?.id}
      className="md:w-1/2 h-5/6 w-[95%] mx-auto bg-slate-50 border-dashed border-blue-400 "
    >
      <CardHeader className="h-full">
        <CardContent className="flex flex-col gap-2  h-full p-0 ">
          <div className="   p-4   rounded-xl border-dashed border-red-200 border-2">
            <div className="flex flex-col gap-1">
              <div className="capitalize font-semibold flex flex-col gap-1 max-w-fit">
                {/* <h1 className=" capitalize text-2xl">{post?.author?.name}</h1> */}
                <Link href={`/profile/${post?.author?.userHandle}`}>
                  <p className="text-xl capitalize text-gray-400 ml-2  ">
                    @{post?.author?.userHandle}
                  </p>
                </Link>
              </div>
              <p className="break-words  text-xl px-2 my-2 ">{post?.content}</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="max-w-fit flex gap-2 items-center px-2">
                <Button
                  onClick={handleLike}
                  variant="ghost"
                  className="underline underline-offset-2  hover:bg-primary hover:text-white h-10"
                >
                  {isLiked ? "Unlike" : "Like"}
                </Button>
                <span>{likes}</span>
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
                disabled={comment.length === 0}
              >
                {isLoading ? "Please Wait" : "Comment"}
              </Button>
            </div>
          </div>
          <h3 className="text-base font-semibold underline underline-offset-4 my-2  decoration-blue-400">
            Comments:
          </h3>
          <ScrollArea className="max-h-1/2 ">
            {allComments?.map((comment) => {
              return (
                <div
                  key={comment.id}
                  className="border-2 border-dotted border-rose-200 px-2 py-4 m-2 rounded-lg flex flex-col gap-2 ml-2 "
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="">
                      <AvatarImage
                        src={comment?.author?.profileUrl}
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col ">
                      <h3 className="capitalize font-semibold">
                        {comment?.author?.name}
                      </h3>
                      <h4 className="text-xs">
                        @{comment?.author?.userHandle}
                      </h4>
                    </div>
                  </div>
                  <p className="ml-2">{comment?.content}</p>
                </div>
              );
            })}
          </ScrollArea>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default PostPage;
