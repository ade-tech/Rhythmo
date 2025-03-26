import { Image, Stack, Text } from "@chakra-ui/react";

export function SongItem() {
  return (
    <Stack
      minW={"150px"}
      h={"fit"}
      px={3}
      transition={"background 0.2s ease-in"}
      _hover={{ bg: "gray.800" }}
      py={3}
      borderRadius={"md"}
    >
      <Image
        src="https://swjwzsoqbpfsivdzudfx.supabase.co/storage/v1/object/public/Temp//0x1900-000000-80-0-0.png"
        borderRadius={"md"}
      />
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
