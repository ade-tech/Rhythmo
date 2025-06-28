import { supabase } from "./supabase";

export interface FollowType {
  follower_id: string;
  artist_id: string;
}
export async function followArtist({ follower_id, artist_id }: FollowType) {
  const { error } = await supabase
    .from("follows")
    .insert([{ follower_id, following_id: artist_id }])
    .select();

  if (error) throw new Error("We could not make it happen");
}

export async function hasFollowArtist({ follower_id, artist_id }: FollowType) {
  const { count, error } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", follower_id)
    .eq("following_id", artist_id);

  if (error) throw new Error("We could not make it happen");

  return count;
}
