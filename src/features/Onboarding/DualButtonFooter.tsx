import { Box, Button, Spacer } from "@chakra-ui/react";
import React from "react";
import { MdOutlineArrowBack } from "react-icons/md";

/**
 * DualButtonFooter Component
 *
 * Renders a footer with two buttons: a back button and a next/proceed button.
 * Used for navigation in multi-step onboarding flows.
 *
 * Props:
 * - action: Function to call when the next/proceed button is clicked.
 * - backAction: Function to call when the back button is clicked.
 * - buttonTitle: Text or node for the next/proceed button.
 * - colorPallete: Color scheme for the next/proceed button.
 * - nextDisabled: Whether the next/proceed button is disabled.
 */

type DualButtonProps = {
  action?: () => void;
  backAction?: () => void;
  buttonTitle: string | React.ReactNode;
  colorPallete?: "green" | "red";
  nextDisabled?: boolean;
};

const DualButtonFooter = ({
  action,
  backAction,
  nextDisabled,
  buttonTitle,
  colorPallete = "green",
}: DualButtonProps) => {
  return (
    <Box w={"full"} display={"flex"} mt={2}>
      <Button onClick={backAction} colorPalette={"white"} rounded={"full"}>
        <Box as={MdOutlineArrowBack} boxSize={4} />
      </Button>
      <Spacer />
      <Button
        textStyle={"lg"}
        fontWeight={"semibold"}
        onClick={action}
        w={"1/3"}
        rounded={"full"}
        bg={`${colorPallete}.600`}
        color={"gray.950"}
        size={"lg"}
        disabled={nextDisabled}
      >
        {buttonTitle}
      </Button>
    </Box>
  );
};

export default DualButtonFooter;
