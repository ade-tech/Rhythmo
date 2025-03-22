import { Avatar, HStack, Stack, Text } from "@chakra-ui/react";
import { JSX } from "@emotion/react/jsx-runtime";
import { Link } from "react-router-dom";

type playlistProps = {
  type: "playlist" | "album";
  title: string;
  avatar?: string;
  artistName?: string;
  link: string;
};
export function PlaylistShort(obj: playlistProps): JSX.Element {
  return (
    <Link to={obj.link}>
      <HStack w={"full"} my={3}>
        <HStack gap="4">
          <Avatar.Root shape={"rounded"} size={"xl"}>
            <Avatar.Fallback name={"Abdone"} />
            <Avatar.Image src={obj?.avatar} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="medium" textStyle={"lg"} color={"white"}>
              {obj.title}
            </Text>
            <Text color="gray.400" textStyle="xs">
              {obj.type === "playlist"
                ? "Playlist . Abdone"
                : `Single . ${obj.artistName}`}
            </Text>
          </Stack>
        </HStack>
      </HStack>
    </Link>
  );
}

export default PlaylistShort;
