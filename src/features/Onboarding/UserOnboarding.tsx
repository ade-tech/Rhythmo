import {
  Avatar,
  AvatarGroup,
  Box,
  CheckboxGroup,
  Image,
  Input,
  InputGroup,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import InputGroupAbdone from "./InputGroup";
import ArtistSelect from "./ArtistSelect";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DualButtonFooter from "./DualButtonFooter";
import { useFetchArtists } from "../artist/useArtist";
import { MdError } from "react-icons/md";
import { useCurrentUser } from "@/contexts/currentUserContext";
import { useCreateProfile } from "../auth/useOnboarding";
import { useNavigate } from "react-router-dom";
import { getTimeDifference } from "@/utils/useTimeDifference";
import { toaster } from "@/components/ui/toaster";

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
    watch,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<OnboardingFormInputs>();
  const { data, isLoading } = useFetchArtists();
  const { currentUser } = useCurrentUser();

  const navigate = useNavigate();
  const { createProfile, isPending } = useCreateProfile();
  const userName = watch("Name");
  const favArtists: string[] = watch("Artist");
  const favArtistArray = data?.filter((curArtist) =>
    favArtists?.includes(curArtist.user_id)
  );
  const [isSending, setIsending] = useState<boolean>(false);

  const submitFn: SubmitHandler<OnboardingFormInputs> = (data) => {
    createProfile(
      {
        user_type: "user",
        user_id: currentUser?.data?.id ?? "",
        user_email: currentUser?.data?.email ?? "",
        fav_artist: data.Artist,
        full_name: data.Name,
        nickname: data.Name.split(" ")[0],
      },
      {
        onSuccess: () => {
          setIsending(true);

          navigate("/");
        },
        onError: () => {
          toaster.create({
            title: "❌ Error, check your inputs",
          });
        },
      }
    );
  };

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
        <form
          className="w-full h-full absolute flex items-center justify-center "
          onSubmit={() => handleSubmit(submitFn)()}
        >
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
              validateFn={(value) => {
                const valueNumber = getTimeDifference(value);

                if (valueNumber < 10) {
                  return "You have to be a minimum of 16 years to open an account";
                } else {
                  return true;
                }
              }}
            />
          )}
          {onboardingState === 3 && (
            <Box
              w={"1/3"}
              h={"4/5"}
              display={"flex"}
              flexDir={"column"}
              alignItems={"center"}
              gap={4}
            >
              {isLoading ? (
                <Spinner size={"lg"} color={"green.600"} />
              ) : (
                <>
                  <Text textStyle={"2xl"} fontWeight={"bold"}>
                    Select 3 or more artist that you like.
                  </Text>
                  <InputGroup startElement={<HiSearch size={20} />}>
                    <Input bg={"gray.950"} size={"lg"} placeholder="Search" />
                  </InputGroup>

                  <Controller<OnboardingFormInputs>
                    name={"Artist"}
                    control={control}
                    rules={{
                      validate: (value) =>
                        Array.isArray(value) && value.length >= 3
                          ? true
                          : "Select at least three Artist",
                    }}
                    render={({ field }) => (
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
                        pos={"relative"}
                      >
                        <CheckboxGroup
                          value={
                            Array.isArray(field.value) ? field.value : undefined
                          }
                          onValueChange={field.onChange}
                          w={"full"}
                          display={"grid"}
                          gridTemplateColumns={"repeat(4, 1fr)"}
                          overflow={"hidden"}
                        >
                          {data?.map((artist) => (
                            <ArtistSelect
                              key={artist.user_id}
                              value={artist.user_id}
                              image={artist.profiles.avatar_url}
                              artistName={artist.profiles.nickname}
                            />
                          ))}
                        </CheckboxGroup>
                        {errors.Artist?.message && (
                          <Box
                            w={"full"}
                            pos={"absolute"}
                            bottom={0}
                            zIndex={10}
                            bgGradient={"to-t"}
                            gradientTo={"blackAlpha.100"}
                            gradientFrom={"blackAlpha.600"}
                            color={"red.500"}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            gap={1}
                            h={"3rem"}
                          >
                            <MdError />
                            <Text>{errors.Artist.message}</Text>
                          </Box>
                        )}
                      </Box>
                    )}
                  />

                  <DualButtonFooter
                    backAction={() => setOnboardingState((cur) => cur - 1)}
                    buttonTitle="Submit"
                    action={handleSubmit(submitFn)}
                  />
                </>
              )}
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
      {(isPending || isSending) && (
        <Box
          pos={"absolute"}
          w={"full"}
          h={"full"}
          bg={"gray.950"}
          zIndex={20}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          top={0}
        >
          <Text fontWeight={"bold"} textStyle={"4xl"} mb={3}>
            Great Picks {userName.split(" ")[0]}
          </Text>
          <AvatarGroup size={"2xl"}>
            {favArtistArray?.map((curArtist, i) =>
              i < 3 ? (
                <Avatar.Root key={curArtist.user_id}>
                  <Avatar.Fallback name={curArtist.profiles.nickname} />
                  <Avatar.Image src={curArtist.profiles.avatar_url} />
                </Avatar.Root>
              ) : null
            )}
          </AvatarGroup>
        </Box>
      )}
    </Box>
  );
};

export default UserOnboarding;
