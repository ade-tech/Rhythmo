import { type Song } from "@/features/tracks/songType";
import { supabase } from "./supabase";

export async function fetchSongs(): Promise<Song[]> {
  const { data, error } = await supabase.from("songs").select("*");
  if (error instanceof Error) throw new Error(error.message);

  return data as Song[];
}
