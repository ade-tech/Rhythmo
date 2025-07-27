/**
 * ArtistSongs Component
 *
 * Provides a tabbed interface for artists to manage their music content.
 * Tabs include Singles, Albums, and Featured tracks, each displaying a grid of items.
 * Integrates with ArtistSongItem and ArtistAlbumItem for content display.
 * Supports animated tab transitions and scrollable content areas.
 *
 * Usage:
 * - Used in the artist dashboard for managing and viewing artist's music.
 */

import { Box, Skeleton, Stack, Tabs, Text } from "@chakra-ui/react";
import ArtistSongItem from "./ArtistSongItem";
import ArtistAlbumItem from "./ArtistAlbumItem";
import { useFetchAlbumsByArtist, useFetchSongsByArtist } from "./useArtist";
import { IoAlbums } from "react-icons/io5";

const ArtistSongs = () => {
  const { data, isLoading } = useFetchSongsByArtist();
  const { data: albums, isLoading: isLoadingAlbums } = useFetchAlbumsByArtist();
  return (
    <Box
      w={"full"}
      maxH={"full"}
      display={"flex"}
      flexDir={"column"}
      gap={3}
      rounded={"lg"}
      pt={6}
    >
      <Stack ml={4} gap={0}>
        <Text
          textStyle={"2xl"}
          color={"white"}
          transitionDuration={"200ms"}
          fontWeight={"bold"}
        >
          Your music
        </Text>
        <Text textStyle={"sm"} color={"gray.500"}>
          Take control of your Songs and Albums
        </Text>
      </Stack>
      <Tabs.Root
        flex={1}
        w={"full"}
        fitted
        display={"flex"}
        flexDir={"column"}
        defaultValue={"tab-1"}
        colorPalette={"green"}
        px={4}
        overflowY={"auto"}
      >
        <Tabs.List>
          <Tabs.Trigger
            value="tab-1"
            _selected={{ color: "green.400" }}
            fontWeight={"normal"}
          >
            Singles
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab-2"
            _selected={{ color: "green.400" }}
            fontWeight={"normal"}
          >
            Albums
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab-3"
            _selected={{ color: "green.400" }}
            fontWeight={"normal"}
          >
            Featured
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          value="tab-1"
          display={"grid"}
          maxH={"62.5vh"}
          overflow={"hidden"}
          overflowY={"auto"}
          gap={"3"}
          gridTemplateColumns={"repeat(3, 1fr)"}
          flex={1}
          _open={{
            animation: "fade-in, scale-in",
            animationDuration: "0.5s",
            scrollbar: "hidden",
          }}
        >
          <Preloader isLoading={isLoading} />
          {data?.map((curSong) => (
            <ArtistSongItem key={curSong.id} data={curSong} />
          ))}
        </Tabs.Content>
        {albums === undefined || albums.length < 1 ? (
          <Tabs.Content
            value="tab-2"
            minH={"65vh"}
            w={"full"}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            flex={1}
            justifyContent={"center"}
            _open={{
              animation: "fade-in, scale-in",
              animationDuration: "0.5s",
              scrollbar: "hidden",
            }}
          >
            <Box as={IoAlbums} boxSize={24} />
            <Text fontWeight={"bold"} textStyle={"3xl"}>
              No Albums yet
            </Text>
            <Text textStyle={"sm"} color={"gray"}>
              When you add an Album it would show here
            </Text>
          </Tabs.Content>
        ) : (
          <Tabs.Content
            w={"full"}
            value="tab-2"
            display={"grid"}
            maxH={"65vh"}
            overflowY={"auto"}
            gap={"3"}
            gridTemplateColumns={"repeat(3, 1fr)"}
            _open={{
              animation: "fade-in, scale-in",
              animationDuration: "0.5s",
              scrollbar: "hidden",
            }}
            flex={1}
          >
            <Preloader isLoading={isLoadingAlbums} />
            {albums?.map((curALbum) => (
              <ArtistAlbumItem key={curALbum.playlist_id} data={curALbum} />
            ))}
          </Tabs.Content>
        )}
        <Tabs.Content
          value="tab-3"
          display={"grid"}
          maxH={"62.5vh"}
          overflow={"hidden"}
          overflowY={"auto"}
          gap={"3"}
          gridTemplateColumns={"repeat(3, 1fr)"}
          flex={1}
          _open={{
            animation: "fade-in, scale-in",
            animationDuration: "0.5s",
            scrollbar: "hidden",
          }}
        ></Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

function Preloader({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;
  return (
    <>
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={i} w={"full"} h={"12rem"} rounded={"lg"} />
      ))}
    </>
  );
}

export default ArtistSongs;
