import { Flex, Stack } from "@chakra-ui/react";
import SongContainer from "@/features/tracks/SongContainer";
import { Outlet } from "react-router-dom";

export function MainContainer() {
  return (
    <Stack h={"full"} w={"full"}>
      <Flex h={"full"} w={"full"} gap={3}>
        <Stack flex={1} className="bg-darker-overlay" rounded={"lg"}>
          <Outlet />
        </Stack>
        <SongContainer />
      </Flex>
    </Stack>
  );
}

export default MainContainer;
