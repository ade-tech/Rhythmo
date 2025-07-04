/**
 * TrackContainer Component
 *
 * Displays detailed information about a specific track/song.
 * Handles playback controls, song metadata, and related actions.
 *
 * Usage:
 * - Used for the main track detail view, accessible from song lists or search.
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
import { useFetchSong } from "./useSong";
import {
  getSingMusicDuration,
  getSingMusicDurationString,
} from "@/utils/MusicDuration";
import { useCurrentMusic } from "@/contexts/audioContext";
import { HiOutlineStatusOffline } from "react-icons/hi";
import TotalEmpty from "@/components/ui/TotalEmpty";
import { useCurrentUser } from "@/contexts/currentUserContext";
import SongDialog from "@/components/ui/SongDialog";
import { PlayPause } from "@/components/ui/PlayPause";
import AddToLikeSongButton from "@/components/ui/AddToLikeSongButton";

export function TrackContainer() {
  const { id } = useParams();
  const { data, isLoading } = useFetchSong(id ?? "");
  const { currentUser } = useCurrentUser();
  const {
    state: { activeSong, audioStatus },
  } = useCurrentMusic();

  if (isLoading)
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
  if (!isLoading && (!data?.data || !Object.entries(data.data)?.length))
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

  if (data?.data === null || data?.data === undefined) return <TotalEmpty />;

  return (
    <Box
      h={activeSong ? "75dvh" : "86dvh"}
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
        gradientFrom={data?.data.prominent_color}
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
        alignItems={"center"}
      >
        <Avatar.Root h={"10rem"} w={"10rem"} shape={"rounded"}>
          <Avatar.Fallback>
            <Image src="/musicfallback.png" />
          </Avatar.Fallback>
          <Avatar.Image src={data?.data.cover_url} />
        </Avatar.Root>
        <Stack color={"white"} w={"2/3"} gap={0} zIndex={1}>
          <Text>Single</Text>
          <Text textStyle={"7xl"} lineHeight={1} fontWeight={"black"}>
            {data?.data.title}
          </Text>

          <Text fontWeight={"bold"}>
            {data?.data.artist} .
            <Span color={"gray.400"}>
              {" "}
              1 Song {getSingMusicDurationString(data?.data.duration!)}
            </Span>
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
              activeSong?.title === data?.data.title &&
              audioStatus === "playing"
                ? "Pause"
                : "play"
            }
          >
            {currentUser?.data ? (
              <PlayPause boxSize={8} data={data} isRelative={true} />
            ) : (
              <SongDialog
                triggerSongImage={data.data.cover_url}
                triggerSongColor={data.data.prominent_color}
                triggerButton={
                  <PlayPause boxSize={8} data={data} isRelative={true} />
                }
              />
            )}
          </IconWithTooltip>
          <AddToLikeSongButton boxSize={16} song={data.data} />
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
        <Table.Root size="lg" stickyHeader={true} color={"white"}>
          <Table.Header>
            <Table.Row bg={"transparent"}>
              <Table.ColumnHeader color={"gray.400"}>#</Table.ColumnHeader>
              <Table.ColumnHeader color={"gray.400"}>Title</Table.ColumnHeader>
              <Table.ColumnHeader color={"gray.400"}>Plays</Table.ColumnHeader>
              <Table.ColumnHeader color={"gray.400"}>
                <RxTimer size={15} />
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row bg={"transparent"} _hover={{ bg: "gray.900" }}>
              <Table.Cell borderBottom={"none"}>1</Table.Cell>
              <Table.Cell borderBottom={"none"} display={"flex"} gap={2}>
                <Avatar.Root shape={"rounded"} size={"sm"}>
                  <Avatar.Image src={data?.data.cover_url} />
                </Avatar.Root>
                <Stack gap={0}>
                  <Text textStyle={"md"} fontWeight={"bold"} lineHeight={1.1}>
                    {data?.data.title}
                  </Text>
                  <Text
                    textStyle={"sm"}
                    fontWeight={"medium"}
                    color={"gray.400"}
                  >
                    {data?.data.artist}
                  </Text>
                </Stack>
              </Table.Cell>
              <Table.Cell borderBottom={"none"} fontWeight={"medium"}>
                {data?.data.play_count.toLocaleString()} views
              </Table.Cell>
              <Table.Cell borderBottom={"none"} color={"gray.400"}>
                {getSingMusicDuration(data?.data.duration!)}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
        <Stack mt={10} gap={4} pb={3} color={"white"}>
          <Stack gap={0} mb={8}>
            <Text textStyle={"2xl"} fontWeight={"bold"} color={"white"}>
              Recommended
            </Text>
            <Text textStyle={"sm"} color={"gray.400"}>
              Similar to this song
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
                <Text textStyle={"sm"} fontWeight={"medium"} color={"gray.400"}>
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
                <Text textStyle={"sm"} fontWeight={"medium"} color={"gray.400"}>
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
      </Stack>
    </Box>
  );
}

export default TrackContainer;
