import {
  verifyWithOTP,
  sendOTP as SendOTPApi,
  createUserProfile,
  getCurrentUser,
  logOut,
} from "@/services/onboardingApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Profile } from "./userType";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/contexts/currentUserContext";
type verifyOtpType = {
  email: string;
  token: string;
  userType: "artist" | "user";
};

export function useVerifyWithOTP() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (obj: verifyOtpType) =>
      verifyWithOTP(obj.email, obj.token, obj.userType),
  });
  return { mutate, isPending, error };
}

export function useSendOTP() {
  const {
    mutate: sendOTP,
    error,
    isPending,
  } = useMutation({
    mutationFn: (email: string) => SendOTPApi(email),
  });
  return { sendOTP, error, isPending };
}

export function useCreateProfile() {
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();
  const {
    mutate: createProfile,
    isPending,
    error,
  } = useMutation({
    mutationFn: (obj: Profile) => createUserProfile(obj),
    onSuccess: (data) => {
      queryClient.setQueryData(["rhythmo-currentUser"], {
        data: currentUser?.data,
        profileInfo: data,
      });
    },
  });

  return { createProfile, isPending, error };
}

export function useGetCurrentUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["rhythmo-currentUser"],
    queryFn: getCurrentUser,
  });
  return { data: data?.data, profileInfo: data?.profileInfo, isLoading };
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: signOut,
    isPending,
    error,
  } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.setQueryData(["rhythmo-currentUser"], null);
      queryClient.invalidateQueries({ queryKey: ["rhythmo-currentUser"] });
      navigate("/");
    },
  });

  return { signOut, isPending, error };
}
