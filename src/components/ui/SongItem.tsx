import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { Song } from "@/features/tracks/songType";
import { Link } from "react-router-dom";
import { PlayPause } from "./PlayPause";
import { useFetchSong } from "@/features/tracks/useSong";

type songItemProps = {
  isOpen: boolean;
  data: Song;
};

export function SongItem({ isOpen, data }: songItemProps) {
  const { data: songs } = useFetchSong(data.id);
  return (
    <Stack
      flexBasis={isOpen ? "1/4" : "1/6"}
      flexShrink={0}
      h={"fit"}
      px={3}
      transition={"background 0.2s ease-in"}
      _hover={{ bg: "gray.800" }}
      py={3}
      borderRadius={"md"}
    >
      <Stack pos={"relative"} className="group">
        <Image src={data.cover_url} borderRadius={"md"} />
        <PlayPause data={songs!} />
      </Stack>
      <Stack gap={0} flexShrink={0}>
        <Link to={`/track/${data.id}`}>
          <Text
            fontWeight={"bold"}
            textStyle={"lg"}
            _hover={{ textDecoration: "underline" }}
          >
            {data.title}
          </Text>
        </Link>

        <Text color={"gray.400"} fontWeight={"semibold"}>
          {data.artist}
        </Text>
      </Stack>
    </Stack>
  );
}

export const SongItemPreLoader = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Stack
      flexBasis={isOpen ? "1/4" : "1/6"}
      flexShrink={0}
      h={"fit"}
      px={3}
      transition={"background 0.2s ease-in"}
      _hover={{ bg: "gray.800" }}
      py={3}
      borderRadius={"md"}
    >
      <Box
        w={"full"}
        h={"8rem"}
        bg={"gray.800"}
        animation={"pulse"}
        rounded={"md"}
      />
      <Box
        w={"3/4"}
        h={"1rem"}
        rounded={"full"}
        bg={"gray.800"}
        animation={"pulse"}
      />
      <Box
        w={"1/2"}
        h={"0.5rem"}
        rounded={"full"}
        bg={"gray.800"}
        animation={"pulse"}
      />
    </Stack>
  );
};

export default SongItem;
