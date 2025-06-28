/**
 * @file src/services/playListApi.ts
 * @description Provides API functions for fetching and updating playlist data from the backend.
 *
 * Usage:
 * - Used in playlist-related hooks and components to interact with playlist endpoints.
 */

import { Playlist, PlaylistSong } from "@/features/playlist/playlistType";
import { supabase } from "./supabase";
import { likeSong } from "./likeApi";
import { SongQueryType } from "./songsApi";

/**
 * Creates a new playlist in the backend.
 * @param {Playlist} playlist - The playlist data to create.
 * @returns {Promise<Playlist>} A promise that resolves to the created playlist.
 */
export async function createPlaylist(playlist: Playlist): Promise<Playlist> {
  const { data, error } = await supabase
    .from("playlist")
    .insert([
      {
        created_by: playlist.created_by,
        is_public: playlist.is_public,
        name: playlist.name,
      },
    ])
    .select()
    .single();

  if (error) throw new Error("we could not create a playlist");
  if (data === null) throw new Error("An Error occured");
  return data as Playlist;
}

/**
 * Fetches a playlist by its ID.
 * @param {string} id - The ID of the playlist to fetch.
 * @returns {Promise<Playlist>} A promise that resolves to the playlist data.
 */
export async function fetchPlaylist(id: string): Promise<Playlist> {
  const { data, error } = await supabase
    .from("playlist")
    .select("*")
    .eq("playlist_id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/**
 * Fetches all playlists created by a specific user.
 * @param {string} userID - The user ID whose playlists to fetch.
 * @returns {Promise<Playlist[]>} A promise that resolves to an array of playlists.
 */
export async function fetchPlaylists(userID: string): Promise<Playlist[]> {
  const { data, error } = await supabase
    .from("playlist")
    .select("*")
    .eq("created_by", userID);

  if (error) throw new Error("We could not fetch the Playlists");
  return data;
}

/**
 * Fetches all songs in a specific playlist by playlist ID.
 *
 * @param {string} playlistID - The ID of the playlist whose songs to fetch.
 * @returns {Promise<PlaylistSong[]>} A promise that resolves to an array of PlaylistSong objects.
 */
export async function fetchSongsInPlaylist(
  playlistID: string
): Promise<PlaylistSong[]> {
  const { data, error } = await supabase
    .from("playlist_songs")
    .select("*, song:songs(*)")
    .eq("playlist_id", playlistID);

  if (error) throw new Error("could not get the songs");
  return data as PlaylistSong[];
}

export async function addSongToPlaylist({
  song_id,
  playlist_id,
}: {
  song_id: string;
  playlist_id: string;
}) {
  const { error } = await supabase.from("playlist_songs").insert([
    {
      song_id,
      playlist_id,
    },
  ]);

  if (error) throw new Error("We could not add song to playlist");
}
const likedSongCover =
  "https://zgfhsczbfiisjubssmfb.supabase.co/storage/v1/object/public/profile//artworks-4Lu85Xrs7UjJ4wVq-vuI2zg-t500x500.jpg";

export type createPlaylistFromLikeProps = {
  song_id: string;
  is_public?: boolean;
  name?: string;
  created_by: string;
  cover_url?: string;
};
export async function createPlaylistFromLike({
  song_id,
  is_public = false,
  name = "Liked Song",
  created_by,
  cover_url = likedSongCover,
}: createPlaylistFromLikeProps) {
  let playlistData: Playlist;
  const {
    data: playlist,
    count,
    error: artistCheckError,
  } = await supabase
    .from("playlist")
    .select("*", { count: "exact" })
    .match({ name, created_by });

  if (artistCheckError) throw new Error(" ❌ We could not make that happen");
  playlistData = playlist[0] as Playlist;
  if (!count) {
    const { data, error: createPlaylistError } = await supabase
      .from("playlist")
      .insert([
        {
          is_public,
          name,
          created_by,
          cover_url,
        },
      ])
      .select("*")
      .single();

    if (createPlaylistError)
      throw new Error(" ❌ We could not make that happen");

    playlistData = data as Playlist;
  }

  await likeSong({
    song_id,
    liker_id: created_by,
  });

  await addSongToPlaylist({
    song_id,
    playlist_id: playlistData.playlist_id!,
  });

  return playlistData;
}

export async function fetchSongsToPlayInPlaylist(
  playlistID: string
): Promise<SongQueryType> {
  const { data, error } = await supabase
    .from("playlist_songs")
    .select("songs(*)")
    .eq("playlist_id", playlistID);

  if (error) throw new Error("could not get the songs");
  const songResult = data.map((cur) => cur.songs).flat();
  return { data: songResult.at(0), queue: songResult };
}
