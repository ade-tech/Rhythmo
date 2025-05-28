import { Box, Image, Spacer, Stack, Text } from "@chakra-ui/react";

const ArtistSongItem = () => {
  return (
    <Box pos={"relative"} w={"full"} h={"12rem"}>
      <Image
        src="/Asake-–-Mr-Money-With-The-Vibe-EP.webp"
        w={"full"}
        h={"full"}
        objectFit={"cover"}
        objectPosition={"center"}
        rounded={"lg"}
        color={"white"}
      />
      <Box
        w={"full"}
        display={"flex"}
        h={"3/5"}
        pos={"absolute"}
        bottom={0}
        bgGradient={"to-b"}
        gradientFrom={"blackAlpha.50/10"}
        gradientVia={"blackAlpha.700"}
        gradientTo={"black"}
        alignItems={"flex-end"}
        roundedBottom={"md"}
        pb={4}
        px={5}
      >
        <Stack gap={0} h={"fit"}>
          <Text
            lineHeight={1}
            textStyle={"xl"}
            fontWeight={"bold"}
            letterSpacing={0.8}
          >
            Organise
          </Text>
          <Text textStyle={"xs"} color={"gray.300"} lineHeight={1}>
            Vibes and Peace
          </Text>
        </Stack>
        <Spacer />
        <Stack gap={0} alignItems={"center"}>
          <Text textStyle={"md"} fontWeight={"bold"} color={"white"}>
            125.3K
          </Text>
          <Text textStyle={"2xs"} color={"gray.300"} lineHeight={1}>
            Streams
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default ArtistSongItem;
