import { getSingMusicDuration } from "@/utils/MusicDuration";
import { Avatar, Box, IconButton, Stack, Table, Text } from "@chakra-ui/react";
import { InlinePlayPause } from "./PlayPause";
import { useCurrentMusic } from "@/contexts/audioContext";
import { GiMusicalNotes } from "react-icons/gi";
import IconWithTooltip from "./IconWithTooltip";
import { HiMinus } from "react-icons/hi";
import { Song } from "@/features/tracks/songType";
import { useRemoveSongFromPlaylist } from "@/features/playlist/usePlaylist";
import { Playlist } from "@/features/playlist/playlistType";
import { toaster } from "./toaster";

interface MusicRowProps {
  index: number;
  song: Song;
  playlist?: Playlist;
}
export default function MusicRow({ song, index, playlist }: MusicRowProps) {
  const {
    state: { activeSong },
  } = useCurrentMusic();
  const { mutate, isPending } = useRemoveSongFromPlaylist();
  return (
    <Table.Row bg={"transparent"} _hover={{ bg: "gray.900" }} className="group">
      <Table.Cell borderBottom={"none"} w={20}>
        <Box display={"none"} _groupHover={{ display: "inline-block" }}>
          <InlinePlayPause song={song} />
        </Box>
        {activeSong?.id === song.id ? (
          <Box
            _groupHover={{ display: "none" }}
            as={GiMusicalNotes}
            boxSize={5}
            color={"green.500"}
          />
        ) : (
          <Text _groupHover={{ display: "none" }}> {index + 1}</Text>
        )}
      </Table.Cell>
      <Table.Cell borderBottom={"none"} display={"flex"} gap={2}>
        <Avatar.Root shape={"rounded"} size={"sm"}>
          <Avatar.Image src={song.cover_url} />
        </Avatar.Root>
        <Stack gap={0}>
          <Text textStyle={"md"} fontWeight={"bold"} lineHeight={1.1}>
            {song.title}
          </Text>
          <Text textStyle={"sm"} fontWeight={"medium"} color={"gray.400"}>
            {song.artist}
          </Text>
        </Stack>
      </Table.Cell>
      <Table.Cell borderBottom={"none"} fontWeight={"bold"}>
        {song.play_count.toLocaleString()}
      </Table.Cell>
      <Table.Cell
        borderBottom={"none"}
        color={"gray.400"}
        alignItems={"center"}
      >
        <Text ml={2}>{getSingMusicDuration(song.duration)}</Text>
      </Table.Cell>
      <Table.Cell borderBottom={"none"}>
        {playlist && (
          <IconWithTooltip tooltipText="Remove" positioning="top">
            <IconButton
              size={"2xs"}
              variant={"ghost"}
              disabled={isPending}
              rounded={"full"}
              _groupHover={{ visibility: "visible" }}
              visibility={"hidden"}
              color={"gray.900"}
              bg={"green.600"}
              onClick={
                playlist
                  ? () =>
                      mutate(
                        {
                          song_id: song.id,
                          playlist_id: playlist.playlist_id!,
                        },
                        {
                          onSuccess: () =>
                            toaster.create({
                              title: "The Song has been removed!",
                            }),
                          onError: () =>
                            toaster.create({
                              title: "An Error occured, please try again",
                            }),
                        }
                      )
                  : undefined
              }
            >
              <HiMinus />
            </IconButton>
          </IconWithTooltip>
        )}
      </Table.Cell>
    </Table.Row>
  );
}
