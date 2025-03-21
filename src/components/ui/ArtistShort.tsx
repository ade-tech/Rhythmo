import { Avatar, HStack, Stack, Text } from "@chakra-ui/react";
import { JSX } from "@emotion/react/jsx-runtime";

type artistProps = {
  avatar?: string;
  artistName?: string;
};
export function ArtistShort(obj: artistProps): JSX.Element {
  return (
    <HStack w={"full"} my={3}>
      <HStack gap="4">
        <Avatar.Root shape={"full"} size={"xl"}>
          <Avatar.Fallback name={"Abdone"} />
          <Avatar.Image src={obj?.avatar} />
        </Avatar.Root>
        <Stack gap="0">
          <Text fontWeight="medium" textStyle={"lg"}>
            {obj.artistName}
          </Text>
          <Text color="fg.muted" textStyle="xs">
            Artist
          </Text>
        </Stack>
      </HStack>
    </HStack>
  );
}

export default ArtistShort;
