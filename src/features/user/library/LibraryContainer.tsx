/**
 * @file src/features/user/library/LibraryContainer.tsx
 * @description Contains the LibraryContainer component, which manages and displays the user's music library.
 * This component is responsible for rendering the user's saved tracks, albums, and playlists, and handling library interactions.
 *
 * LibraryContainer Component
 *
 * Main container for the user's music library.
 * Displays a list of songs, albums, or playlists based on user selection.
 * Integrates LibraryHeader and LibraryFilter for navigation and filtering.
 *
 * Usage:
 * - Used as the sidebar or main section for the user's library in the app layout.
 */

import { Box, Image, Text } from "@chakra-ui/react";
import LibraryHeader from "./LibraryHeader";
import PlaylistShort from "@/components/ui/PlaylistShort";
import Filter from "@/components/ui/Filter";
import EmptyLibrary from "./EmptyLibrary";
import { useCurrentUser } from "@/contexts/currentUserContext";
import { useFetchPlaylists } from "@/features/playlist/usePlaylist";
import { useState } from "react";

export function LibraryContainer() {
  const [filterState, setFilteredState] = useState<string | null>(null);
  const { currentUser } = useCurrentUser();
  const { data, isLoading, error } = useFetchPlaylists(currentUser?.data?.id!);

  if (
    !currentUser?.data ||
    typeof currentUser?.profileInfo === "string" ||
    data?.length! < 1
  )
    return (
      <Box
        className="bg-darker-overlay"
        h={"full"}
        rounded={"lg"}
        pt={5}
        px={5}
      >
        <LibraryHeader />
        <EmptyLibrary />
      </Box>
    );

  if (isLoading)
    return (
      <Box
        w={"full"}
        h={"full"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        className="bg-darker-overlay"
        rounded={"lg"}
      >
        <Image src="/Rhythmo.svg" w={"4rem"} animation={"bounce"} />
      </Box>
    );

  if (!isLoading && error)
    return (
      <Box
        className="bg-darker-overlay"
        h={"full"}
        rounded={"lg"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text>We could not fetch the Playlists</Text>
      </Box>
    );
  return (
    <Box className="bg-darker-overlay" h={"full"} rounded={"lg"} pt={5} px={5}>
      <LibraryHeader />
      <Filter
        filterValues={["artists", "albums", "playlist"]}
        filterState={filterState}
        filterUpdate={setFilteredState}
      />
      {data?.map((curPlaylist) => (
        <PlaylistShort
          key={curPlaylist.playlist_id}
          type="playlist"
          title={curPlaylist.name}
          link={`/album/${curPlaylist.playlist_id}`}
          playlistID={curPlaylist.playlist_id!}
          avatar={curPlaylist.cover_url}
        />
      ))}
    </Box>
  );
}

export default LibraryContainer;
