import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useCurrentProfile() {
  const { data: profileData, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return fetch("/api/profile")
        .then(async (res) => res.json())
        .then((data) => data);
    },
  });
  return { profileData, isProfileLoading };
}
export function useUserProfile(userHandle) {
  const router = useRouter();
  const {
    data: profileData,
    isError: isProfileError,
    isLoading: isProfileLoading,
  } = useQuery({
    queryKey: ["profle", userHandle],
    queryFn: async () => {
      return fetch(`/api/profile/${userHandle}`)
        .then(async (res) => res.json())
        .then((data) => data);
    },
  });
  return { profileData, isProfileError, isProfileLoading };
}

export function useEditProfile() {
  const {
    mutate: editProfileMutation,
    data: editedProfile,
    isPending: isEditProfilePending,
    isSuccess: isEditProfileSUccess,
  } = useMutation({
    mutationFn: async (data) => {
      const { bio, name, userHandle, pictureUrl } = data;
      const body = Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== undefined && value !== null && value !== ""
        )
      );
      return fetch("api/edit-profile", {
        body: JSON.stringify(body),
        method: "POST",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((e) => {
          console.error(e);
        });
    },
    onSuccess: (data) => {
      //   if (data.message === "success") {
      //     router.push("/profile");
      //   }
    },
  });
  return {
    editProfileMutation,
    isEditProfilePending,
    isEditProfileSUccess,
    editedProfile,
  };
}
