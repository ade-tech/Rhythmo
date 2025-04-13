import IconWithTooltip from "@/components/ui/IconWithTooltip";
import { Avatar, Box, HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Song } from "./songType";

const QueueItem = ({ song }: { song: Song }) => {
  return (
    <HStack
      gap={3}
      p={2}
      rounded={"lg"}
      transition="background 0.2s ease-in-out"
      _hover={{
        bg: "gray.800",
        p: 2,
      }}
    >
      <Avatar.Root shape={"rounded"} size={"2xl"}>
        <Avatar.Fallback name="Adel" />
        <Avatar.Image src={song.cover_url} />
      </Avatar.Root>
      <Stack gap={0}>
        <Link to={`track/${song.id}`}>
          <Text
            textStyle={"lg"}
            color={"white"}
            transitionDuration={"200ms"}
            _hover={{
              textDecoration: "underline",
              transition: "ease-in-out",
            }}
            fontWeight={"bold"}
          >
            {song.title}
          </Text>
        </Link>
        <Text
          textStyle={"sm"}
          color={"gray.400"}
          transitionDuration={"200ms"}
          _hover={{
            textDecoration: "underline",
            transition: "ease-in-out",
          }}
          fontWeight={"medium"}
        >
          {song.artist}
        </Text>
      </Stack>
      <Spacer />
      <IconWithTooltip tooltipText="More">
        <Box as={HiDotsHorizontal} boxSize={5} mr={3} color={"gray.400"} />
      </IconWithTooltip>
    </HStack>
  );
};

export default QueueItem;
