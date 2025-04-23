export interface Profile {
  user_id: string;
  join_date?: string;
  full_name: string;
  nickname: string;
  avatar_url?: string;
  user_email: string;
  user_type: string;
  fav_artist: string[];
}
