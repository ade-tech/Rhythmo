/**
 * usePlaylist module
 *
 * Contains custom React hooks for fetching and managing playlist data from the API.
 *
 * Usage:
 * - Provides hooks such as useFetchPlaylist and useFetchSongsInPlaylist for playlist-related components.
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Playlist, PlaylistQuery, PlaylistsQuery } from "./playlistType";
import {
  addSongToPlaylist,
  createPlaylist as createPlaylistApi,
  fetchPlaylist,
  fetchPlaylists,
  fetchSongsInPlaylist,
  fetchSongsToPlayInPlaylist,
  removeSongFromPlaylist,
} from "@/services/playListApi";

export function useCreatePlaylist() {
  const queryClient = useQueryClient();
  const {
    mutate: createPlaylist,
    isPending,
    error,
  } = useMutation({
    mutationFn: (playlist: Playlist) => createPlaylistApi(playlist),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["playlist", variables.playlist_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["playlist", variables.created_by],
      });
    },
  });

  return { createPlaylist, isPending, error };
}
export function useFetchPlaylist(id: string): PlaylistQuery {
  const { data, error, isLoading } = useQuery({
    queryKey: ["playlist", id],
    queryFn: ({ queryKey }) => fetchPlaylist(queryKey[1]!),

    enabled: !!id,
  });

  return { data, error, isLoading };
}

export function useFetchPlaylists(userID: string): PlaylistsQuery {
  const { data, error, isLoading } = useQuery({
    queryKey: ["playlist", userID],
    queryFn: ({ queryKey }) => fetchPlaylists(queryKey[1]!),

    enabled: !!userID,
  });

  return { data, error, isLoading };
}

export function useFetchSongsInPlaylist(playlistID: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["songs-In", playlistID],
    queryFn: ({ queryKey }) => fetchSongsInPlaylist(queryKey[1]!),

    enabled: !!playlistID,
  });

  console.log(playlistID);
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

export function useAddSongToPlaylist() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({
      song_id,
      playlist_id,
    }: {
      song_id: string;
      playlist_id: string;
    }) => addSongToPlaylist({ song_id, playlist_id }),
    onSuccess: (_, { playlist_id }) => {
      console.log(playlist_id);
      queryClient.invalidateQueries({
        queryKey: ["songs-In", playlist_id],
      });
    },
  });

  return { mutate, isPending, error };
}

export function useRemoveSongFromPlaylist() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({
      song_id,
      playlist_id,
      currentUser,
      isLikePlaylist,
    }: {
      song_id: string;
      playlist_id: string;
      currentUser: string;
      isLikePlaylist?: boolean;
    }) =>
      removeSongFromPlaylist({
        song_id,
        playlist_id,
        currentUser,
        isLikePlaylist,
      }),
    onSuccess: (_, { playlist_id, song_id, currentUser, isLikePlaylist }) => {
      console.log(playlist_id);
      queryClient.invalidateQueries({
        queryKey: ["songs-In", playlist_id],
      });
      if (isLikePlaylist) {
        queryClient.invalidateQueries({
          queryKey: ["likeEvent", song_id, currentUser],
        });
      }
    },
  });

  return { mutate, isPending, error };
}
