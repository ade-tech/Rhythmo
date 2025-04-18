import { useQuery } from "@tanstack/react-query";
import { SongQuery, SongsQuery } from "./songType";
import { fetchSong, fetchSongs } from "@/services/songsApi";

export function useFetchSongs(): SongsQuery {
  const { data, isLoading } = useQuery({
    queryFn: fetchSongs,
    queryKey: ["initial-songs"],
  });

  return { data, isLoading };
}

export function useFetchSong(id: string): SongQuery {
  const { data, isLoading } = useQuery({
    queryKey: [`Song--${id}`],
    queryFn: ({ queryKey }) => fetchSong(queryKey[0].split("--")[1]),
    enabled: !!id,
  });
  return { data, isLoading };
}
