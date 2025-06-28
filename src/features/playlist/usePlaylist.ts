/**
 * usePlaylist module
 *
 * Contains custom React hooks for fetching and managing playlist data from the API.
 *
 * Usage:
 * - Provides hooks such as useFetchPlaylist and useFetchSongsInPlaylist for playlist-related components.
 */

import { useMutation, useQuery } from "@tanstack/react-query";
import { Playlist, PlaylistQuery, PlaylistsQuery } from "./playlistType";
import {
  createPlaylist as createPlaylistApi,
  fetchPlaylist,
  fetchPlaylists,
  fetchSongsInPlaylist,
  fetchSongsToPlayInPlaylist,
} from "@/services/playListApi";

export function useCreatePlaylist() {
  const {
    mutate: createPlaylist,
    isPending,
    error,
  } = useMutation({
    mutationFn: (playlist: Playlist) => createPlaylistApi(playlist),
  });

  return { createPlaylist, isPending, error };
}
export function useFetchPlaylist(id: string): PlaylistQuery {
  const { data, error, isLoading } = useQuery({
    queryKey: [`playlist--${id}`],
    queryFn: ({ queryKey }) => fetchPlaylist(queryKey.at(0)?.split("--")[1]!),

    enabled: !!id,
  });

  return { data, error, isLoading };
}

export function useFetchPlaylists(userID: string): PlaylistsQuery {
  const { data, error, isLoading } = useQuery({
    queryKey: [`playlist--${userID}`],
    queryFn: ({ queryKey }) => fetchPlaylists(queryKey.at(0)?.split("--")[1]!),

    enabled: !!userID,
  });

  return { data, error, isLoading };
}

export function useFetchSongsInPlaylist(playlistID: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: [`songs-In--${playlistID}`],
    queryFn: ({ queryKey }) =>
      fetchSongsInPlaylist(queryKey.at(0)?.split("--")[1]!),

    enabled: !!playlistID,
  });

  return { data, error, isLoading };
}

export function useFetchSongsToPlayInPlaylist(playlistID: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Playing from Playlist", playlistID],
    queryFn: ({ queryKey }) => fetchSongsToPlayInPlaylist(queryKey[1]),

    enabled: !!playlistID,
  });

  return { data, error, isLoading };
}
