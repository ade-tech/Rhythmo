import { Box, HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import TopSong from "./TopSong";
import OtherSongs from "./OtherSongs";
import { HiOutlineFilter } from "react-icons/hi";

const SongStats = () => {
  return (
    <Stack bg={"gray.950"} rounded={"lg"} px={4} pb={4}>
      <HStack
        mb={1}
        px={2}
        pos={"sticky"}
        w={"full"}
        top={0}
        bg={"gray.950"}
        pt={4}
        pb={3}
        color={"white"}
        zIndex={100}
      >
        <Text
          ml={2}
          textStyle={"2xl"}
          color={"white"}
          transitionDuration={"200ms"}
          fontWeight={"bold"}
        >
          Top Tracks
        </Text>
        <Spacer />
        <Box
          as={HiOutlineFilter}
          boxSize={10}
          rounded={"full"}
          borderWidth={"1px"}
          p={2}
        />
      </HStack>
      <TopSong />
      <OtherSongs />
    </Stack>
  );
};

export default SongStats;
