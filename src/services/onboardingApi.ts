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
export async function createUserProfile({
  full_name,
  nickname,
  user_email,
  user_id,
  user_type,
  avatar_url,
  fav_artist,
}: Profile) {
  const { data, error } = await supabase
    .from("profiles")
    .insert([
      {
        full_name,
        nickname,
        user_email,
        user_id,
        user_type,
        fav_artist,
        avatar_url,
      },
    ])
    .select();

  if (error) throw new Error("Profile was not created");
  return data as Profile[];
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profileInfo, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user?.id);

  if (error) throw new Error("Could not fetch currentUser");
  return {
    data: user,
    profileInfo: profileInfo as Profile[],
  };
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("we could not log you out");
}
