import { Artist } from "@/features/artist/artistTypes";
import { supabase } from "./supabase";

export async function fetchArtist(userID: string): Promise<Artist | undefined> {
  if (!userID) return;
  const { data, error } = await supabase
    .from("artists")
    .select("* , profile(full_name , nickname)")
    .eq(`user_id`, `${userID}`)
    .single();

  if (error) throw new Error("Could not get the artist");
  if (!data) throw new Error("Artist not found");
  return data as Artist;
}
