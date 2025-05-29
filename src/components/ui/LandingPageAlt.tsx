import { useCurrentMusic } from "@/contexts/audioContext";
import { Box } from "@chakra-ui/react";
import TrendingSection from "./TrendingSection";
import { useFetchSongs } from "@/features/tracks/useSong";
import { useFetchArtists } from "@/features/artist/useArtist";
import { RhythmoUser } from "@/contexts/currentUserContext";

/**
 * LandingPageAlt Component
 *
 * Displays an alternative landing page for users who are not authenticated or do not have a valid profile.
 * Shows a call-to-action or information about the app for unauthenticated visitors.
 *
 * Usage:
 * - Rendered when there is no current user or the profileInfo is invalid.
 */

const LandingPageAlt = ({ user }: { user: RhythmoUser | undefined }) => {
  const { data, isLoading } = useFetchSongs();
  const { data: artists, isLoading: isFetchingArtists } = useFetchArtists();
  const {
    state: { activeSong },
  } = useCurrentMusic();
  return (
    <Box
      h={activeSong ? "75dvh" : !user ? "74dvh" : "86dvh"}
      overflow={"auto"}
      className="trend-group"
    >
      <TrendingSection
        title="Trending Songs"
        data={data}
        isLoading={isLoading}
      />
      <TrendingSection
        title="Trending Artists"
        data={artists}
        isLoading={isFetchingArtists}
        type="artist"
      />
    </Box>
  );
};

export default LandingPageAlt;
