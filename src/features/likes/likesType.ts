export interface Like {
  id: string;
  created_at: string;
  liker_id: string;
  song_id: string;
}

export type LikeQuery = Omit<Like, "id" | "created_at">;
