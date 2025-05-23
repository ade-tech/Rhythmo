import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlayPause } from "./PlayPause";
import { useFetchSong } from "@/features/tracks/useSong";
import { Artist } from "@/features/artist/artistTypes";

type ArtistItemProps = {
  isOpen: boolean;
  data: Artist;
};

export function ArtistItem({ isOpen, data }: ArtistItemProps) {
  const { data: songs } = useFetchSong(data.user_id);
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
      mb={5}
    >
      <Stack pos={"relative"} className="group">
        <Image
          src={data.profiles.avatar_url}
          borderRadius={"full"}
          h={"135px"}
        />
        <PlayPause data={songs!} />
      </Stack>
      <Stack gap={0} flexShrink={0}>
        <Link to={`/artist/${data.user_id}`}>
          <Text
            fontWeight={"bold"}
            textAlign={"center"}
            textStyle={"lg"}
            _hover={{ textDecoration: "underline" }}
          >
            {data.profiles.nickname}
          </Text>
        </Link>
      </Stack>
    </Stack>
  );
}

export const ArtistItemPreLoader = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Stack
      flexBasis={isOpen ? "1/4" : "1/6"}
      flexShrink={0}
      h={"fit"}
      px={3}
      transition={"background 0.2s ease-in"}
      py={3}
      gap={2}
      bg={"gray.900"}
      borderRadius={"md"}
    >
      <Box
        w={"full"}
        h={"8rem"}
        bg={"gray.800"}
        animation={"pulse"}
        rounded={"full"}
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

export default ArtistItem;
