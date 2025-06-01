/**
 * useArtist module
 *
 * Contains custom React hooks for fetching and managing artist data from the API.
 *
 * Usage:
 * - Provides hooks such as useFetchArtist for use in artist-related components.
 */

import { fetchArtist, fetchArtists } from "@/services/artistApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Artist } from "./artistTypes";
import { useNavigate } from "react-router-dom";
import { logOut } from "@/services/onboardingApi";
import { useCurrentArtist } from "@/contexts/currentArtistContext";

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

/**
 * Fetches a list of artists for onboarding using a React Query hook.
 *
 * @returns An object containing the fetched array of artists (or undefined) and the loading state.
 */
export function useFetchArtists(): ArtistsQuery {
  const { data, isLoading } = useQuery({
    queryKey: [`onboarding-artist`],
    queryFn: fetchArtists,
  });

  return { data: data || undefined, isLoading };
}

/**
 * Provides a hook to handle user logout, clearing artist-related data and redirecting to the home page.
 *
 * @returns An object containing the `signOut` function to trigger logout, a boolean `isPending` indicating if logout is in progress, and any `error` encountered during logout.
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const { setCurrentArtist } = useCurrentArtist();
  const navigate = useNavigate();
  const {
    mutate: signOut,
    isPending,
    error,
  } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.setQueryData(["rhythmo-currentArtist"], {
        data: null,
        profileInfo: null,
      });
      setCurrentArtist({
        data: null,
        profileInfo: null,
      });

      queryClient.invalidateQueries({ queryKey: ["rhythmo-currentArtist"] });
      navigate("/");
    },
  });

  return { signOut, isPending, error };
}
