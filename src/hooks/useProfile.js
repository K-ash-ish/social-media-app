import { getQueryClient } from "@/app/get-query-client";
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
export function useCreateProfile() {
  const router = useRouter();
  const queryClient = getQueryClient();
  const {
    mutate: createProfileMutation,
    data: createdProfile,
    isPending: isCreateProfilePending,
    isSuccess: isCreateProfileSuccess,
  } = useMutation({
    mutationFn: async (data) => {
      const { bio, name, userHandle, pictureUrl } = data;
      return fetch("/api/create-profile", {
        body: JSON.stringify({ bio, name, userHandle, pictureUrl }),
        method: "POST",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((e) => {
          console.error(e);
        });
    },
    onSuccess: async (data) => {
      if (data.message === "success") {
        await queryClient.invalidateQueries(["profile"]);
        return router.push("/profile");
      }
    },
  });
  return {
    createProfileMutation,
    createdProfile,
    isCreateProfilePending,
    isCreateProfileSuccess,
  };
}
export function useEditProfile() {
  const queryClient = getQueryClient();
  const router = useRouter();
  const {
    mutate: editProfileMutation,
    data: editedProfile,
    isPending: isEditProfilePending,
    isSuccess: isEditProfileSuccess,
  } = useMutation({
    mutationFn: async (data) => {
      const body = Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== undefined && value !== null && value !== ""
        )
      );
      return fetch("/api/edit-profile", {
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
    onSettled: () => {
      return router.push("/profile");
    },
    onSuccess: async (data) => {
      if (data.message === "success") {
        await queryClient.cancelQueries({
          queryKey: ["profile"],
        });
        queryClient.setQueryData(["profile"], (old) => {
          return {
            ...old,
            data: {
              ...old.data,
              ...data.data,
            },
          };
        });
      }
    },
  });
  return {
    editProfileMutation,
    isEditProfilePending,
    isEditProfileSuccess,
    editedProfile,
  };
}
