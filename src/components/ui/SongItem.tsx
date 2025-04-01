import { Box, Image, Stack, Text } from "@chakra-ui/react";
import IconWithTooltip from "./IconWithTooltip";
import { IoMdPlay } from "react-icons/io";

export function SongItem({ isOpen }: { isOpen: boolean }) {
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
        <Image
          src="https://swjwzsoqbpfsivdzudfx.supabase.co/storage/v1/object/public/Temp//0x1900-000000-80-0-0.png"
          borderRadius={"md"}
        />
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
          Motigbana
        </Text>
        <Text color={"gray.400"} fontWeight={"semibold"}>
          Olamide
        </Text>
      </Stack>
    </Stack>
  );
}

export default SongItem;
