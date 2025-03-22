import { Flex, Stack } from "@chakra-ui/react";
import MainOutlet from "./MainOutlet";
import SongContainer from "@/features/tracks/SongContainer";

export function MainContainer() {
  return (
    <Stack h={"full"} w={"full"}>
      <Flex h={"full"} w={"full"} gap={3}>
        <MainOutlet size="1" />
        <SongContainer />
      </Flex>
    </Stack>
  );
}

export default MainContainer;
