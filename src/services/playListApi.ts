/**
 * @file src/services/playListApi.ts
 * @description Provides API functions for fetching and updating playlist data from the backend.
 *
 * Usage:
 * - Used in playlist-related hooks and components to interact with playlist endpoints.
 */

import { Playlist, PlaylistSong } from "@/features/playlist/playlistType";
import { supabase, supabaseUrl } from "./supabase";
import { likeSong, unlikeSong } from "./likeApi";
import { SongQueryType } from "./songsApi";
import { LIKEDSONGCOVER } from "@/helpers/constants";
import { EditPlaylistInput } from "@/features/playlist/EditPlaylist";

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
export async function removeSongFromPlaylist({
  song_id,
  playlist_id,
  currentUser,
  isLikePlaylist = false,
}: {
  song_id: string;
  currentUser: string;
  playlist_id: string;
  isLikePlaylist?: boolean;
}) {
  const { error } = await supabase.from("playlist_songs").delete().match({
    song_id,
    playlist_id,
  });

  if (error) throw new Error("We could not add song to playlist");

  if (!isLikePlaylist) return;
  await unlikeSong({
    song_id,
    liker_id: currentUser,
  });
}

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
  cover_url = LIKEDSONGCOVER,
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

export async function editPlaylist({
  name,
  description,
  coverFile,
  playlist_id,
}: EditPlaylistInput) {
  const isFile = coverFile instanceof FileList;
  let imagePath;
  let imageURL;
  if (isFile) {
    imagePath = `${crypto.randomUUID()}-${coverFile[0].name}`;
    imageURL = `${supabaseUrl}/storage/v1/object/public/songcover/${imagePath}`;

    const { error } = await supabase.storage
      .from("songcover")
      .upload(imagePath, coverFile[0]);

    if (error) {
      throw new Error(error.message);
    }
  }
  const { error } = await supabase
    .from("playlist")
    .update({ name, description, cover_url: isFile ? imageURL : coverFile })
    .eq("playlist_id", playlist_id);

  if (error) throw new Error(error.message);
}
