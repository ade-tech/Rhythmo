import { Box } from "@chakra-ui/react";
import LibraryHeader from "./LibraryHeader";
import PlaylistShort from "@/components/ui/PlaylistShort";

export function LibraryContainer() {
  return (
    <Box className="bg-darker-overlay" h={"full"} rounded={"lg"} pt={5} px={5}>
      <LibraryHeader />
      <PlaylistShort type="album" title="Motigbana" artistName="Olamide" />

      <PlaylistShort type="playlist" title="Love it" artistName="Olamide" />
      <PlaylistShort
        type="album"
        title="Mofesa"
        artistName="Kulapo"
        avatar="https://swjwzsoqbpfsivdzudfx.supabase.co/storage/v1/object/public/Temp//0x1900-000000-80-0-0.png"
      />
    </Box>
  );
}

export default LibraryContainer;
