/**
 * @file src/features/Onboarding/GenereSelect.tsx
 * @description Renders a genre selection step for the artist onboarding flow. Integrates with react-hook-form Controller for form state management.
 *
 * @component
 * @param {GenreSelectProps} props - Props for GenereSelect component.
 * @returns {JSX.Element} The rendered genre selection step for onboarding.
 */

import { Box, CheckboxCard, CheckboxGroup, Text } from "@chakra-ui/react";
import { useState } from "react";
import DualButtonFooter from "./DualButtonFooter";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormTrigger,
} from "react-hook-form";
import { ArtistOnboardingFormInputs } from "./ArtistOnboarding";
type GenreSelectProps = {
  Increamental?: React.Dispatch<React.SetStateAction<number>>;
  trigger: UseFormTrigger<ArtistOnboardingFormInputs>;
  errors: FieldErrors<ArtistOnboardingFormInputs>;
  control: Control<ArtistOnboardingFormInputs>;
};
/**
 * GenereSelect React component
 *
 * Renders a genre selection step for the artist onboarding flow.
 *
 * @param {GenreSelectProps} props - The props for the component.
 * @returns {JSX.Element} The rendered genre selection step.
 */
const GenereSelect = ({
  Increamental,
  errors,
  control,
  trigger,
}: GenreSelectProps) => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleClick = async () => {
    const isvalid = await trigger(["Genre"]);
    if (!isvalid) return;
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

      <Controller
        control={control}
        name={"Genre"}
        rules={{
          required: "You have to select at least one Genre!",
        }}
        render={({ field }) => (
          <CheckboxGroup
            w={"full"}
            gap={3}
            display={"grid"}
            gridTemplateColumns={"repeat(3, 1fr)"}
            mt={2}
            value={Array.isArray(field.value) ? field.value : undefined}
            onValueChange={field.onChange}
          >
            {genres.map((curGenre) => (
              <CheckboxCard.Root
                key={curGenre}
                colorPalette={"green"}
                bg={"gray.950"}
                value={curGenre}
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
          </CheckboxGroup>
        )}
      />
      {errors["Genre"] && (
        <Text color="red.500">{errors["Genre"].message}</Text>
      )}

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
