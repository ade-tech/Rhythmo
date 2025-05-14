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

  if (typeof currentUser?.profileInfo === "string")
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
        />
      ))}
    </Box>
  );
}

export default LibraryContainer;
