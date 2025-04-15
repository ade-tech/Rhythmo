import { Flex, Stack } from "@chakra-ui/react";
import SongContainer from "@/features/tracks/SongContainer";
import { Outlet } from "react-router-dom";
import { useIsSongOpen } from "@/contexts/songContext";
import QueueContainer from "@/features/tracks/queueContainer";

export function MainContainer() {
  const { isShowingQueue } = useIsSongOpen();
  return (
    <Stack h={"full"} w={"full"} overflow={"hidden"}>
      <Flex h={"full"} w={"full"} gap={3}>
        <Stack flex={1} className="bg-darker-overlay" rounded={"lg"}>
          <Outlet />
        </Stack>
        <SongContainer />
        {isShowingQueue && <QueueContainer />}
      </Flex>
    </Stack>
  );
}

export default MainContainer;
