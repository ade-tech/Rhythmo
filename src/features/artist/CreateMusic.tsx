/**
 * CreateMusic Component
 *
 * Provides UI for artists to create and upload new music or albums.
 * Includes form controls and visual feedback for the creation process.
 *
 * Usage:
 * - Used in the artist dashboard for music creation workflows.
 */

import { Box, Stack, Text } from "@chakra-ui/react";
import { BiAlbum } from "react-icons/bi";
import { PiMusicNotesPlus } from "react-icons/pi";
import CreateMusicDialog from "./CreateMusicDialog";
import { useCurrentArtist } from "@/contexts/currentArtistContext";
import CreateAlbumDialog from "./CreateAlbumDialog";

const CreateMusic = () => {
  const { currentArtist } = useCurrentArtist();
  return (
    <Box
      w={"full"}
      h={"full"}
      display={"flex"}
      flexDir={"column"}
      gap={3}
      rounded={"lg"}
    >
      <Box
        w={"full"}
        h={48}
        bgSize={"cover"}
        bgPos={"center"}
        rounded={"lg"}
        bgImage={"url('/bgNoise.jpg ')"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        px={8}
      >
        <Stack gap={0}>
          <Text textStyle={"5xl"} fontWeight={"extrabold"}>
            Hello, {currentArtist?.profileInfo?.profiles.nickname},
          </Text>
          <Text textStyle={"xl"} fontWeight={"semibold"}>
            What are you creating today?
          </Text>
        </Stack>
      </Box>
      <Box
        flex={1}
        display={"flex"}
        gap={2}
        h={"full"}
        pr={2}
        pl={1}
        justifyContent={"space-between"}
      >
        <CreateMusicDialog
          title="Upload a song"
          icon={PiMusicNotesPlus}
          description="Add your latest track to Rhythmo so listeners can enjoy it instantly."
        />
        <CreateAlbumDialog
          title="Create an ablum"
          icon={BiAlbum}
          description="Group multiple songs together into a themed collection or project."
        />
      </Box>
    </Box>
  );
};

export default CreateMusic;
