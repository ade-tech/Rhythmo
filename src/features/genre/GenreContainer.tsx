import { Box, Grid, GridItem, HStack, Image, Text } from "@chakra-ui/react";

export function GenreContainer() {
  return (
    <Box w={"full"} h={"full"} py={10} px={6}>
      <Text textStyle={"3xl"} fontWeight={"bold"}>
        Browse all
      </Text>
      <Grid templateColumns={"repeat(2, 1fr)"} p={5} gap={2} mt={5}>
        <GridItem m={2}>
          <HStack
            w={"full"}
            h={"10rem"}
            rounded={"md"}
            bg={"#DC148C"}
            py={6}
            px={6}
            alignItems={"flex-start"}
            pos={"relative"}
            overflow={"hidden"}
          >
            <Text textStyle={"3xl"} fontWeight={"bold"}>
              Music
            </Text>
            <Image
              src="/Music.png"
              w={"130px"}
              rotate={"25deg"}
              top={12}
              rounded={"md"}
              right={-5}
              pos={"absolute"}
            />
          </HStack>
        </GridItem>
        <GridItem m={2}>
          <HStack
            w={"full"}
            h={"10rem"}
            rounded={"md"}
            bg={"#477D95"}
            py={6}
            px={6}
            alignItems={"flex-start"}
            pos={"relative"}
            overflow={"hidden"}
          >
            <Text textStyle={"3xl"} fontWeight={"bold"}>
              Podcast
            </Text>
            <Image
              src="/Podcast.jpg"
              w={"130px"}
              rotate={"25deg"}
              top={12}
              rounded={"md"}
              right={-5}
              pos={"absolute"}
            />
          </HStack>
        </GridItem>
        <GridItem m={2}>
          <HStack
            w={"full"}
            h={"10rem"}
            rounded={"md"}
            bg={"#0D73EC"}
            py={6}
            px={6}
            alignItems={"flex-start"}
            pos={"relative"}
            overflow={"hidden"}
          >
            <Text textStyle={"3xl"} fontWeight={"bold"}>
              Trending
            </Text>
            <Image
              src="/Music.png"
              w={"130px"}
              rotate={"25deg"}
              top={12}
              rounded={"md"}
              right={-5}
              pos={"absolute"}
            />
          </HStack>
        </GridItem>
        <GridItem m={2}>
          <HStack
            w={"full"}
            h={"10rem"}
            rounded={"md"}
            bg={"#1E3264"}
            py={6}
            px={6}
            alignItems={"flex-start"}
            pos={"relative"}
            overflow={"hidden"}
          >
            <Text textStyle={"3xl"} fontWeight={"bold"}>
              Trending
            </Text>
            <Image
              src="/New.png"
              w={"130px"}
              rotate={"25deg"}
              top={12}
              rounded={"md"}
              right={-5}
              pos={"absolute"}
            />
          </HStack>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default GenreContainer;
