/**
 * ArtistContainer Component
 *
 * Main container for displaying an artist's profile and music.
 * Shows artist details, stats, and music content (songs, albums, etc.).
 *
 * Usage:
 * - Used as the main view for an artist's public profile or dashboard.
 */

import IconWithTooltip from "@/components/ui/IconWithTooltip";

import {
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Spacer,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { IoList, IoReload } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { RxTimer } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { useFetchArtist, useFetchSongsByArtist } from "./useArtist";
import { HiOutlineStatusOffline } from "react-icons/hi";
import TotalEmpty from "@/components/ui/TotalEmpty";
import FollowButton from "@/components/ui/FollowButton";
import { useCurrentUser } from "@/contexts/currentUserContext";
import MusicRow from "@/components/ui/MusicRow";
import { PlayPause } from "@/components/ui/PlayPause";
import { useIsSongOpen } from "@/contexts/songContext";

export function AlbumContainer() {
  const { id } = useParams();
  const { data, isLoading } = useFetchArtist(id!);
  const { currentUser } = useCurrentUser();
  const { isOpen } = useIsSongOpen();
  const { data: ArtistSongs } = useFetchSongsByArtist(id);

  console.log(data);
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

  if (data === null || data === undefined) return <TotalEmpty />;

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
        gradientFrom={"yellow.400"}
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
      >
        <Avatar.Root h={"10rem"} w={"10rem"} shape={"full"} shadow={"md"}>
          <Avatar.Fallback>
            <Image src="/musicfallback.png" rounded={"full"} />
          </Avatar.Fallback>
          <Avatar.Image src={data.profiles.avatar_url} rounded={"full"} />
        </Avatar.Root>
        <Stack
          color={"white"}
          w={"2/3"}
          gap={0}
          zIndex={1}
          justifyContent={"center"}
        >
          <Text display={"flex"} alignItems={"center"}>
            {" "}
            <MdVerified color="#ffffff" /> Verified Artist
          </Text>
          <Text textStyle={"7xl"} lineHeight={"1"} fontWeight={"black"}>
            {data.profiles.nickname}
          </Text>

          <Text fontWeight={"bold"} mt={1}>
            {data.monthly_plays.toLocaleString()} Monthly Listeners
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
          <PlayPause
            data={{ data: ArtistSongs?.at(0) || null, queue: ArtistSongs }}
            isRelative
          />
          <FollowButton
            artist_id={data.user_id}
            currentUser={currentUser?.data?.id!}
          />
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
              <Table.ColumnHeader color={"gray.400"}></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {ArtistSongs?.map((curSong, i) => (
              <MusicRow song={curSong} index={i} key={i} />
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

export default AlbumContainer;
