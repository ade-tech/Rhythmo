import { type Song } from "@/features/tracks/songType";
import { supabase } from "./supabase";

export interface SongQueryType {
  data: Song;
  queue?: Song[];
}

export async function fetchSongs(): Promise<Song[]> {
  const { data, error } = await supabase.from("songs").select("*");
  if (error instanceof Error) throw new Error(error.message);

  return data as Song[];
}

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
  if (error instanceof Error) throw new Error(error.message);
  return { data, queue };
}
