import { fetchArtist } from "@/services/artistApi";
import { useQuery } from "@tanstack/react-query";
import { Artist } from "./artistTypes";

interface ArtistQuery {
  data: Artist | undefined;
  isLoading: boolean;
}

export function useFetchArtist(query: string): ArtistQuery {
  const { data, isLoading } = useQuery({
    queryKey: [`Artist--${query}`],
    queryFn: ({ queryKey }) => fetchArtist(queryKey[0].split("--")[1]),
    enabled: !!query,
  });

  return { data, isLoading };
}
