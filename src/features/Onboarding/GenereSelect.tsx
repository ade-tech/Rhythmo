import { Box, CheckboxCard, CheckboxGroup, Text } from "@chakra-ui/react";
import { useState } from "react";
import DualButtonFooter from "./DualButtonFooter";
type GenreSelectProps = {
  Increamental?: React.Dispatch<React.SetStateAction<number>>;
};
const GenereSelect = ({ Increamental }: GenreSelectProps) => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleClick = async () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosed(true);
      if (Increamental !== undefined) {
        Increamental((cur) => cur + 1);
      }
    }, 350);
  };
  const genres = [
    "Afrobeats",
    "Highlife",
    "Soukous",
    "Kwaito",
    "Mbalax",
    "Gnawa",
    "Amapiano",
    "Benga",
    "Zouk",
    "Jùjú",
    "Gqom",
    "Desert Blues",
  ];
  return (
    <Box
      w={"1/3"}
      h={"1/2"}
      display={isClosed ? "none" : "flex"}
      pos={"relative"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      data-state={isClosing ? "closed" : "open"}
      gap={4}
      _open={{
        animation: "400ms fadeIn  ease-out ",
      }}
      _closed={{
        animation: "400ms fadeOut  ease-out ",
      }}
    >
      <Text textStyle={"4xl"} lineHeight={"0.9"} fontWeight={"semibold"}>
        What music do you make?
      </Text>
      <CheckboxGroup>
        <Box
          w={"full"}
          gap={3}
          display={"grid"}
          gridTemplateColumns={"repeat(3, 1fr)"}
          mt={2}
        >
          {genres.map((curGenre) => (
            <CheckboxCard.Root
              key={curGenre}
              colorPalette={"green"}
              bg={"gray.950"}
              rounded={"full"}
              display={"flex"}
              alignItems={"center"}
            >
              <CheckboxCard.HiddenInput />
              <CheckboxCard.Content px={4} py={2}>
                <CheckboxCard.Label textStyle={"md"} textAlign={"center"}>
                  {curGenre}
                </CheckboxCard.Label>
              </CheckboxCard.Content>
            </CheckboxCard.Root>
          ))}
        </Box>
      </CheckboxGroup>
      <DualButtonFooter
        buttonTitle="Proceed"
        colorPallete="green"
        backAction={() => {
          if (Increamental !== undefined) {
            Increamental((cur) => cur - 1);
          }
        }}
        action={handleClick}
      />
    </Box>
  );
};

export default GenereSelect;
