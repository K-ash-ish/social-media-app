import { useEffect, useState } from "react";

export function useIndividualPost(postId) {
  const [post, setPost] = useState();
  const [allComments, setAllComments] = useState([]);
  const [likes, setLikes] = useState(0);
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
  return [post, allComments, likes, isLiked, setIsLiked];
}
