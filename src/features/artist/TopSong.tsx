import { Box, Image, Spacer, Stack, Text } from "@chakra-ui/react";

const TopSong = () => {
  return (
    <Box pos={"relative"}>
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
        h={"1/2"}
        pos={"absolute"}
        bottom={0}
        bgGradient={"to-b"}
        gradientFrom={"blackAlpha.50/10"}
        gradientVia={"blackAlpha.800"}
        gradientTo={"blackAlpha.900"}
        alignItems={"flex-end"}
        roundedBottom={"md"}
        pb={5}
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
          <Text textStyle={"xs"} color={"gray.400"} lineHeight={1}>
            Vibes and Peace
          </Text>
        </Stack>
        <Spacer />
        <Text textStyle={"2xl"} fontWeight={"bold"} color={"green.500"}>
          #1
        </Text>
      </Box>
    </Box>
  );
};

export default TopSong;
