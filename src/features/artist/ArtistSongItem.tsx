import { Box, IconButton, Image, Spacer, Stack, Text } from "@chakra-ui/react";
import { Song } from "../tracks/songType";
import { HiPencil } from "react-icons/hi";
import EditSong from "../tracks/EditSong";

/**
 * ArtistSongItem Component
 *
 * Represents a single song in the artist's song list.
 * Displays song title, cover art, and controls for editing or removing the song.
 *
 * Usage:
 * - Used within ArtistSongs to show each song in the Singles or Featured tabs.
 */

const ArtistSongItem = ({ data }: { data: Song }) => {
  return (
    <Box pos={"relative"} w={"full"} h={"12rem"} className="group">
      <EditSong
        SongInformation={data}
        ButtonContent={
          <IconButton
            pos={"absolute"}
            size={"xs"}
            rounded={"full"}
            color={"gray.900"}
            bg={"white"}
            right={4}
            top={4}
            visibility={"hidden"}
            transition={"0.2s ease-in"}
            opacity={"0"}
            _groupHover={{ visibility: "visible", opacity: 1 }}
          >
            <HiPencil />
          </IconButton>
        }
      />
      <Image
        src={data?.cover_url}
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
        h={"3/5"}
        pos={"absolute"}
        bottom={0}
        bgGradient={"to-b"}
        gradientFrom={"blackAlpha.50/10"}
        gradientVia={"blackAlpha.700"}
        gradientTo={"black"}
        alignItems={"flex-end"}
        roundedBottom={"md"}
        pb={4}
        px={5}
      >
        <Stack gap={0} h={"fit"}>
          <Text
            lineHeight={1}
            textStyle={"xl"}
            fontWeight={"bold"}
            letterSpacing={0.8}
          >
            {data.title}
          </Text>
          <Text textStyle={"xs"} color={"gray.300"} lineHeight={1}>
            {data.album}
          </Text>
        </Stack>
        <Spacer />
        <Stack gap={0} alignItems={"center"}>
          <Text textStyle={"md"} fontWeight={"bold"} color={"white"}>
            {Intl.NumberFormat().format(data.play_count)}
          </Text>
          <Text textStyle={"2xs"} color={"gray.300"} lineHeight={1}>
            Streams
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default ArtistSongItem;
