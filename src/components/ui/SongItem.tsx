/**
 * SongItem Component
 *
 * Renders a card or row for a song, showing cover art, title, and play controls.
 * Handles play/pause actions and sign-in prompts for unauthenticated users.
 *
 * Usage:
 * - Used in trending, playlist, and album song lists.
 */

import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { Song } from "@/features/tracks/songType";
import { Link } from "react-router-dom";
import { PlayPause } from "./PlayPause";
import { useFetchSong } from "@/features/tracks/useSong";
import SongDialog from "./SongDialog";
import { useCurrentUser } from "@/contexts/currentUserContext";

type songItemProps = {
  isOpen: boolean;
  data: Song;
};

export function SongItem({ isOpen, data }: songItemProps) {
  const { currentUser } = useCurrentUser();
  const { data: songs } = useFetchSong(data.id);
  return (
    <Stack
      flexBasis={isOpen ? "1/4" : "1/6"}
      flexShrink={0}
      h={"fit"}
      px={3}
      transition={"background 0.2s ease-in"}
      _hover={{ bg: "gray.800" }}
      color={"white"}
      py={3}
      borderRadius={"md"}
    >
      <Stack pos={"relative"} className="group">
        <Image
          src={data.cover_url}
          borderRadius={"md"}
          w={"full"}
          objectFit={"cover"}
          objectPosition={"top"}
          h={"8rem"}
        />
        {currentUser?.data && <PlayPause data={songs} />}

        {(currentUser?.data === null || currentUser?.data === undefined) && (
          <SongDialog
            triggerButton={<PlayPause data={songs} />}
            triggerSongImage={data.cover_url}
            triggerSongColor={data.prominent_color}
          />
        )}
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
        <Link to={`/artists/${data.artist_id}`}>
          <Text
            color={"gray.400"}
            fontWeight={"semibold"}
            _hover={{ textDecoration: "underline" }}
          >
            {data.artist}
          </Text>
        </Link>
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
