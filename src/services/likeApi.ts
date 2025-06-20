import { LikeQuery } from "@/features/likes/likesType";
import { supabase } from "./supabase";

export async function likeSong({ song_id, liker_id }: LikeQuery) {
  const { error } = await supabase
    .from("song_like")
    .insert([{ liker_id, song_id }]);
  if (error) throw new Error("Something went wrong 🥹");
}

export async function unlikeSong({ song_id, liker_id }: LikeQuery) {
  const { error } = await supabase
    .from("song_like")
    .delete()
    .match({ song_id, liker_id });
  if (error) throw new Error("Something went wrong 🥹");
}

export async function hasLikedSong({ song_id, liker_id }: LikeQuery) {
  const { count, error } = await supabase
    .from("song_like")
    .select("*", { count: "exact", head: true })
    .eq("liker_id", liker_id)
    .eq("song_id", song_id);
  if (error) throw new Error("Something went wrong 🥹");

  return count;
}
