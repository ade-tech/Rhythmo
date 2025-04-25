import { Box, Button, Text } from "@chakra-ui/react";

const EmptyLibrary = () => {
  return (
    <Box
      h={"fit"}
      px={5}
      py={5}
      bg={"gray.800"}
      rounded={"lg"}
      gap={3}
      display={"flex"}
      flexDir={"column"}
    >
      <Text textStyle={"lg"} fontWeight={"extrabold"}>
        Create your first Playlist
      </Text>
      <Text textStyle={"sm"} lineHeight={1.25}>
        it's easy, create and share your playlist with your friends
      </Text>
      <Button rounded={"full"} size={"sm"}>
        Create Playlist
      </Button>
    </Box>
  );
};

export default EmptyLibrary;
