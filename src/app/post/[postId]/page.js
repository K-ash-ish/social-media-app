"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

function PostPage({ params }) {
  const { postId } = params;
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    (async () => {
      const postRes = await fetch(`/api/post/${postId}`, {
        credentials: "include",
      });
      const postJson = await postRes.json();
      setPost(postJson?.post);

      const likeRes = await fetch(`/api/like/${postId}`, {
        credentials: "include",
      });
      const likesJson = await likeRes.json();
      if (likesJson.isLiked) {
        setIsLiked(true);
      }
      setLikes(likesJson?.message?.length);

      const commentsRes = await fetch(`/api/comment/${postId}`);
      const commentsJson = await commentsRes.json();
      setAllComments(commentsJson?.data);
    })();
  }, []);

  function handleComment(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/api/comment", {
      body: JSON.stringify({
        postId: Number(postId),
        content: comment,
      }),
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
      });
  }

  function handleLike(e) {
    e.preventDefault();
    fetch("/api/like", {
      body: JSON.stringify({
        postId: postId,
      }),
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.isLiked) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      });
  }
  return (
    <Card key={post?.id} className="md:w-1/2 md:mx-auto ">
      <CardHeader className="">
        <CardContent className="flex flex-col gap-2  p-0">
          <div className="  bg-slate-100 px-2 py-4  rounded-xl ">
            <div className="flex flex-col gap-1">
              <div className="capitalize font-semibold flex flex-col gap-1 max-w-fit">
                <h1 className=" capitalize text-2xl">{post?.author?.name}</h1>
                <p className="text-xs text-gray-400 ml-2 normal-case ">
                  @{post?.author?.userHandle}
                </p>
              </div>
              <p className="break-words  text-xl px-2 my-2">{post?.content}</p>
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
          <h3 className="text-base font-semibold ">Comments:</h3>
          {allComments.map((comment) => {
            return (
              <div
                key={comment.id}
                className="bg-slate-100 px-2 py-4 rounded-lg flex flex-col gap-2 ml-2 "
              >
                <div className="flex items-center gap-2">
                  <Avatar className="">
                    <AvatarImage
                      src={
                        comment?.author?.profilePic ||
                        "https://github.com/shadcn.png"
                      }
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col ">
                    <h3 className="capitalize font-semibold">
                      {comment?.author?.name}
                    </h3>
                    <h4 className="text-xs">@{comment?.author?.userHandle}</h4>
                  </div>
                </div>
                <p className="ml-2">{comment?.content}</p>
              </div>
            );
          })}
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default PostPage;
