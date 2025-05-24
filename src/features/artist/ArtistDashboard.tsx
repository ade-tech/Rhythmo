import { Box, Text } from "@chakra-ui/react";
import StatItem from "./StatItem";

export function ArtistDashboard() {
  return (
    <Box
      display={"grid"}
      w={"full"}
      h={"full"}
      gridTemplateColumns="repeat(3, 1fr)"
      gap={3}
    >
      <StatItem />
      <Text> Heyy</Text>
      <Text> Heyy</Text>
      <Text> Heyy</Text>
      <Text> Heyy</Text>
      <Text> Heyy</Text>
    </Box>
  );
}

export default ArtistDashboard;
