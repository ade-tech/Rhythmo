import { Flex, Stack } from "@chakra-ui/react";
import SongContainer from "@/features/tracks/SongContainer";
import { Outlet } from "react-router-dom";
import OpenSongProvider from "@/contexts/songContext";

export function MainContainer() {
  return (
    <Stack h={"full"} w={"full"} overflow={"hidden"}>
      <OpenSongProvider>
        <Flex h={"full"} w={"full"} gap={3}>
          <Stack flex={1} className="bg-darker-overlay" rounded={"lg"}>
            <Outlet />
          </Stack>
          <SongContainer />
        </Flex>
      </OpenSongProvider>
    </Stack>
  );
}

export default MainContainer;
