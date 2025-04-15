import {
  Box,
  Button,
  Field,
  HStack,
  Image,
  Input,
  Link,
  Separator,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export function LoginContainer() {
  return (
    <Box
      w={"full"}
      h={"100dvh"}
      bgPos={"center"}
      bgSize={"cover"}
      backdropBlur={"20px"}
      bg={"blackAlpha.500"}
      pos={"relative"}
    >
      <Image
        src="/onboarding.webp"
        w={"full"}
        h={"full"}
        filter="blur(10px)"
        opacity={"0.3"}
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
        <Box
          bg={"gray.950"}
          w={"1/3"}
          h={"2/3"}
          px={6}
          py={5}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          gap={3}
        >
          <Text fontWeight={"bold"} textStyle={"3xl"} mt={5}>
            Sign in start Listening!
          </Text>
          <Spacer />
          <Field.Root required alignItems={"center"}>
            <Field.Label w={"2/3"}>
              Email
              <Field.RequiredIndicator color={"green.600"} />
            </Field.Label>
            <Input placeholder="name@domain.com" size={"lg"} w={"2/3"} />
          </Field.Root>
          <Button w={"2/3"} rounded={"full"} bg={"green.600"} color={"black"}>
            Next
          </Button>
          <HStack display={"flex"} w={"2/3"}>
            <Separator variant={"solid"} flex={1} bg={"gray.900"} />
            <Text>or</Text>
            <Separator variant={"solid"} flex={1} bg={"gray.900"} />
          </HStack>
          <Button
            w={"2/3"}
            size={"lg"}
            pos={"relative"}
            rounded={"full"}
            variant={"outline"}
          >
            <Box as={FcGoogle} pos={"absolute"} left={3} />
            Google
          </Button>
          <Spacer />
          <Text textStyle={"xs"} fontWeight={"light"} color={"gray.500"}>
            We won't share your details <Link href="#">Our Privacy policy</Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginContainer;
