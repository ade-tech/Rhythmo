import { Box, Image, Text } from "@chakra-ui/react";

/**
 * TotalEmpty Component
 *
 * Displays a placeholder message and illustration when there are no songs or content to show.
 *
 * Usage:
 * - Used in library, playlist, and trending views when the data set is empty.
 */

const TotalEmpty = () => {
  return (
    <Box
      w={"full"}
      h={"full"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Image src="/musicFilled.svg" w={32} />
      <Text textStyle={"5xl"} fontWeight={"semibold"} color={"gray.400"}>
        No songs yet
      </Text>
      <Text mt={2}>When songs drop, they’ll show up here. Stay tuned.</Text>
    </Box>
  );
};

export default TotalEmpty;
