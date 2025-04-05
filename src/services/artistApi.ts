import { Artist } from "@/features/artist/artistTypes";
import { supabase } from "./supabase";

export async function fetchArtist(query: string): Promise<Artist | undefined> {
  console.log(query);
  if (!query) return;
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .eq(`nickname`, `${query}`)
    .single();

  if (error) throw new Error("Could not get the artist");
  if (!data) throw new Error("Artist not found");
  return data as Artist;
}
