/**
 * @file src/features/Onboarding/InputGroup.tsx
 * @description Custom input group for onboarding forms, handling label, input, and error display. Used in onboarding flows for user and artist registration.
 *
 * @component
 * @param {InputGroupProps} props - Props for InputGroup component.
 * @returns {JSX.Element} The rendered input group for onboarding forms.
 */

import { Box, Button, Field, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import DualButtonFooter from "./DualButtonFooter";
import { FieldErrors, UseFormRegister, UseFormTrigger } from "react-hook-form";
import { OnboardingFormInputs } from "./UserOnboarding";

/**
 * InputGroup React component
 *
 * Custom input group for onboarding forms, handling label, input, and error display.
 *
 * @param {InputGroupProps} obj - The props for the component.
 * @returns {JSX.Element} The rendered input group.
 */

type InputGroupProps = {
  title: string;
  InputType: string;
  buttonLabel: string;
  onboardState: number;
  Increamental?: React.Dispatch<React.SetStateAction<number>>;
  placeholder?: string;
  register: UseFormRegister<OnboardingFormInputs>;
  fieldName: "Name" | "Date" | "Artist";
  trigger: UseFormTrigger<OnboardingFormInputs>;
  errors: FieldErrors<OnboardingFormInputs>;
  validateFn?: (value: string) => boolean | string;
};

const InputGroup = (obj: InputGroupProps) => {
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
      <Text textStyle={"5xl"} fontWeight={"semibold"}>
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
            validate: (value: string | string[]) => {
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
        >
          {obj.buttonLabel}
        </Button>
      )}
      {obj.onboardState === 2 && (
        <DualButtonFooter
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

export default InputGroup;
