import { Box, HStack } from "@chakra-ui/react";
import Filter from "./Filter";
import TrendingSection from "./TrendingSection";
import TrendingTopItems from "./TrendingTopItems";

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
      <TrendingTopItems />

      <TrendingSection />
      <TrendingSection />
    </Box>
  );
};

export default TrendingContainer;
