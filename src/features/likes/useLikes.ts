import { Howl } from "howler";
import {
  hasLikedSong,
  likeSong as LikeSongApi,
  unlikeSong as unlikeSongApi,
} from "@/services/likeApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LikeQuery } from "./likesType";
import {
  createPlaylistFromLike,
  createPlaylistFromLikeProps,
} from "@/services/playListApi";

const sound = new Howl({
  src: ["/like.mp3"],
  html5: true,
  volume: 1,
});

export function useLikeSong() {
  const queryClient = useQueryClient();
  const { mutate: likeSong, isPending } = useMutation({
    mutationFn: (data: LikeQuery) => LikeSongApi(data),
    onSuccess: (_data, variables) => {
      sound.play();
      queryClient.invalidateQueries({
        queryKey: ["likeEvent", variables.song_id, variables.liker_id],
      });
    },
  });
  return { likeSong, isPending };
}

export function useUnlikeSong() {
  const { mutate: unlikeSong, isPending } = useMutation({
    mutationFn: (data: LikeQuery) => unlikeSongApi(data),
  });
  return { unlikeSong, isPending };
}

export function useHasLikedSong({ song_id, liker_id }: LikeQuery) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["likeEvent", song_id, liker_id],
    queryFn: ({ queryKey }) =>
      hasLikedSong({
        song_id: queryKey[1],
        liker_id: queryKey[2],
      }),

    enabled: !!song_id && !!liker_id,
  });

  return { data, isLoading, error };
}

export function usecreatePlaylistFromLike() {
  const queryClient = useQueryClient();
  const { mutate: likeSong, isPending } = useMutation({
    mutationFn: (data: createPlaylistFromLikeProps) =>
      createPlaylistFromLike(data),
    onSuccess: (_data, variables) => {
      sound.play();
      queryClient.invalidateQueries({
        queryKey: ["likeEvent", variables.song_id, variables.created_by],
      });

      queryClient.invalidateQueries({
        queryKey: ["playlist", variables.created_by],
      });
    },
  });
  return { likeSong, isPending };
}
