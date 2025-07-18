/**
 * playlistType module
 *
 * Contains TypeScript types for representing playlists and playlist queries.
 *
 * Types:
 * - Playlist: Represents a playlist entity.
 * - PlaylistQuery: Represents a query result for a single playlist.
 * - PlaylistsQuery: Represents a query result for multiple playlists.
 * - PlaylistSong: Represents a song within a playlist.
 *
 * Usage:
 * - Used throughout the app for type safety when handling playlist data.
 */

import { Song } from "../tracks/songType";

export type Playlist = {
  created_by: string;
  name: string;
  created_at?: string;
  is_public: boolean;
  playlist_id?: string;
  cover_url?: string;
  description?: string;
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
