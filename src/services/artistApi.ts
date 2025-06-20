/**
 * @file src/services/artistApi.ts
 * @description Provides API functions for fetching and updating artist data from the backend.
 *
 * Usage:
 * - Used in artist-related hooks and components to interact with artist endpoints.
 */

import { Artist } from "@/features/artist/artistTypes";
import { supabase } from "./supabase";
import { Song } from "@/features/tracks/songType";

/**
 * Fetches an artist by user ID.
 * @param {string} userID - The user ID of the artist to fetch.
 * @returns {Promise<Artist | undefined>} A promise that resolves to the artist data or undefined if not found.
 */
export async function fetchArtist(userID: string): Promise<Artist | undefined> {
  if (!userID) return;
  const { data, error } = await supabase
    .from("artists")
    .select("* , profiles(full_name ,avatar_url, nickname)")
    .eq(`user_id`, `${userID}`)
    .single();

  if (error) throw new Error("Could not get the artist");
  if (!data) throw new Error("Artist not found");
  return data as Artist;
}

/**
 * Fetches all artists from the backend.
 * @returns {Promise<Artist[] | undefined>} A promise that resolves to an array of artists or undefined if none found.
 */
export async function fetchArtists(): Promise<Artist[] | undefined> {
  const { data, error } = await supabase
    .from("artists")
    .select("* , profiles(full_name , avatar_url, nickname)");

  if (error) throw new Error("could not fetch artists");
  if (!data) return undefined;

  return data as Artist[];
}

export async function fetchSongsByArtist(id: string) {
  if (!id) return;

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("artist_id", id);

  if (error) throw new Error("We could not get your songs");

  return data as Song[];
}
