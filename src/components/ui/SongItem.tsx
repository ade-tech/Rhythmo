import { Box, Image, Stack, Text } from "@chakra-ui/react";
import IconWithTooltip from "./IconWithTooltip";
import { IoMdPlay } from "react-icons/io";
import { Song } from "@/features/tracks/songType";

type songItemProps = {
  isOpen: boolean;
  data: Song;
};

export function SongItem({ isOpen, data }: songItemProps) {
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
        <IconWithTooltip tooltipText="play">
          <Stack
            bg={"green.500"}
            rounded={"full"}
            visibility={"hidden"}
            opacity={0}
            m={0}
            transition={"all ease-in-out 0.3s"}
            _groupHover={{
              visibility: "visible",
              opacity: 1,
            }}
            p={3}
            pos={"absolute"}
            bottom={2}
            right={1}
          >
            <Box as={IoMdPlay} boxSize={6} cursor={"pointer"} color={"black"} />
          </Stack>
        </IconWithTooltip>
      </Stack>
      <Stack gap={0} flexShrink={0}>
        <Text fontWeight={"bold"} textStyle={"lg"}>
          {data.title}
        </Text>
        <Text color={"gray.400"} fontWeight={"semibold"}>
          {data.artists.main}
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
