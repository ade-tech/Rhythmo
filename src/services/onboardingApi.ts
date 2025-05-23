import { Artist, ArtistQuery } from "@/features/artist/artistTypes";
import { supabase, supabaseUrl } from "./supabase";
import { ArtistSignUpData, Profile } from "@/features/auth/userType";

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

  if (verificationError) throw new Error("❌ Wrong code, try again.");

  let { data: profileInfo } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_email", email)
    .single<Profile>();

  const { data: artistData } = await supabase
    .from("artists")
    .select("* , profiles(full_name ,avatar_url, nickname)")
    .eq(`user_id`, `${profileInfo?.user_id}`)
    .single<Artist>();

  if (profileInfo && profileInfo.user_type !== userType) {
    await supabase.auth.signOut();
    throw new Error("❌ Wrong User type!");
  }

  if (
    !profileInfo === null ||
    (profileInfo?.user_type === userType && profileInfo.user_type === "user")
  ) {
    return {
      data: data.user,
      profileInfo: profileInfo || "empty",
    };
  } else {
    return {
      data: data.user,
      profileInfo: artistData || null,
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
  if (error) throw new Error("Could not fetch current user");
  return {
    data: user,
    profileInfo: profileInfo as Profile[],
  };
}

export async function getCurrentArtist() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("artists")
    .select("* , profiles(full_name ,avatar_url, nickname)")
    .eq(`user_id`, user?.id);

  if (error) throw new Error("Could not fetch current artist");
  return {
    data: user,
    profileInfo: data as Artist[],
  };
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("we could not log you out");
}

export async function createArtistProfile(
  input: ArtistSignUpData
): Promise<Artist[]> {
  const profileImagePath = `artist/${crypto.randomUUID()}-${
    input.profile_image.name
  }`;
  const coverImagePath = `cover_images/${crypto.randomUUID()}-${
    input?.cover_image?.name
  }`;
  const profileURL = `${supabaseUrl}/storage/v1/object/public/profile/${profileImagePath}`;

  const coverURL = input.cover_image
    ? `${supabaseUrl}/storage/v1/object/public/profile/${coverImagePath}`
    : "";

  const { error: profileUploadError } = await supabase.storage
    .from("profile")
    .upload(profileImagePath, input.profile_image);

  if (input.cover_image) {
    const { error: coverUploadError } = await supabase.storage
      .from("profile")
      .upload(coverImagePath, input.cover_image);

    if (coverUploadError) throw new Error(coverUploadError.message);
  }

  if (profileUploadError) throw new Error(profileUploadError.message);

  const { data: profileData, error } = await supabase
    .from("profiles")
    .insert([
      {
        user_id: input.user_id,
        full_name: input.profileDetails.full_name,
        nickname: input.profileDetails.nickname,
        avatar_url: profileURL,
        user_email: input.profileDetails.user_email,
        user_type: "artist",
      },
    ])
    .select();

  if (error) throw new Error(error.message);
  const { data: artistData, error: artistError } = await supabase
    .from("artists")
    .insert([
      {
        user_id: input.user_id,
        location: input.location,
        cover_url: coverURL,
        about: input.about,
      },
    ])
    .select();
  if (artistError) throw new Error(artistError.message);

  return [
    {
      ...(artistData.at(0) as ArtistQuery),
      profiles: {
        fullname: (profileData.at(0) as Profile).full_name,
        nickname: (profileData.at(0) as Profile).nickname,
        avatar_url: (profileData.at(0) as Profile).avatar_url || "",
      },
    },
  ];
}
