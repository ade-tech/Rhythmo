import { Flex, Stack } from "@chakra-ui/react";
import SongContainer from "@/features/tracks/SongContainer";
import { Outlet } from "react-router-dom";
import QueueContainer from "@/features/tracks/QueueContainer";

/**
 * MainContainer Component
 *
 * Serves as the main content area of the app.
 * Displays the primary view for the current route (e.g., trending, track, album, playlist).
 *
 * Usage:
 * - Used as the main section in the app's grid layout.
 */

export function MainContainer() {
  return (
    <Stack h={"full"} w={"full"} overflow={"hidden"}>
      <Flex h={"full"} w={"full"} gap={3}>
        <Stack flex={1} className="bg-darker-overlay" rounded={"lg"}>
          <Outlet />
        </Stack>
        <SongContainer />
        <QueueContainer />
      </Flex>
    </Stack>
  );
}

export default MainContainer;
