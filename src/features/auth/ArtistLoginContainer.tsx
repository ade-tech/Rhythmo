import {
  Box,
  Button,
  Field,
  HStack,
  Image,
  Input,
  Link,
  PinInput,
  Separator,
  Text,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { SubmitHandler, Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

type Input = {
  email: string;
  otp: string[];
};

export function ArtistLoginContainer() {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<Input>();

  const submitFn: SubmitHandler<Input> = (data) => {
    console.log(data);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const page: number = Number(searchParams.get("page")) || 1;
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
        src="/artistOnboard.jpg"
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
          pt={5}
          pb={12}
          pos={"relative"}
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          flexDirection={"column"}
          gap={3}
        >
          <Text
            fontWeight={"bold"}
            textStyle={"3xl"}
            justifySelf={"flex-start"}
            display={page === 1 ? "block" : "none"}
            mt={5}
          >
            Start sharing your music
          </Text>
          <form className="flex w-full h-full flex-col items-center justify-center gap-3">
            {page === 1 && (
              <>
                <Field.Root
                  required
                  alignItems={"center"}
                  invalid={!!errors.email}
                >
                  <Field.Label w={"2/3"}>
                    Email
                    <Field.RequiredIndicator color={"red.600"} />
                  </Field.Label>
                  <Input
                    placeholder="name@domain.com"
                    size={"lg"}
                    w={"2/3"}
                    color={"gray.400"}
                    {...register("email", {
                      required: "Enter Email",
                      validate: (value) => {
                        const pattern =
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                        return (
                          pattern.test(value) || "Enter a valid Email Address"
                        );
                      },
                    })}
                  />
                  <Field.ErrorText w={"2/3"}>
                    {typeof errors?.email?.message === "string"
                      ? errors.email.message
                      : ""}
                  </Field.ErrorText>
                </Field.Root>
                <Button
                  w={"2/3"}
                  rounded={"full"}
                  bg={"red.600"}
                  color={"black"}
                  onClick={async () => {
                    const isValid = await trigger(["email"]);
                    if (isValid) {
                      setSearchParams({ page: "2" });
                    }
                  }}
                >
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
              </>
            )}
            {page === 2 && (
              <>
                <Box
                  as={HiArrowLeft}
                  rounded={"full"}
                  color={"white"}
                  boxSize={8}
                  p={1.5}
                  pos={"absolute"}
                  top={5}
                  borderWidth="1px"
                  alignSelf={"flex-start"}
                  onClick={() => {
                    setSearchParams({ page: "1" });
                  }}
                />
                <Box>
                  <Text
                    textStyle={"3xl"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                  >
                    Enter OTP
                  </Text>
                  <Text
                    textStyle={"xs"}
                    textAlign={"center"}
                    fontWeight={"light"}
                    color={"gray.500"}
                    mb={5}
                  >
                    We've sent an OTP to your mail,
                  </Text>
                  <Controller
                    control={control}
                    name="otp"
                    render={({ field }) => {
                      return (
                        <PinInput.Root
                          size={"xl"}
                          mb={5}
                          value={field.value}
                          onValueChange={(e) => field.onChange(e.value)}
                          otp
                          onValueComplete={() => handleSubmit(submitFn)()}
                        >
                          <PinInput.HiddenInput />
                          <PinInput.Control alignItems={"center"}>
                            <PinInput.Input index={0} />
                            <PinInput.Input index={1} />
                            <PinInput.Input index={2} />
                            <Separator w={5} />
                            <PinInput.Input index={3} />
                            <PinInput.Input index={4} />
                            <PinInput.Input index={5} />
                          </PinInput.Control>
                        </PinInput.Root>
                      );
                    }}
                  />

                  <Text
                    textStyle={"xs"}
                    textAlign={"center"}
                    fontWeight={"light"}
                    color={"gray.500"}
                    mb={4}
                  >
                    Do not share your code with anyone
                  </Text>

                  <Text
                    textStyle={"sm"}
                    textAlign={"center"}
                    fontWeight={"bold"}
                    color={"red.600"}
                    cursor={"pointer"}
                  >
                    Resend Code
                  </Text>
                </Box>
              </>
            )}
          </form>
          <Text
            textStyle={"xs"}
            fontWeight={"light"}
            pos={"absolute"}
            bottom={4}
            color={"gray.500"}
          >
            We won't share your details <Link href="#">Our Privacy policy</Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default ArtistLoginContainer;
