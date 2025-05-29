import { Avatar, HStack, Stack, Text } from "@chakra-ui/react";
import { JSX } from "@emotion/react/jsx-runtime";
import { Link } from "react-router-dom";

/**
 * ArtistShort Component
 *
 * Displays a compact summary of an artist, including avatar and name.
 * Used for recommendations, related artists, or compact lists.
 *
 * Usage:
 * - Used in sidebars, recommendations, or compact artist lists.
 */

type artistProps = {
  avatar?: string;
  artistName?: string;
  link: string;
};
export function ArtistShort(obj: artistProps): JSX.Element {
  return (
    <Link to={obj.link}>
      <HStack w={"full"} my={3}>
        <HStack gap="4">
          <Avatar.Root shape={"full"} size={"xl"}>
            <Avatar.Fallback name={"Abdone"} />
            <Avatar.Image src={obj?.avatar} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="medium" textStyle={"lg"} color={"white"}>
              {obj.artistName}
            </Text>
            <Text color="gray.400" textStyle="xs">
              Artist
            </Text>
          </Stack>
        </HStack>
      </HStack>
    </Link>
  );
}

export default ArtistShort;
