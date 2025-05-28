export type Artist = {
  id: number;
  created_at: string;
  user_id: string;
  songs: object;
  songs_count: number;
  followers_count: number;
  cover_url: string;
  monthly_plays: number;
  about: string;
  profiles: {
    full_name: string;
    nickname: string;
    avatar_url: string;
  };
};

export type ArtistQuery = {
  id: number;
  created_at: string;
  user_id: string;
  songs: object;
  songs_count: number;
  cover_url: string;
  followers_count: number;
  monthly_plays: number;
  about: string;
};
