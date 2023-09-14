export function useComments() {
  const addComment = async (postId, comment) => {
    return fetch("/api/comment", {
      body: JSON.stringify({
        postId: Number(postId),
        content: comment,
      }),
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  };
  return addComment;
}
