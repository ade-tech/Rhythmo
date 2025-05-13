import { Playlist, PlaylistSong } from "@/features/playlist/playlistType";
import { supabase } from "./supabase";

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

export async function fetchPlaylist(id: string): Promise<Playlist> {
  const { data, error } = await supabase
    .from("playlist")
    .select("*")
    .eq("playlist_id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function fetchPlaylists(userID: string): Promise<Playlist[]> {
  const { data, error } = await supabase
    .from("playlist")
    .select("*")
    .eq("created_by", userID);

  if (error) throw new Error("We could not fetch the Playlists");
  return data;
}
export async function fetchSongsInPlaylist(
  playlistID: string
): Promise<PlaylistSong[]> {
  const { data, error } = await supabase
    .from("playlistSongs")
    .select("*, song:songs(*)")
    .eq("playlist_id", playlistID);

  if (error) throw new Error("could not get the songs");
  return data as PlaylistSong[];
}
