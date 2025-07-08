/**
 * OtherSongs Component
 *
 * Renders a compact card for an artist's other songs, typically used in a list of top or recent tracks.
 *
 * Usage:
 * - Used in the artist dashboard or stats section to display additional songs.
 */

import { Box, Image, Spacer, Stack, Text } from "@chakra-ui/react";

const OtherSongs = () => {
  return (
    <Box
      w={"full"}
      h={20}
      px={4}
      py={1}
      gap={3}
      display={"flex"}
      alignItems={"center"}
      bg={"gray.900"}
      rounded={"lg"}
    >
      <Image src="/musicfallback.png" h={"4/5"} rounded={"md"} />
      <Stack gap={0} h={"fit"}>
        <Text
          lineHeight={1}
          textStyle={"xl"}
          fontWeight={"bold"}
          letterSpacing={0.8}
        >
          Motigbana
        </Text>
        <Text textStyle={"xs"} color={"gray.400"} lineHeight={1}>
          On the Earth
        </Text>
      </Stack>
      <Spacer />
      <Text textStyle={"xl"} fontWeight={"bold"} color={"green.500"}>
        #2
      </Text>
    </Box>
  );
};

export default OtherSongs;
