/**
 * Home Component
 *
 * Main landing page for authenticated and unauthenticated users.
 * Handles layout, navigation, and conditional rendering based on user/artist state.
 *
 * Usage:
 * - Used as the root route for the app, rendering the main dashboard and content.
 *
 * - Redirects to the artist dashboard if the current user is an artist (i.e., has a profileInfo in currentArtist).
 * - Renders the main app layout, including the top menu, library, main content, and currently playing track.
 * - Adjusts the height of the main grid based on whether a song is playing or a user is authenticated.
 * - Displays a sign-up call-to-action if there is no current user or the profileInfo is a string (i.e., not loaded or invalid).
 *
 * Layout:
 * - Uses Chakra UI's Box, Stack, Grid, and GridItem for responsive layout.
 * - The main grid is split into two sections: LibraryContainer (sidebar) and MainContainer (main content).
 * - ActivelyPlayinTack is rendered below the grid to show the currently playing track.
 * - SignUpCTA is conditionally rendered for unauthenticated users.
 *
 * Context:
 * - Uses useCurrentMusic for music state (e.g., activeSong).
 * - Uses useCurrentUser and useCurrentArtist for authentication and profile state.
 *
 * Navigation:
 * - Uses React Router's Navigate to redirect artists to the artist dashboard.
 */

import { Box, Grid, GridItem, Spacer, Stack } from "@chakra-ui/react";
import TopMenu from "./TopMenu";
import LibraryContainer from "@/features/user/library/LibraryContainer";
import MainContainer from "./MainContainer";
import ActivelyPlayinTack from "@/features/tracks/ActivelyPlayinTack";
import { useCurrentMusic } from "@/contexts/audioContext";
import SignUpCTA from "./SignUpCTA";
import { useCurrentUser } from "@/contexts/currentUserContext";
import { useCurrentArtist } from "@/contexts/currentArtistContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { state } = useCurrentMusic();
  const { currentUser } = useCurrentUser();
  const { currentArtist } = useCurrentArtist();

  // Redirect to artist dashboard if the current user is an artist
  if (currentArtist?.profileInfo) return <Navigate to={"/artist"} />;

  return (
    <Box bg="black" w="100vw" h="100dvh">
      <Stack w="100vw" h="100dvh">
        <TopMenu />
        <Grid
          h={state.activeSong ? "75dvh" : !currentUser ? "74dvh" : "86dvh"}
          templateColumns="repeat(4, 1fr)"
          gap={3}
          px={3}
          overflow={"hidden"}
        >
          <GridItem colSpan={1}>
            <LibraryContainer />
          </GridItem>
          <GridItem colSpan={3}>
            <MainContainer />
          </GridItem>
        </Grid>
        <ActivelyPlayinTack />
        <Spacer />
        {(!currentUser || typeof currentUser?.profileInfo === "string") && (
          <SignUpCTA />
        )}
      </Stack>
    </Box>
  );
};

export default Home;
