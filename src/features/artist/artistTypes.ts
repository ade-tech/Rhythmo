/**
 * artistTypes module
 *
 * Contains TypeScript types for representing artist data and artist queries.
 *
 * Types:
 * - Artist: Represents a full artist profile with nested profile info.
 * - ArtistQuery: Represents a query result for an artist, with basic info.
 *
 * Usage:
 * - Used throughout the app for type safety when handling artist data.
 */

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
