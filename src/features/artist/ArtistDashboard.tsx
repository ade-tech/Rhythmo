/**
 * ArtistDashboard Component
 *
 * Main dashboard view for artists, summarizing stats, music, and recent activity.
 *
 * Usage:
 * - Used as the landing page for the artist dashboard route.
 */

import { Box, HStack, Spacer, Text } from "@chakra-ui/react";
import MoneyStat from "./MoneyStat";
import OtherStat from "./OtherStats";
import Filter from "@/components/ui/Filter";
import { useState } from "react";

export function ArtistDashboard() {
  const [filterValue, setFilterValue] = useState<string | null>("This Month");
  return (
    <Box display={"flex"} w={"full"} h={"full"} flexDir={"column"}>
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
          Quick Stats
        </Text>
        <Spacer />
        <Box w={"2/4"}>
          <Filter
            filterValues={["This Month", "last 7 Days", "last 90 Days"]}
            filterState={filterValue}
            filterUpdate={setFilterValue}
            defaultValue={"This Month"}
          />
        </Box>
      </HStack>
      <Box
        flex={1}
        display={"grid"}
        w={"full"}
        gridTemplateColumns="repeat(3, 1fr)"
        gridTemplateRows={"1fr 1fr"}
        gap={3}
      >
        <MoneyStat title="Expected Earnings" curFilter={filterValue} />
        <OtherStat title="Total Streams" curFilter={filterValue} />
        <OtherStat title="Total Likes" curFilter={filterValue} />
        <OtherStat title="Total Followers" curFilter={filterValue} />
        <OtherStat
          title="Fan Demographics"
          curFilter={filterValue}
          type="chart"
        />
      </Box>
    </Box>
  );
}

export default ArtistDashboard;
