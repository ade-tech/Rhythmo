import { Box } from "@chakra-ui/react";
import Filter from "./Filter";

const TrendingContainer = () => {
  return (
    <Box h={"full"}>
      <Box w={"full"} className="bg-darker-overlay" zIndex={10} px={5} py={6}>
        <Filter filterValues={["All", "Quran", "Islamic Poems"]} />
      </Box>
    </Box>
  );
};

export default TrendingContainer;
