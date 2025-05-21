import { Box, Button, Field, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import DualButtonFooter from "./DualButtonFooter";
import { FieldErrors, UseFormRegister, UseFormTrigger } from "react-hook-form";
import { ArtistOnboardingFormInputs } from "./ArtistOnboarding";

export type FieldNames =
  | "Name"
  | "Date"
  | "Nickname"
  | "Location"
  | "Genre"
  | "Profile_image"
  | "Cover_image"
  | "Bio"
  | "Instagram_link"
  | "Tiktok_link";
type ArtistInputGroupProps = {
  title: string;
  InputType: string;
  buttonLabel: string;
  onboardState: number;
  Increamental?: React.Dispatch<React.SetStateAction<number>>;
  placeholder?: string;
  register: UseFormRegister<ArtistOnboardingFormInputs>;
  fieldName: FieldNames;
  trigger: UseFormTrigger<ArtistOnboardingFormInputs>;
  errors: FieldErrors<ArtistOnboardingFormInputs>;
  validateFn?: (
    value: string | string[] | FileList | undefined
  ) => boolean | string;
};

const ArtistInputGroup = (obj: ArtistInputGroupProps) => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleClick = async () => {
    const isValid = await obj.trigger([obj.fieldName]);

    if (!isValid) return;

    setIsClosing(true);
    setTimeout(() => {
      setIsClosed(true);
      if (obj.Increamental !== undefined)
        obj?.Increamental((cur) => {
          return cur + 1;
        });
    }, 350);
  };

  return (
    <Box
      w={"1/3"}
      h={"1/2"}
      display={isClosed ? "none" : "flex"}
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
        {obj.title}
      </Text>
      <Field.Root invalid={!!obj.errors[obj.fieldName]}>
        <Input
          type={obj.InputType}
          size={"xl"}
          bg={"gray.950"}
          placeholder={obj?.placeholder}
          {...obj.register(obj.fieldName, {
            required: `${obj.fieldName} field cannot be empty`,
            validate: (value: string | string[] | FileList | undefined) => {
              if (typeof value === "string" && obj.validateFn) {
                return obj.validateFn(value);
              } else {
                return true;
              }
            },
          })}
        />
        <Field.ErrorText>{obj.errors[obj.fieldName]?.message}</Field.ErrorText>
      </Field.Root>
      {obj.onboardState === 1 && (
        <Button
          w={"full"}
          textStyle={"lg"}
          mt={2}
          rounded={"full"}
          bg={"green.600"}
          fontWeight={"semibold"}
          color={"gray.950"}
          onClick={handleClick}
          size={"lg"}
        >
          {obj.buttonLabel}
        </Button>
      )}
      {obj.onboardState >= 2 && (
        <DualButtonFooter
          colorPallete="green"
          backAction={() => {
            if (obj.Increamental !== undefined) {
              obj.Increamental((cur) => cur - 1);
            }
          }}
          buttonTitle={obj.buttonLabel}
          action={handleClick}
        />
      )}
    </Box>
  );
};

export default ArtistInputGroup;
