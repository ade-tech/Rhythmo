import { Box, Stack, Tabs, Text } from "@chakra-ui/react";
import ArtistSongItem from "./ArtistSongItem";
import ArtistAlbumItem from "./ArtistAlbumItem";

const ArtistSongs = () => {
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
          <ArtistSongItem />
          <ArtistSongItem />
          <ArtistSongItem />
          <ArtistSongItem />
          <ArtistSongItem />
          <ArtistSongItem />
          <ArtistSongItem />
        </Tabs.Content>
        <Tabs.Content
          w={"full"}
          value="tab-2"
          display={"grid"}
          maxH={"62.5vh"}
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
          <ArtistAlbumItem />
          <ArtistAlbumItem />
          <ArtistAlbumItem />
          <ArtistAlbumItem />
          <ArtistAlbumItem />
          <ArtistAlbumItem />
          <ArtistAlbumItem />
          <ArtistAlbumItem />
          <ArtistAlbumItem />
        </Tabs.Content>
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
        >
          <ArtistSongItem />
          <ArtistSongItem />
          <ArtistSongItem />
          <ArtistSongItem />
          <ArtistSongItem />
          <ArtistSongItem />
          <ArtistSongItem />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default ArtistSongs;
