/**
 * SignUpCTA Component
 *
 * Renders a call-to-action banner encouraging users to sign up for Rhythmo.
 *
 * Usage:
 * - Used on the home page for unauthenticated users to prompt sign-up.
 */

import { Box, Button, Spacer, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SignUpCTA = () => {
  const naviagte = useNavigate();
  return (
    <Box h={20} px={3} pb={3} color={"white"}>
      <Box
        bgGradient={"to-l"}
        h={"full"}
        gradientTo={"#ce13ac"}
        gradientFrom={"#67a8f7"}
        px={4}
        py={2}
        display={"flex"}
        alignItems={"center"}
        rounded={"sm"}
      >
        <Stack gap={0}>
          <Text textStyle={"lg"} fontWeight={"semibold"} lineHeight={1.2}>
            Preview of Rhythmo
          </Text>
          <Text lineHeight={1} textStyle={"sm"}>
            Sign up to get unlimited songs and Recitations with occasional ads.
            No credit card required
          </Text>
        </Stack>
        <Spacer />
        <Button
          bg={"white"}
          color={"gray.950"}
          rounded={"full"}
          size={"sm"}
          onClick={() => naviagte("/login")}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default SignUpCTA;
