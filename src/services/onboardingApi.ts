import { supabase } from "./supabase";
import { Profile } from "@/features/auth/userType";

export async function sendOTP(email: string) {
  let { error } = await supabase.auth.signInWithOtp({
    email,
  });
  if (error) throw new Error("OTP was not sent");
}

export async function verifyWithOTP(
  email: string,
  token: string,
  userType: "artist" | "user"
) {
  let { data, error: verificationError } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (verificationError)
    throw new Error("we could not confirm your code, try again.");

  let { data: profileInfo } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_email", email)
    .single<Profile>();
  console.log(profileInfo);

  if (profileInfo && profileInfo.user_type !== userType) {
    await supabase.auth.signOut();
    throw new Error(
      "We can't continue the login  process because of wrong user type"
    );
  }

  if (profileInfo === null || profileInfo?.user_type === userType) {
    return {
      data: data.user,
      profileInfo: profileInfo || "empty",
    };
  }
}
