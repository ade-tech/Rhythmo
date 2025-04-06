export type Song = {
  id: number;
  created_at: string;
  title: string;
  artist: string;
  producer: string;
  play_count: number;
  likes: number;
  duration: number;
  album?: string;
  album_id?: string;
  audio_url: string;
  cover_url: string;
  featured_artist?: string[];
};

export type SongsQuery = {
  data: Song[] | undefined;
  isLoading: boolean;
  error?: null | Error;
};

export type SongQuery = {
  data: Song | undefined;
  isLoading: boolean;
  error?: null | Error;
};
