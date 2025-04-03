import { useQuery } from "@tanstack/react-query";
import { SongsQuery } from "./songType";
import { fetchSongs } from "@/services/songsApi";

export function useFetchSongs(): SongsQuery {
  const { data, isLoading } = useQuery({
    queryFn: fetchSongs,
    queryKey: ["initial-songs"],
  });

  return { data, isLoading };
}
