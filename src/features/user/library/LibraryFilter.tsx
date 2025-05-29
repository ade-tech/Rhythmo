/**
 * @file src/features/user/library/LibraryFilter.tsx
 * @description Contains the LibraryFilter component, which provides filtering options for the user's library content.
 * This component allows users to filter their library by various criteria such as genre, artist, or playlist.
 */

import { Button, ButtonGroup, HStack } from "@chakra-ui/react";

/**
 * LibraryFilter Component
 *
 * Provides filtering options for the user's music library.
 * Allows users to filter songs, albums, or playlists by various criteria.
 *
 * Usage:
 * - Used within LibraryContainer to filter displayed items.
 */

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
