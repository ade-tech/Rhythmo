/**
 * @file src/services/songsApi.ts
 * @description Provides API functions for fetching and updating song data from the backend.
 *
 * Usage:
 * - Used in song-related hooks and components to interact with song endpoints.
 */

import { type Song } from "@/features/tracks/songType";
import { supabase } from "./supabase";

/**
 * Type for the result of a song query, including the main song and an optional queue.
 * @typedef {Object} SongQueryType
 * @property {Song | null} data - The main song data.
 * @property {Song[]} [queue] - Optional queue of related songs.
 */
export interface SongQueryType {
  data: Song | null;
  queue?: Song[];
}

/**
 * Fetches all songs from the backend.
 * @returns {Promise<Song[]>} A promise that resolves to an array of Song objects.
 */
export async function fetchSongs(): Promise<Song[]> {
  const { data, error } = await supabase.from("songs").select("*");
  if (error) throw new Error(error.message);

  return data as Song[];
}

/**
 * Fetches a single song by ID and a queue of related songs by genre.
 * @param {string} id - The ID of the song to fetch.
 * @returns {Promise<SongQueryType>} A promise that resolves to the song and a queue of related songs.
 */
export async function fetchSong(id: string): Promise<SongQueryType> {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("id", id)
    .single();

  const { data: queueData, error: queueError } = await supabase
    .from("songs")
    .select("*")
    .eq("genre", (data as Song).genre)
    .limit(20);

  const firstItem = (queueData as Song[])?.filter(
    (song) => song.title === (data as Song).title
  );

  const others = (queueData as Song[])?.filter(
    (song) => song.title !== (data as Song).title
  );
  const queue = [...firstItem, ...others];

  if (queueError) throw new Error(queueError.message);
  if (error) throw new Error(error.message);
  return { data, queue };
}
