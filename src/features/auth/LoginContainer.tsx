/**
 * LoginContainer Component
 *
 * Handles the login UI and logic for both users and artists, depending on props.
 * Provides form controls, validation, and authentication actions.
 *
 * Usage:
 * - Used as a shared login page for user and artist accounts.
 */

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
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { SubmitHandler, Controller, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { useSendOTP, useVerifyWithOTP } from "./useOnboarding";
import { toaster } from "@/components/ui/toaster";
import { RhythmoUser, useCurrentUser } from "@/contexts/currentUserContext";
import { useRef, useState } from "react";
import {
  RhythmoArtist,
  useCurrentArtist,
} from "@/contexts/currentArtistContext";

type Input = {
  email: string;
  otp: string[];
};
type loginProps = {
  userType: "user" | "artist";
  colorPallete: "red" | "green";
  title: string;
  signInNav: string;
  signUpNav: string;
  bgImage: string;
};

export function LoginContainer({
  userType,
  colorPallete,
  title,
  signInNav,
  signUpNav,
  bgImage,
}: loginProps) {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm<Input>();
  const navigate = useNavigate();
  const { setCurrentUser } = useCurrentUser();
  const { setCurrentArtist } = useCurrentArtist();
  const emailString = watch("email");

  const { mutate: getIn, isPending } = useVerifyWithOTP();
  const { sendOTP, isPending: isSending } = useSendOTP();
  const [canResendOTP, setCanResendOTP] = useState<boolean>(false);
  const timeoutID = useRef<number | null>(null);

  const submitFn: SubmitHandler<Input> = (data) => {
    if (!data.email || !data.otp) throw new Error("Empty fields!");
    getIn(
      { email: data.email, token: data.otp.join(""), userType },
      {
        onSuccess: (data) => {
          if (userType === "user") {
            setCurrentUser(data as RhythmoUser);
          } else {
            setCurrentArtist(data as RhythmoArtist);
          }
          toaster.create({
            title: "✅ OTP has been verified!",
          });
          if (
            typeof data?.profileInfo === "string" ||
            data.profileInfo === null
          ) {
            navigate(signUpNav);
          } else {
            navigate(signInNav);
          }
        },

        onError: (error) => {
          toaster.create({
            title: error.message,
          });
        },
      }
    );
  };
  function resendTimeout() {
    if (timeoutID.current) {
      clearTimeout(timeoutID.current);
      timeoutID.current = null;
    }
    timeoutID.current = window.setTimeout(() => {
      setCanResendOTP(true);
    }, 100000);
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const page: number = Number(searchParams.get("page")) || 1;
  return (
    <Box
      w={"full"}
      h={"100dvh"}
      bgPos={"center"}
      bgSize={"cover"}
      backdropBlur={"20px"}
      bg={"gray.950"}
      color={"white"}
      pos={"relative"}
    >
      <Image
        src={bgImage}
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
          {isPending && (
            <Box
              w={"full"}
              h={"full"}
              top={0}
              pos={"absolute"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              bg={"blackAlpha.800"}
              zIndex={10}
            >
              <Spinner color={`${colorPallete}.500`} size={"xl"} />
            </Box>
          )}
          <Text
            fontWeight={"bold"}
            textStyle={"3xl"}
            justifySelf={"flex-start"}
            display={page === 1 ? "block" : "none"}
            mt={5}
          >
            {title}
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
                    <Field.RequiredIndicator color={`${colorPallete}.600`} />
                  </Field.Label>
                  <Input
                    placeholder="name@domain.com"
                    size={"lg"}
                    borderColor={"gray.800"}
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
                  bg={`${colorPallete}.600`}
                  color={"black"}
                  disabled={isSending}
                  onClick={async () => {
                    const isValid = await trigger(["email"]);
                    const value = getValues().email;
                    if (isValid) {
                      sendOTP(value, {
                        onSuccess: () => {
                          setSearchParams({ page: "2" });
                          toaster.create({
                            description: "✅ OTP Sent Check your email",
                          });
                          resendTimeout();
                        },
                        onError: () =>
                          toaster.create({
                            title: "❌ We could not send the Code",
                          }),
                      });
                    }
                  }}
                >
                  {isSending ? (
                    <Spinner color={"gray.950"} size={"md"} />
                  ) : (
                    "Next"
                  )}
                </Button>
                <HStack display={"flex"} w={"2/3"}>
                  <Separator variant={"solid"} flex={1} colorPalette={"gray"} />
                  <Text>or</Text>
                  <Separator variant={"solid"} flex={1} bg={"gray.900"} />
                </HStack>
                <Button
                  w={"2/3"}
                  size={"lg"}
                  pos={"relative"}
                  rounded={"full"}
                  variant={"outline"}
                  borderColor={"gray.800"}
                  _hover={{
                    color: "black",
                  }}
                  color={"white"}
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
                  borderColor={"gray.800"}
                  p={1.5}
                  pos={"absolute"}
                  top={5}
                  borderWidth="1px"
                  alignSelf={"flex-start"}
                  onClick={() => {
                    setSearchParams({ page: "1" });
                  }}
                />
                <Box textAlign={"center"}>
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
                          <PinInput.Control
                            alignItems={"center"}
                            borderColor={"gray.800"}
                          >
                            <PinInput.Input
                              index={0}
                              borderColor={"gray.800"}
                            />
                            <PinInput.Input
                              index={1}
                              borderColor={"gray.800"}
                            />
                            <PinInput.Input
                              index={2}
                              borderColor={"gray.800"}
                            />
                            <Separator w={5} />
                            <PinInput.Input
                              index={3}
                              borderColor={"gray.800"}
                            />
                            <PinInput.Input
                              index={4}
                              borderColor={"gray.800"}
                            />
                            <PinInput.Input
                              index={5}
                              borderColor={"gray.800"}
                            />
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

                  <Button
                    variant={"ghost"}
                    rounded={"full"}
                    textStyle={"sm"}
                    textAlign={"center"}
                    fontWeight={"bold"}
                    color={`${colorPallete}.500`}
                    disabled={!canResendOTP}
                    onClick={() => {
                      sendOTP(emailString, {
                        onSuccess: () => {
                          toaster.create({
                            description: "✅ We've resent the OTP",
                          });
                          resendTimeout();
                        },
                        onError: () =>
                          toaster.create({
                            title: "❌ We could not resend the Code",
                          }),
                      });
                      setCanResendOTP(false);
                      resendTimeout();
                    }}
                  >
                    Resend Code
                  </Button>
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
            We won't share your details{" "}
            <Link color={"gray.200"} href="#">
              Our Privacy policy
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginContainer;
