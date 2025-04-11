export type Artist = {
  id: number;
  created_at: string;
  user_id: string;
  songs: object;
  songs_count: number;
  followers_count: number;
  monthly_plays: number;
  cover_url: number;
  image_url: number;
  about: string;
  profile: {
    fullname: string;
    nickname: string;
  };
};
