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
        console.log(data);
        setIsFollowing(!isFollowing);
      });
  };
  return follow;
}
