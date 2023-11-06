import { useUserProfile } from "./useUserProfile";

export function useFollow() {
  const follow = (profileData, isFollowing, setIsFollowing) => {
    fetch("/api/follow", {
      method: "POST",
      body: JSON.stringify({
        profileData,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsFollowing(!isFollowing);
      });
  };
  return follow;
}
