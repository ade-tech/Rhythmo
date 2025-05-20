import {
  Box,
  Button,
  createListCollection,
  Portal,
  Select,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import countries from "world-countries";
import DualButtonFooter from "./DualButtonFooter";
type LocationSelectProps = {
  title: string;
  Increamental?: React.Dispatch<React.SetStateAction<number>>;
};
const LocationSelect = ({ title, Increamental }: LocationSelectProps) => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const allCountries = createListCollection({
    items: Array.from(
      countries.map((country) => {
        return {
          label: country.name.common,
          value: country.latlng,
          flag: country.flag,
        };
      })
    ),
  });

  const handleClick = async () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosed(true);
      if (Increamental !== undefined) {
        Increamental((cur) => cur + 1);
      }
    }, 350);
  };
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
      <Text textStyle={"4xl"} fontWeight={"semibold"}>
        {" "}
        {title}
      </Text>
      <Box
        w={"full"}
        h={"full"}
        pos={"absolute"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
      >
        <Button
          variant={"ghost"}
          mr={10}
          mb={2}
          _hover={{ bg: "transparent", color: "green.500" }}
          zIndex={"100"}
          color={"green.600"}
          focusRing={"none"}
        >
          Use my location
        </Button>
      </Box>
      <Select.Root
        bg={"gray.950"}
        positioning={{ placement: "bottom", flip: false }}
        collection={allCountries}
        size={"lg"}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select your nationality?" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content h={"14rem"} w={"25rem"}>
              {allCountries.items.map((curCountry) => (
                <Select.Item item={curCountry} key={curCountry.label}>
                  {curCountry.flag} {curCountry.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
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

export default LocationSelect;
