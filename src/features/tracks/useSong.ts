import { useQuery } from "@tanstack/react-query";
import { SongQuery } from "./songType";
import { fetchSongs } from "@/services/songsApi";

export function useFetchSongs(): SongQuery {
  const { data, isLoading } = useQuery({
    queryFn: fetchSongs,
    queryKey: ["initial-songs"],
  });

  return { data, isLoading };
}
