/**
 * @file src/services/songsApi.ts
 * @description Provides API functions for fetching and updating song data from the backend.
 *
 * Usage:
 * - Used in song-related hooks and components to interact with song endpoints.
 */

import { type Song } from "@/features/tracks/songType";
import { supabase, supabaseUrl } from "./supabase";
import { CreateMusicProps } from "@/features/artist/CreateMusicDialog";
import { CreateAlbumProps } from "@/features/artist/CreateAlbumDialog";
import { Playlist } from "@/features/playlist/playlistType";

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
    .overlaps("genre", (data as Song).genre)
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

export async function uploadSong({
  data,
  id,
}: {
  data: CreateMusicProps;
  id: string;
}) {
  console.log(data, id);
  if (!id) return;
  const audioPath = `${crypto.randomUUID()}-${data.audio.name}`;
  const coverImagePath = `${crypto.randomUUID()}-${data.coverImage.name}`;

  const audioUrl = `${supabaseUrl}/storage/v1/object/public/songs/${audioPath}`;

  const coverImageUrl = `${supabaseUrl}/storage/v1/object/public/songcover/${coverImagePath}`;

  const { error: audioUploadError } = await supabase.storage
    .from("songs")
    .upload(audioPath, data.audio);

  if (audioUploadError) throw new Error("We could not upload your music");

  const { error: imageUploadError } = await supabase.storage
    .from("songcover")
    .upload(coverImagePath, data.coverImage);

  if (imageUploadError) {
    const { error } = await supabase.storage.from("songs").remove([audioPath]);
    if (error) throw new Error("An error occured!");
    throw new Error("We could not upload your image cover");
  }

  const { data: songDetails, error } = await supabase
    .from("songs")
    .insert([
      {
        title: data.title,
        album: data.album,
        producer: data.producer,
        composer: data.composer,
        prominent_color: data.prominent_color,
        genre: data.genre,
        audio_url: audioUrl,
        cover_url: coverImageUrl,
        artist: data.artist,
        artist_id: data.artist_id,
        duration: Math.floor(data.duration),
        album_id: null,
      },
    ])
    .select("*");

  if (error) {
    const { error } = await supabase.storage.from("songs").remove([audioPath]);
    const { error: deleteImageError } = await supabase.storage
      .from("songcover")
      .remove([coverImagePath]);
    if (error || deleteImageError) throw new Error("An error occured!");
    throw new Error("We could not complete the song upload");
  }

  return songDetails as Song[];
}

export async function createAlbum({
  title,
  albumSongs,
  coverImage,
  artist_id,
}: CreateAlbumProps) {
  const coverImagePath = `${crypto.randomUUID()}-${coverImage.name}`;

  const coverImageUrl = `${supabaseUrl}/storage/v1/object/public/songcover/${coverImagePath}`;

  const { error: imageUploadError } = await supabase.storage
    .from("songcover")
    .upload(coverImagePath, coverImage);

  if (imageUploadError) {
    throw new Error("We could not upload your image cover");
  }

  const { data, error: playlistInsertError } = await supabase
    .from("playlist")
    .insert([
      {
        is_public: true,
        created_by: artist_id,
        name: title,
        cover_url: coverImageUrl,
      },
    ])
    .select()
    .single();

  if (playlistInsertError || !data)
    throw new Error("We could not add the ALbum");

  const playlistSong = albumSongs.map((curSong) => ({
    song_id: curSong,
    playlist_id: (data as Playlist).playlist_id,
  }));

  const { error: playlistSongError } = await supabase
    .from("playlist_songs")
    .insert(playlistSong);

  if (playlistSongError)
    throw new Error("We could not add the songs to the album");
  const { error } = await supabase
    .from("songs")
    .update({ cover_url: coverImageUrl })
    .in("id", albumSongs);

  if (error) throw new Error("We could not finish that");
}
