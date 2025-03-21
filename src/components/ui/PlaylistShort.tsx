import { Avatar, HStack, Stack, Text } from "@chakra-ui/react";
import { JSX } from "@emotion/react/jsx-runtime";

type playlistProps = {
  type: "playlist" | "album";
  title: string;
  avatar?: string;
  artistName?: string;
};
export function PlaylistShort(obj: playlistProps): JSX.Element {
  return (
    <HStack w={"full"} my={3}>
      <HStack gap="4">
        <Avatar.Root shape={"rounded"} size={"xl"}>
          <Avatar.Fallback name={"Abdone"} />
          <Avatar.Image src={obj?.avatar} />
        </Avatar.Root>
        <Stack gap="0">
          <Text fontWeight="medium" textStyle={"lg"}>
            {obj.title}
          </Text>
          <Text color="fg.muted" textStyle="xs">
            {obj.type === "playlist"
              ? "Playlist . Abdone"
              : `Single . ${obj.artistName}`}
          </Text>
        </Stack>
      </HStack>
    </HStack>
  );
}

export default PlaylistShort;
