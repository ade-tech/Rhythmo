import { Song } from "../tracks/songType";

export type Playlist = {
  created_by: string;
  name: string;
  created_at?: string;
  is_public: boolean;
  playlist_id?: string;
};

export type PlaylistQuery = {
  data: Playlist | undefined;
  isLoading: boolean;
  error?: Error | null;
};

export type PlaylistsQuery = {
  data: Playlist[] | undefined;
  isLoading: boolean;
  error?: Error | null;
};

export type PlaylistSong = {
  id: string;
  playlist_id: string;
  created_at: string;
  song_id: string;
  song: Song;
};
