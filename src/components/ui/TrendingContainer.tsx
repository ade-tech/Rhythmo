import { Box, Grid, HStack, Stack, Text } from "@chakra-ui/react";
import Filter from "./Filter";
import MiniSongCard from "./MiniSongCard";
import SongItem from "./SongItem";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const TrendingContainer = () => {
  return (
    <Box h={"75dvh"} overflow={"hidden"} _hover={{ overflow: "auto" }}>
      <HStack
        mb={1}
        px={2}
        pos={"sticky"}
        w={"full"}
        top={0}
        bg={"#111112"}
        pt={4}
        pl={6}
        pb={3}
        zIndex={10}
      >
        <Filter filterValues={["All", "Quran", "Islamic Music"]} />
      </HStack>
      <Grid
        templateColumns={"repeat(2, 1fr)"}
        mb={3}
        gap={2}
        mx={"auto"}
        w={"5/6"}
      >
        <MiniSongCard />
        <MiniSongCard />
        <MiniSongCard />
        <MiniSongCard />
      </Grid>
      <Stack px={6} mt={8} w={"41rem"} overflow={"auto"} position={"relative"}>
        <Text textStyle={"2xl"} fontWeight={"semibold"}>
          Trending Poems
        </Text>
        <Stack
          h={"90%"}
          bottom={0}
          w={24}
          zIndex={10}
          position={"absolute"}
          alignItems={"center"}
          justifyContent={"center"}
          bgGradient={"to-r"}
          gradientFrom={"gray.950"}
          gradientTo={"#0f0e0e00"}
        >
          <Box
            as={IoIosArrowBack}
            boxSize={8}
            p={1.5}
            border={"1px solid #4e4e4e"}
            bg={"gray.800"}
            borderRadius={"full"}
            color={"gray.400"}
          />
        </Stack>
        <Stack
          direction={"row"}
          w={"38rem"}
          overflowX={"scroll"}
          gap={1}
          position={"relative"}
        >
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
        </Stack>
        <Stack
          h={"90%"}
          bottom={0}
          right={6}
          w={24}
          zIndex={10}
          position={"absolute"}
          alignItems={"center"}
          justifyContent={"center"}
          bgGradient={"to-l"}
          gradientFrom={"gray.950"}
          gradientTo={"#0f0e0e00"}
        >
          <Box
            as={IoIosArrowForward}
            boxSize={8}
            p={1.5}
            border={"1px solid #4e4e4e"}
            bg={"gray.800"}
            borderRadius={"full"}
            color={"gray.400"}
          />
        </Stack>
      </Stack>
      <Stack px={6} mt={8} w={"41rem"} overflow={"auto"} position={"relative"}>
        <Text textStyle={"2xl"} fontWeight={"semibold"}>
          Trending Poems
        </Text>
        <Stack
          h={"90%"}
          bottom={0}
          w={24}
          zIndex={10}
          position={"absolute"}
          alignItems={"center"}
          justifyContent={"center"}
          bgGradient={"to-r"}
          gradientFrom={"gray.950"}
          gradientTo={"#0f0e0e00"}
        >
          <Box
            as={IoIosArrowBack}
            boxSize={8}
            p={1.5}
            border={"1px solid #4e4e4e"}
            bg={"gray.800"}
            borderRadius={"full"}
            color={"gray.400"}
          />
        </Stack>
        <Stack
          direction={"row"}
          w={"38rem"}
          overflowX={"scroll"}
          gap={1}
          position={"relative"}
        >
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
          <SongItem />
        </Stack>
        <Stack
          h={"90%"}
          bottom={0}
          right={6}
          w={24}
          zIndex={10}
          position={"absolute"}
          alignItems={"center"}
          justifyContent={"center"}
          bgGradient={"to-l"}
          gradientFrom={"gray.950"}
          gradientTo={"#0f0e0e00"}
        >
          <Box
            as={IoIosArrowForward}
            boxSize={8}
            p={1.5}
            border={"1px solid #4e4e4e"}
            bg={"gray.800"}
            borderRadius={"full"}
            color={"gray.400"}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default TrendingContainer;
