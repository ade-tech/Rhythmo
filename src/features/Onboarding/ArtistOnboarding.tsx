import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import ArtistInputGroup from "./ArtistInputGroup";
import LocationSelect from "./LocationSelect";
import GenereSelect from "./GenereSelect";
import BioUpdate from "./BioUpdate";
import { getTimeDifference } from "@/utils/useTimeDifference";
export type ArtistOnboardingFormInputs = {
  Name: string;
  Nickname: string;
  Location: string;
  Date: string;
  Genre: string[];
  Profile_image: FileList;
  Cover_image?: FileList;
  Bio: string;
  Instagram_link: string;
  Tiktok_link: string;
};

export function ArtistOnboarding() {
  const [onboardingState, setOnboardingState] = useState<number>(1);
  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<ArtistOnboardingFormInputs>();

  return (
    <Box
      w={"full"}
      h={"100dvh"}
      bgPos={"center"}
      bgSize={"cover"}
      backdropBlur={"20px"}
      bg={"blackAlpha.400"}
      pos={"relative"}
    >
      <Image
        src="/artistbg.webp"
        w={"full"}
        h={"full"}
        filter="blur(10px)"
        opacity={"0.15"}
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
        {onboardingState === 1 && (
          <ArtistInputGroup
            title="What's your real name?"
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
          <ArtistInputGroup
            title="What’s your stage name?"
            buttonLabel="Proceed"
            InputType="text"
            Increamental={setOnboardingState}
            onboardState={onboardingState}
            placeholder="Enter your stage name / nickname"
            register={register}
            fieldName="Nickname"
            trigger={trigger}
            errors={errors}
          />
        )}
        {onboardingState === 3 && (
          <LocationSelect
            errors={errors}
            trigger={trigger}
            Increamental={setOnboardingState}
            title="Where are you from?"
            control={control}
            setValue={setValue}
          />
        )}
        {onboardingState === 5 && (
          <GenereSelect
            control={control}
            errors={errors}
            Increamental={setOnboardingState}
            trigger={trigger}
          />
        )}

        {onboardingState === 4 && (
          <ArtistInputGroup
            title="When were you born?"
            buttonLabel="Proceed"
            InputType="date"
            Increamental={setOnboardingState}
            onboardState={onboardingState}
            placeholder="Enter your stage name / nickname"
            register={register}
            fieldName="Date"
            trigger={trigger}
            errors={errors}
            validateFn={(value) => {
              const differnceInYears = getTimeDifference(value as string);
              if (differnceInYears < 16) {
                return "You have to be at least 16 years to join Rhythmo!";
              } else {
                return true;
              }
            }}
          />
        )}
        {onboardingState === 6 && (
          <BioUpdate
            control={control}
            watch={watch}
            register={register}
            errors={errors}
            Increamental={setOnboardingState}
            handleSubmit={handleSubmit}
          />
        )}
      </Box>
    </Box>
  );
}

export default ArtistOnboarding;
