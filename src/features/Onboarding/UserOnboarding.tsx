import { Box, Button, Image, Input, Link, Text } from "@chakra-ui/react";
import InputGroup from "./InputGroup";

const UserOnboarding = () => {
  return (
    <Box
      w={"full"}
      h={"100dvh"}
      bgPos={"center"}
      bgSize={"cover"}
      backdropBlur={"20px"}
      bg={"blackAlpha.200"}
      pos={"relative"}
    >
      <Image
        src="/onboarding.webp"
        w={"full"}
        h={"full"}
        filter="blur(10px)"
        opacity={"0.05"}
      />
      <Box
        w={"full"}
        h={"full"}
        pos={"absolute"}
        top={0}
        bg={"transparent"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <InputGroup
          title="What's your name"
          buttonLabel="Procced"
          InputType="date"
        />
      </Box>
      <Box>
        <Text
          textStyle={"xs"}
          fontWeight={"light"}
          pos={"absolute"}
          bottom={5}
          color={"gray.500"}
          textAlign={"center"}
          w={"full"}
        >
          We won't share your details <Link href="#">Our Privacy policy</Link>
        </Text>
      </Box>
    </Box>
  );
};

export default UserOnboarding;
