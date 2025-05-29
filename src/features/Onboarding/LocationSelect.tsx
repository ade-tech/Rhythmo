/**
 * @file src/features/Onboarding/LocationSelect.tsx
 * @description Provides a country/location selector for onboarding forms, used in onboarding flows to select user or artist location.
 *
 * @component
 * @param {LocationSelectProps} props - Props for LocationSelect component.
 * @returns {JSX.Element} The rendered location selector for onboarding.
 */

import {
  Box,
  Button,
  createListCollection,
  Field,
  Portal,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import countries from "world-countries";
import DualButtonFooter from "./DualButtonFooter";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { ArtistOnboardingFormInputs } from "./ArtistOnboarding";
import { toaster } from "@/components/ui/toaster";
import { LocationType } from "../auth/userType";
/**
 * LocationSelect Component
 *
 * Provides a country/location selector for onboarding forms.
 *
 * Usage:
 * - Used in onboarding flows to select user or artist location.
 *
 * Props:
 * - title: The prompt/question for the user.
 * - Increamental: Function to increment/decrement onboarding step.
 * - trigger: react-hook-form trigger for validation.
 * - errors: react-hook-form errors object.
 * - control: react-hook-form control object.
 * - setValue: react-hook-form setValue function for updating form state.
 */
type LocationSelectProps = {
  title: string;
  Increamental?: React.Dispatch<React.SetStateAction<number>>;
  trigger: UseFormTrigger<ArtistOnboardingFormInputs>;
  errors: FieldErrors<ArtistOnboardingFormInputs>;
  control: Control<ArtistOnboardingFormInputs>;
  setValue: UseFormSetValue<ArtistOnboardingFormInputs>;
};
/**
 * LocationSelect React component
 *
 * Renders a country/location selector for onboarding forms.
 *
 * @param {LocationSelectProps} props - The props for the component.
 * @returns {JSX.Element} The rendered location selector.
 */
const LocationSelect = ({
  title,
  errors,
  control,
  setValue,
  trigger,
  Increamental,
}: LocationSelectProps) => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);
  const allCountries = createListCollection({
    items: Array.from(
      countries.map((country) => {
        return {
          label: country.name.common,
          value: country.name.common,
          flag: country.flag,
        };
      })
    ),
  });
  const getmylocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          setLoadingLocation(true);
          const { latitude, longitude } = pos.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data: LocationType = await response.json();

          if (!response.ok) {
            toaster.create({
              title: "We could not get your Location",
            });
            return;
          }
          if (data) {
            setLoadingLocation(false);
            setValue("Location", data.address.country);
          }
        } catch (error) {
          if (error instanceof Error) {
            toaster.create({
              title: "We could not fetch your location",
            });
          }
        } finally {
          setLoadingLocation(false);
        }
      },
      () =>
        toaster.create({
          title: "Location not available",
        })
    );
  };

  const handleClick = async () => {
    const isvalid = await trigger(["Location"]);

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
          onClick={getmylocation}
        >
          {loadingLocation ? (
            <Spinner
              size={"md"}
              color="green.500"
              css={{ "--spinner-track-color": "colors.green.900" }}
            />
          ) : (
            "Use my location"
          )}
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
