/**
 * @file src/features/albums/AlbumContainer.tsx
 * @description AlbumContainer component displays details and songs for a specific album or playlist.
 * Handles album/playlist metadata, song listing, and playback controls. Used for the main album or playlist detail view, accessible from library or search.
 *
 * @component
 * @example
 * // Used in route: /albums/:id or /playlists/:id
 * <AlbumContainer />
 */

import IconWithTooltip from "@/components/ui/IconWithTooltip";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Spacer,
  Span,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { IoList, IoReload } from "react-icons/io5";
import { RxTimer } from "react-icons/rx";
import { useParams } from "react-router-dom";
import {
  useFetchPlaylist,
  useFetchSongsInPlaylist,
  useFetchSongsToPlayInPlaylist,
} from "../playlist/usePlaylist";
import { useIsSongOpen } from "@/contexts/songContext";
import { HiOutlineStatusOffline } from "react-icons/hi";
import { BiSolidAlbum } from "react-icons/bi";
import { useCurrentMusic } from "@/contexts/audioContext";
import { useCurrentUser } from "@/contexts/currentUserContext";
import { PlayPause } from "@/components/ui/PlayPause";
import SongDialog from "@/components/ui/SongDialog";
import MusicRow from "@/components/ui/MusicRow";
import EditPlaylist from "../playlist/EditPlaylist";
import { MdOutlineEdit } from "react-icons/md";

/**
 * AlbumContainer React component
 *
 * Fetches and displays album or playlist details, including cover art, metadata, and a list of songs.
 * Handles loading, error, and empty states. Integrates with playback and playlist context.
 *
 * @returns {JSX.Element} The rendered album or playlist detail view.
 */
export function AlbumContainer() {
  const { id } = useParams();
  const { data, isLoading } = useFetchPlaylist(id!);
  const { data: songs, isLoading: isGettingSongs } = useFetchSongsInPlaylist(
    data?.playlist_id!
  );
  const {
    state: { activeSong, audioStatus },
  } = useCurrentMusic();
  const { currentUser } = useCurrentUser();
  const { data: songsToPlay, isLoading: isGettingSongsToPlay } =
    useFetchSongsToPlayInPlaylist(data?.playlist_id!);
  const { isOpen } = useIsSongOpen();
  if (isLoading || isGettingSongs || isGettingSongsToPlay)
    return (
      <Box
        w={"full"}
        h={"full"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image src="/Rhythmo.svg" w={"4rem"} animation={"bounce"} />
      </Box>
    );
  if (!isLoading && (!data || !Object.entries(data)?.length))
    return (
      <Box
        w={"full"}
        h={"full"}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          as={HiOutlineStatusOffline}
          boxSize={36}
          color={"gray.500"}
          mb={2}
        />
        <Text mb={1} textStyle={"6xl"} fontWeight={"medium"} color={"gray.500"}>
          You are Offline
        </Text>
        <Text textAlign={"center"} lineHeight={"1.3"} color={"gray.300"}>
          Rythmo could not get your music kindly check your <br />
          internet connection
        </Text>
        <Button
          rounded={"full"}
          bg={"green.600"}
          textAlign={"center"}
          fontWeight={"bold"}
          color={"black"}
          mt={4}
          onClick={() => window.location.reload()}
        >
          <IoReload />
          Try Again
        </Button>
      </Box>
    );
  return (
    <Box
      h={isOpen ? "75dvh" : "86dvh"}
      overflow={"auto"}
      className="trend-group"
      pos={"relative"}
    >
      <Box
        w={"100%"}
        opacity={"0.9"}
        h={"70%"}
        zIndex={0}
        top={0}
        bgGradient={"to-b"}
        gradientFrom={songs?.at(0)?.song.prominent_color ?? "green.500"}
        gradientTo={"gray.950"}
        position={"absolute"}
        roundedTop={"md"}
      ></Box>

      <Box
        flexDirection={"row"}
        display={"flex"}
        h={"10rem"}
        gap={5}
        mt={6}
        pl={4}
        mb={4}
        border={"1"}
        zIndex={10}
        className="group"
      >
        <EditPlaylist
          playlistInformation={data!}
          ButtonContent={
            <Box
              h={"10rem"}
              w={"10rem"}
              position={"relative"}
              cursor={"pointer"}
            >
              <Avatar.Root h={"full"} w={"full"} shape={"rounded"}>
                <Avatar.Fallback>
                  <Image src="/musicfallback.png" rounded={"md"} />
                </Avatar.Fallback>
                <Avatar.Image
                  src={
                    data?.cover_url
                      ? data.cover_url
                      : songs?.at(0)?.song.cover_url || undefined
                  }
                />
              </Avatar.Root>
              <Box
                cursor={"pointer"}
                position={"absolute"}
                rounded={"md"}
                h={"full"}
                w={"full"}
                transition={"opacity 0.2s ease-in"}
                p={2}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                visibility={"hidden"}
                flexDir={"column"}
                opacity={0}
                top={0}
                bg={"blackAlpha.500"}
                _groupHover={{ visibility: "visible", opacity: 1 }}
              >
                <MdOutlineEdit size={48} />
                <Text>Edit Playlist</Text>
              </Box>
            </Box>
          }
        />

        <Stack color={"white"} w={"2/3"} gap={0} zIndex={1}>
          <Text>Playlist</Text>
          <Text textStyle={"7xl"} fontWeight={"black"}>
            {data?.name}
          </Text>

          <Text fontWeight={"bold"}>
            Abdone . <Span color={"gray.400"}>{songs?.length} Songs</Span>
          </Text>
        </Stack>
      </Box>
      <Stack
        zIndex={10}
        bg={"blackAlpha.400"}
        minH="calc(100% - 12.5rem)"
        gap={3}
        pos={"relative"}
        py={3}
        px={4}
      >
        <HStack gap={2} pr={4}>
          <IconWithTooltip
            tooltipText={
              songsToPlay?.queue?.some(
                (data) => data.id === activeSong?.title
              ) && audioStatus === "playing"
                ? "Pause"
                : "play"
            }
          >
            {currentUser?.data ? (
              <PlayPause boxSize={8} data={songsToPlay} isRelative={true} />
            ) : (
              <SongDialog
                triggerSongImage={songsToPlay?.data?.cover_url || undefined}
                triggerSongColor={songsToPlay?.data?.prominent_color ?? ""}
                triggerButton={
                  <PlayPause boxSize={8} data={songsToPlay} isRelative={true} />
                }
              />
            )}
          </IconWithTooltip>
          <Spacer />
          <IconWithTooltip tooltipText="view as">
            <Box
              as={IoList}
              boxSize={8}
              cursor={"pointer"}
              color={"gray.300"}
            />
          </IconWithTooltip>
        </HStack>
        {songs?.length! < 1 ? (
          <Box
            h={"16rem"}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            pb={10}
          >
            <Box as={BiSolidAlbum} boxSize={"5rem"} mb={2} />
            <Text textStyle={"2xl"} fontWeight={"bold"}>
              Empty Playlist
            </Text>
            <Text
              textAlign={"center"}
              lineHeight={1.3}
              fontWeight={"light"}
              textStyle={"sm"}
              mt={2}
            >
              The playlist seems empty, continue by
              <br /> adding a song to the playlist
            </Text>
          </Box>
        ) : (
          <>
            <Table.Root size="lg" stickyHeader={true} color={"white"}>
              <Table.Header>
                <Table.Row bg={"transparent"}>
                  <Table.ColumnHeader color={"gray.400"}>#</Table.ColumnHeader>
                  <Table.ColumnHeader color={"gray.400"}>
                    Title
                  </Table.ColumnHeader>
                  <Table.ColumnHeader color={"gray.400"}>
                    Plays
                  </Table.ColumnHeader>
                  <Table.ColumnHeader color={"gray.400"}>
                    <RxTimer size={15} />
                  </Table.ColumnHeader>
                  <Table.ColumnHeader color={"gray.400"}></Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {songs?.map((currSong, i) => (
                  <MusicRow
                    key={i}
                    index={i}
                    song={currSong.song}
                    playlist={data}
                  />
                ))}
              </Table.Body>
            </Table.Root>
            <Stack mt={10} gap={4} pb={3} color={"white"}>
              <Stack gap={0} mb={8}>
                <Text textStyle={"2xl"} fontWeight={"bold"} color={"white"}>
                  Recommended
                </Text>
                <Text textStyle={"sm"} color={"gray.400"}>
                  Based on what's in the playlist
                </Text>
              </Stack>

              <HStack w={"full"}>
                <HStack gap={4}>
                  <Avatar.Root shape={"rounded"} size={"md"}>
                    <Avatar.Image src="https://swjwzsoqbpfsivdzudfx.supabase.co/storage/v1/object/public/Temp//ab6761610000e5ebf6469f2cbf0a7e78744a3173.jpg" />
                  </Avatar.Root>
                  <Stack gap={0}>
                    <Text textStyle={"md"} fontWeight={"bold"} lineHeight={1.1}>
                      Motigbana
                    </Text>
                    <Text
                      textStyle={"sm"}
                      fontWeight={"medium"}
                      color={"gray.400"}
                    >
                      Olamide
                    </Text>
                  </Stack>
                </HStack>
                <Spacer />
                <Text>Split Decison</Text>
                <Spacer />
                <Button
                  rounded={"full"}
                  variant={"outline"}
                  borderColor={"white"}
                  color={"white"}
                >
                  Add
                </Button>
              </HStack>
              <HStack w={"full"}>
                <HStack gap={4}>
                  <Avatar.Root shape={"rounded"} size={"md"}>
                    <Avatar.Image src="https://swjwzsoqbpfsivdzudfx.supabase.co/storage/v1/object/public/Temp//ab6761610000e5ebf6469f2cbf0a7e78744a3173.jpg" />
                  </Avatar.Root>
                  <Stack gap={0}>
                    <Text textStyle={"md"} fontWeight={"bold"} lineHeight={1.1}>
                      Motigbana
                    </Text>
                    <Text
                      textStyle={"sm"}
                      fontWeight={"medium"}
                      color={"gray.400"}
                    >
                      Olamide
                    </Text>
                  </Stack>
                </HStack>
                <Spacer />
                <Text>Split Decison</Text>
                <Spacer />
                <Button
                  rounded={"full"}
                  variant={"outline"}
                  borderColor={"white"}
                  color={"white"}
                >
                  Add
                </Button>
              </HStack>
            </Stack>
          </>
        )}
      </Stack>
    </Box>
  );
}

export default AlbumContainer;
