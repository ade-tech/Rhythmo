import { verifyWithOTP, sendOTP as SendOTPApi } from "@/services/onboardingApi";
import { useMutation } from "@tanstack/react-query";
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
