/**
 * useSong module
 *
 * Contains custom React hooks for fetching and managing song data from the API.
 *
 * Usage:
 * - Provides hooks such as useFetchSongs and useFetchSong for song-related components.
 */

import { useMutation, useQuery } from "@tanstack/react-query";
import { SongQuery, SongsQuery } from "./songType";
import {
  createAlbum,
  fetchSong,
  fetchSongs,
  uploadSong,
} from "@/services/songsApi";
import { CreateAlbumProps } from "../artist/CreateAlbumDialog";
import { CreateMusicProps } from "../artist/CreateMusicDialog";

export function useFetchSongs(): SongsQuery {
  const { data, isLoading, error } = useQuery({
    queryFn: fetchSongs,
    queryKey: ["initial-songs"],
  });

  return { data, isLoading, error };
}

export function useFetchSong(id: string): SongQuery {
  const { data, isLoading, error } = useQuery({
    queryKey: ["song", id],
    queryFn: ({ queryKey }) => fetchSong(queryKey[1]),
    enabled: !!id,
  });
  return { data: data, isLoading, error };
}

export function useUploadSong() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ data, id }: { data: CreateMusicProps; id: string }) =>
      uploadSong({ data, id }),
  });

  return { mutate, isPending, error };
}

export function useCreateAlbum() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: CreateAlbumProps) => createAlbum(data),
  });
  return { mutate, isPending, error };
}
