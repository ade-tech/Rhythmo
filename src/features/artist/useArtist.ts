import { fetchArtist, fetchArtists } from "@/services/artistApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Artist } from "./artistTypes";
import { useNavigate } from "react-router-dom";
import { logOut } from "@/services/onboardingApi";

interface ArtistQuery {
  data: Artist | undefined;
  isLoading: boolean;
}

interface ArtistsQuery {
  data: Artist[] | undefined;
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

export function useFetchArtists(): ArtistsQuery {
  const { data, isLoading } = useQuery({
    queryKey: [`onboarding-artist`],
    queryFn: fetchArtists,
  });

  return { data: data || undefined, isLoading };
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: signOut,
    isPending,
    error,
  } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.setQueryData(["rhythmo-Artist"], {
        data: null,
        profileInfo: null,
      });
      queryClient.invalidateQueries({ queryKey: ["rhythmo-currentArtist"] });
      navigate("/");
    },
  });

  return { signOut, isPending, error };
}
