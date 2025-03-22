import { Button, ButtonGroup, HStack } from "@chakra-ui/react";

const LibraryFilter = () => {
  return (
    <HStack w={"full"} gap={2} mb={3}>
      <ButtonGroup size={"sm"} variant={"subtle"} color={"white"}>
        <Button
          rounded={"full"}
          color={"white"}
          value={"Artists"}
          bg={"gray.900"}
        >
          Artists
        </Button>
        <Button
          rounded={"full"}
          color={"white"}
          value={"Album"}
          bg={"gray.900"}
        >
          Albums
        </Button>
        <Button
          rounded={"full"}
          color={"white"}
          value={"Playlist"}
          bg={"gray.900"}
        >
          Playlists
        </Button>
      </ButtonGroup>
    </HStack>
  );
};

export default LibraryFilter;
