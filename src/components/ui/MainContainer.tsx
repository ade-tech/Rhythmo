import { Flex, Stack } from "@chakra-ui/react";
import SongContainer from "@/features/tracks/SongContainer";
import { Outlet } from "react-router-dom";
import QueueContainer from "@/features/tracks/QueueContainer";

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
