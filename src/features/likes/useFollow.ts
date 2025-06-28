import {
  followArtist,
  FollowType,
  hasFollowArtist,
} from "@/services/FollowApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFollowArtist() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: FollowType) => followArtist(data),
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({
        queryKey: ["followEvent", variables.artist_id, variables.follower_id],
      }),
  });
  return { mutate, isPending, error };
}

export function useHasFollowArtist({ follower_id, artist_id }: FollowType) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["followEvent", artist_id, follower_id],
    queryFn: ({ queryKey }) =>
      hasFollowArtist({ follower_id: queryKey[2], artist_id: queryKey[1] }),
    enabled: !!follower_id && !!artist_id,
  });
  return { data, isLoading, error };
}
