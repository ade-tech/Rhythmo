import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { useCreateProfile } from "../auth/useOnboarding";
// import { useCurrentUser } from "@/contexts/currentUserContext";
// import { useNavigate } from "react-router-dom";
import ArtistInputGroup from "./ArtistInputGroup";
import LocationSelect from "./LocationSelect";
import GenereSelect from "./GenereSelect";
import BioUpdate from "./BioUpdate";
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
    trigger,
    formState: { errors },
  } = useForm<ArtistOnboardingFormInputs>();
  // const { createProfile, isPending } = useCreateProfile();
  // const { currentUser } = useCurrentUser();
  // const navigate = useNavigate();

  // const submitFn: SubmitHandler<ArtistOnboardingFormInputs> = (data) => {
  //   createProfile(
  //     {
  //       user_type: "user",
  //       user_id: currentUser?.data?.id ?? "",
  //       user_email: currentUser?.data?.email ?? "",
  //       fav_artist: data.Artist,
  //       full_name: data.Name,
  //       nickname: data.Name.split(" ")[0],
  //     },
  //     {
  //       onSuccess: () => {
  //         setIsending(true);

  //         navigate("/");
  //       },
  //       onError: () => {
  //         toaster.create({
  //           title: "❌ Error, check your inputs",
  //         });
  //       },
  //     }
  //   );
  // };

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
        src="/artistbg.webp"
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
            Increamental={setOnboardingState}
            title="Where are you from?"
          />
        )}
        {onboardingState === 4 && (
          <GenereSelect Increamental={setOnboardingState} />
        )}

        {onboardingState === 5 && (
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
          />
        )}
        {onboardingState === 6 && (
          <BioUpdate Increamental={setOnboardingState} />
        )}
      </Box>
    </Box>
  );
}

export default ArtistOnboarding;
