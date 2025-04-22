import { Avatar, CheckboxCard } from "@chakra-ui/react";

const ArtistSelect = () => {
  return (
    <CheckboxCard.Root
      rounded={"full"}
      h={"fit"}
      w={"fit"}
      variant={"subtle"}
      colorPalette={"green"}
    >
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control>
        <CheckboxCard.Label>
          <Avatar.Root shape={"full"} size={"2xl"}>
            <Avatar.Image src="/musicfallback.png" w={"4rem"} />
          </Avatar.Root>
        </CheckboxCard.Label>
      </CheckboxCard.Control>
    </CheckboxCard.Root>
  );
};

export default ArtistSelect;
