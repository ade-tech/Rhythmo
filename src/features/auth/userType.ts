export interface Profile {
  user_id: string;
  join_date?: string;
  full_name: string;
  nickname: string;
  avatar_url?: string;
  user_email: string;
  user_type: string;
  fav_artist?: string[];
}

export interface ArtistSignUpData {
  profileDetails: Omit<Profile, "fav_artist" | "avatar_url">;
  songs: {
    title: string;
  } | null;
  songs_count: number;
  followers_count: number;
  monthly_plays: number;
  user_id: string;
  about: string;
  location: string;
  cover_image?: File;
  profile_image: File;
}

export interface LocationType {
  address: {
    country: string;
  };
}
