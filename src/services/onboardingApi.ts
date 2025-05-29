/**
 * @file src/services/onboardingApi.ts
 * @description Provides API functions for managing onboarding flows and data.
 *
 * Usage:
 * - Used in onboarding-related hooks and components to interact with onboarding endpoints.
 */

import { Artist, ArtistQuery } from "@/features/artist/artistTypes";
import { supabase, supabaseUrl } from "./supabase";
import { ArtistSignUpData, Profile } from "@/features/auth/userType";

/**
 * Sends a one-time password (OTP) to the specified email address for authentication.
 * @param {string} email - The email address to send the OTP to.
 * @throws {Error} If the OTP could not be sent.
 */
export async function sendOTP(email: string) {
  let { error } = await supabase.auth.signInWithOtp({
    email,
  });
  if (error) throw new Error("OTP was not sent");
}

/**
 * Verifies a user with an OTP and checks user type.
 * @param {string} email - The email address to verify.
 * @param {string} token - The OTP token to verify.
 * @param {"artist" | "user"} userType - The type of user to verify.
 * @throws {Error} If verification fails or user type does not match.
 */
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

/**
 * Creates a new user profile.
 * @param {Object} profileData - The profile data to create the user profile.
 * @param {string} profileData.full_name - The full name of the user.
 * @param {string} profileData.nickname - The nickname of the user.
 * @param {string} profileData.user_email - The email of the user.
 * @param {string} profileData.user_id - The user ID.
 * @param {string} profileData.user_type - The type of the user.
 * @param {string} profileData.avatar_url - The avatar URL of the user.
 * @param {Array<string>} profileData.fav_artist - The favorite artists of the user.
 * @throws {Error} If the profile could not be created.
 */
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

/**
 * Retrieves the current logged-in user's information.
 * @returns {Object} The current user and profile information.
 * @throws {Error} If the current user could not be fetched.
 */
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

/**
 * Retrieves the current artist's information.
 * @returns {Object} The current artist and profile information.
 * @throws {Error} If the current artist could not be fetched.
 */
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

/**
 * Logs out the current user.
 * @throws {Error} If the user could not be logged out.
 */
export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("we could not log you out");
}

/**
 * Creates a new artist profile.
 * @param {ArtistSignUpData} input - The artist sign-up data.
 * @param {File} input.profile_image - The profile image file.
 * @param {File} [input.cover_image] - The cover image file (optional).
 * @param {string} input.user_id - The user ID.
 * @param {Object} input.profileDetails - The profile details.
 * @param {string} input.profileDetails.full_name - The full name of the artist.
 * @param {string} input.profileDetails.nickname - The nickname of the artist.
 * @param {string} input.profileDetails.user_email - The email of the artist.
 * @param {string} input.location - The location of the artist.
 * @param {string} input.about - The about information of the artist.
 * @throws {Error} If the artist profile could not be created.
 */
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
        full_name: (profileData.at(0) as Profile).full_name,
        nickname: (profileData.at(0) as Profile).nickname,
        avatar_url: (profileData.at(0) as Profile).avatar_url || "",
      },
    },
  ];
}
