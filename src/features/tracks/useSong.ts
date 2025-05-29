/**
 * useSong module
 *
 * Contains custom React hooks for fetching and managing song data from the API.
 *
 * Usage:
 * - Provides hooks such as useFetchSongs and useFetchSong for song-related components.
 */

import { useQuery } from "@tanstack/react-query";
import { SongQuery, SongsQuery } from "./songType";
import { fetchSong, fetchSongs } from "@/services/songsApi";

export function useFetchSongs(): SongsQuery {
  const { data, isLoading, error } = useQuery({
    queryFn: fetchSongs,
    queryKey: ["initial-songs"],
  });

  return { data, isLoading, error };
}

export function useFetchSong(id: string): SongQuery {
  const { data, isLoading, error } = useQuery({
    queryKey: [`Song--${id}`],
    queryFn: ({ queryKey }) => fetchSong(queryKey[0].split("--")[1]),
    enabled: !!id,
  });
  return { data: data, isLoading, error };
}
