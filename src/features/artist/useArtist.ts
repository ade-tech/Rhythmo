import { fetchArtist } from "@/services/artistApi";
import { useQuery } from "@tanstack/react-query";
import { Artist } from "./artistTypes";

interface ArtistQuery {
  data: Artist | undefined;
  isLoading: boolean;
}

export function useFetchArtist(userID: string): ArtistQuery {
  const { data, isLoading } = useQuery({
    queryKey: [`Artist--${userID}`],
    queryFn: ({ queryKey }) => fetchArtist(queryKey[0].split("--")[1]),
    enabled: !!userID,
  });

  return { data, isLoading };
}
