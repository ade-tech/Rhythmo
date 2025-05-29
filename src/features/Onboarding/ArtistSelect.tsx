import { Avatar, Box, CheckboxCard, Text } from "@chakra-ui/react";

/**
 * ArtistSelect Component
 *
 * Allows users to select their favorite artists during onboarding.
 * Displays a list/grid of artists with selection controls.
 *
 * Usage:
 * - Used in the onboarding flow to collect user preferences.
 */

interface ArtistSelectProps {
  value: string;
  image: string;
  artistName: string;
}

const ArtistSelect = ({ value, image, artistName }: ArtistSelectProps) => {
  return (
    <Box textAlign={"center"}>
      <CheckboxCard.Root
        rounded={"full"}
        h={"fit"}
        w={"fit"}
        variant={"subtle"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        colorPalette={"green"}
        value={value}
        ml={1}
      >
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Control>
          <CheckboxCard.Label>
            <Avatar.Root shape={"full"} size={"2xl"}>
              <Avatar.Image src={image} w={"4rem"} />
            </Avatar.Root>
          </CheckboxCard.Label>
        </CheckboxCard.Control>
      </CheckboxCard.Root>
      <Text textStyle={"md"} textAlign={"center"} fontWeight={"bold"}>
        {artistName}
      </Text>
    </Box>
  );
};

export default ArtistSelect;
