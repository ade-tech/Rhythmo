export type Song = {
  id: number;
  created_at: string;
  title: string;
  artist: {
    main: string;
    featured?: string;
  };
  producer: string;
  play_count: number;
  likes: number;
  duration: string;
  album?: string;
  album_id?: string;
  audio_url: string;
  cover_url: string;
};

export type SongQuery = {
  data: Song | Song[] | undefined;
  isLoading: boolean;
  error?: null | Error;
};
