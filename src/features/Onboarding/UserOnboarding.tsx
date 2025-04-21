import {
  Box,
  CheckboxGroup,
  Image,
  Input,
  InputGroup,
  Link,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import InputGroupAbdone from "./InputGroup";
import ArtistSelect from "./ArtistSelect";
import { useController, useForm } from "react-hook-form";
import DualButtonFooter from "./DualButtonFooter";

export type OnboardingFormInputs = {
  Name: string;
  Date: string;
  Artist: string[];
};

const UserOnboarding = () => {
  const [onboardingState, setOnboardingState] = useState<number>(1);
  const {
    register,
    control,
    trigger,
    formState: { errors },
  } = useForm<OnboardingFormInputs>();

  const { field } = useController({
    name: "Artist",
    control,
  });
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
        <form className="w-full h-full absolute flex items-center justify-center ">
          {onboardingState === 1 && (
            <InputGroupAbdone
              title="What's your name"
              buttonLabel="Proceed"
              InputType="text"
              Increamental={setOnboardingState}
              onboardState={onboardingState}
              placeholder="Enter your name"
              register={register}
              fieldName="Name"
              trigger={trigger}
              errors={errors}
            />
          )}
          {onboardingState === 2 && (
            <InputGroupAbdone
              register={register}
              title="When we're you born"
              buttonLabel="Proceed"
              InputType="date"
              Increamental={setOnboardingState}
              onboardState={onboardingState}
              fieldName="Date"
              trigger={trigger}
              errors={errors}
            />
          )}
          {onboardingState === 3 && (
            <Box
              w={"1/3"}
              h={"3/5"}
              display={"flex"}
              flexDir={"column"}
              alignItems={"center"}
              gap={4}
            >
              <Text textStyle={"2xl"} fontWeight={"bold"}>
                Select 3 or more artist that you like.
              </Text>
              <InputGroup startElement={<HiSearch size={20} />}>
                <Input bg={"gray.950"} size={"lg"} placeholder="Search" />
              </InputGroup>
              <Box
                w={"full"}
                flex={1}
                maxH={"50rem"}
                gap={2}
                p={2}
                overflow={"hidden"}
                overflowY={"auto"}
                scrollbar={"visible"}
                className="trend-group"
              >
                <CheckboxGroup
                  value={field.value}
                  w={"full"}
                  display={"grid"}
                  gridTemplateColumns={"repeat(4, 1fr)"}
                  overflow={"hidden"}
                >
                  <ArtistSelect />
                  <ArtistSelect />
                  <ArtistSelect />
                  <ArtistSelect />
                  <ArtistSelect />
                  <ArtistSelect />
                  <ArtistSelect />
                </CheckboxGroup>
                <DualButtonFooter
                  backAction={() => setOnboardingState((cur) => cur - 1)}
                  buttonTitle="Submit"
                />
              </Box>
            </Box>
          )}
        </form>
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
