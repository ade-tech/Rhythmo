import {
  Box,
  Button,
  createListCollection,
  Field,
  Portal,
  Select,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import countries from "world-countries";
import DualButtonFooter from "./DualButtonFooter";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormTrigger,
} from "react-hook-form";
import { ArtistOnboardingFormInputs } from "./ArtistOnboarding";
type LocationSelectProps = {
  title: string;
  Increamental?: React.Dispatch<React.SetStateAction<number>>;
  trigger: UseFormTrigger<ArtistOnboardingFormInputs>;
  errors: FieldErrors<ArtistOnboardingFormInputs>;
  control: Control<ArtistOnboardingFormInputs>;
};
const LocationSelect = ({
  title,
  errors,
  control,
  trigger,
  Increamental,
}: LocationSelectProps) => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const allCountries = createListCollection({
    items: Array.from(
      countries.map((country) => {
        return {
          label: country.name.common,
          value: `${country.latlng[0]},${country.latlng[0]}`,
          flag: country.flag,
        };
      })
    ),
  });

  const handleClick = async () => {
    const isvalid = await trigger(["Location"]);
    console.log(isvalid);

    if (!isvalid) return;
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
          mb={errors["Location"] ? 7 : 2}
          _hover={{ bg: "transparent", color: "green.500" }}
          zIndex={"100"}
          color={"green.600"}
          focusRing={"none"}
        >
          Use my location
        </Button>
      </Box>
      <Field.Root invalid={!!errors["Location"]}>
        <Controller
          control={control}
          name="Location"
          rules={{
            required: "You have to select your location!",
          }}
          render={({ field }) => (
            <Select.Root
              bg={"gray.950"}
              name={field.name}
              positioning={{ placement: "bottom-start", flip: false }}
              collection={allCountries}
              w={"full"}
              size={"lg"}
              value={[field.value]}
              onValueChange={({ value }) => field.onChange(value.at(0))}
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
                <Select.Positioner w={"1/3"}>
                  <Select.Content h={"14rem"} w={"full"}>
                    {allCountries.items.map((curCountry) => (
                      <Select.Item item={curCountry} key={curCountry.label}>
                        {curCountry.flag} {curCountry.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          )}
        />
        <Field.ErrorText>{errors["Location"]?.message}</Field.ErrorText>
      </Field.Root>
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
