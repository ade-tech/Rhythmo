import { Box, Grid, HStack } from "@chakra-ui/react";
import Filter from "./Filter";
import MiniSongCard from "./MiniSongCard";
import TrendingSection from "./TrendingSection";

const TrendingContainer = () => {
  return (
    <Box h={"75dvh"} overflow={"auto"} className="trend-group">
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
      <TrendingSection />
      <TrendingSection />
    </Box>
  );
};

export default TrendingContainer;
