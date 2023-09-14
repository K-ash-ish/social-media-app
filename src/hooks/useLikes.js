export function useLikes() {
  const like = async (postId) => {
    return fetch("/api/like", {
      body: JSON.stringify({
        postId: postId,
      }),
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  };
  return like;
}
