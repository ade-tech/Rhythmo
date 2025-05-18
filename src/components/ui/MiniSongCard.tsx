import { useCurrentMusic } from "@/contexts/audioContext";
import { Song } from "@/features/tracks/songType";
import { useFetchSong } from "@/features/tracks/useSong";
import { usePauseMusic, usePlayMusic } from "@/hooks/useAudioControls";
import { Box, Card, GridItem, Image, Spacer, Text } from "@chakra-ui/react";
import { IoMdPlay } from "react-icons/io";
import { IoPause } from "react-icons/io5";
export function MiniSongCard({ song }: { song: Song }) {
  const { data: songs } = useFetchSong(song.id);

  const {
    state: { activeSong, audioStatus },
  } = useCurrentMusic();
  const play = usePlayMusic();
  const pause = usePauseMusic();
  return (
    <GridItem h={10} mb={2}>
      <Card.Root
        flexDirection="row"
        variant={"subtle"}
        color={"white"}
        overflow="hidden"
        alignItems={"center"}
        _hover={{ bg: "gray.800" }}
        bg={"gray.900"}
        gap={2}
        transition="all 0.2s ease-in-out"
        pr={3}
        className="group"
      >
        <Image
          objectFit="cover"
          w={"50px"}
          h={"50px"}
          src={song.cover_url}
          alt="Caffe Latte"
        />
        <Text textStyle={"lg"} fontWeight={"semibold"}>
          {song.artist}
        </Text>
        <Spacer />
        <Box
          as={
            activeSong?.title === song.title && audioStatus === "playing"
              ? IoPause
              : IoMdPlay
          }
          boxSize={7}
          opacity={0}
          visibility="hidden"
          transition="opacity 0.2s ease-in-out"
          cursor={"pointer"}
          _groupHover={{
            opacity: 1,
            visibility: "visible",
            color: "green.600",
          }}
          onClick={() => {
            if (audioStatus === "playing" && activeSong?.title === song.title) {
              pause();
              return;
            }
            play(songs!);
          }}
        />
      </Card.Root>
    </GridItem>
  );
}

export const MiniSongCardPreLoader = () => {
  return (
    <GridItem
      h={"50px"}
      pr={3}
      mb={2}
      bg={"gray.900"}
      animation={"pulse"}
      gap={3}
      display={"flex"}
      alignItems={"center"}
    >
      <Box
        animation={"pulse"}
        w={"50px"}
        h={"50px"}
        rounded={"sm"}
        bg={"gray.800"}
      />
      <Box
        flex={1}
        h={"1/2"}
        animation={"pulse"}
        bg={"gray.800"}
        rounded={"full"}
      />
    </GridItem>
  );
};

export default MiniSongCard;
