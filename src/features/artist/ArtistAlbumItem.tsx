import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";

const ArtistAlbumItem = () => {
  return (
    <Box pos={"relative"} w={"full"} h={"12rem"}>
      <Image
        src="https://zgfhsczbfiisjubssmfb.supabase.co/storage/v1/object/public/songcover//Seyi-Vibez-Children-Of-Africa-EP.png"
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
        flexDir={"column"}
        h={"4/5"}
        pos={"absolute"}
        bottom={0}
        justifyContent={"flex-end"}
        bgGradient={"to-b"}
        gradientFrom={"blackAlpha.50/10"}
        gradientVia={"blackAlpha.700"}
        gradientTo={"black"}
        roundedBottom={"md"}
        gap={1}
        pb={4}
        px={5}
      >
        <Stack gap={0} h={"fit"}>
          <Text lineHeight={1} fontWeight={"bold"} letterSpacing={0.8}>
            Children of Africa
          </Text>
        </Stack>
        <HStack gap={2}>
          <Box gap={1} alignItems={"center"} display={"flex"}>
            <Text textStyle={"md"} fontWeight={"bold"} color={"white"}>
              13
            </Text>
            <Text textStyle={"2xs"} color={"gray.300"} lineHeight={1}>
              Songs
            </Text>
          </Box>
          <Box gap={1} alignItems={"center"} display={"flex"}>
            <Text textStyle={"md"} fontWeight={"bold"} color={"white"}>
              134.5K
            </Text>
            <Text textStyle={"2xs"} color={"gray.300"} lineHeight={1}>
              Streams
            </Text>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default ArtistAlbumItem;
