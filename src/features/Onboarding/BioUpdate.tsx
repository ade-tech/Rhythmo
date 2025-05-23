import {
  Box,
  Field,
  Image,
  Input,
  Link,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { HiInformationCircle, HiOutlinePlus } from "react-icons/hi";
import { PiCameraPlusFill } from "react-icons/pi";
import DualButtonFooter from "./DualButtonFooter";
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { ArtistOnboardingFormInputs } from "./ArtistOnboarding";
import { useNavigate } from "react-router-dom";
import { useCurrentArtist } from "@/contexts/currentArtistContext";
import { useCreateArtistProfile } from "../auth/useOnboarding";
import { toaster } from "@/components/ui/toaster";
type BioUpdateProps = {
  Increamental?: React.Dispatch<React.SetStateAction<number>>;
  register: UseFormRegister<ArtistOnboardingFormInputs>;
  errors: FieldErrors<ArtistOnboardingFormInputs>;
  control: Control<ArtistOnboardingFormInputs>;
  watch: UseFormWatch<ArtistOnboardingFormInputs>;
  handleSubmit: UseFormHandleSubmit<ArtistOnboardingFormInputs>;
};

export function BioUpdate({
  Increamental,
  control,
  handleSubmit,
  errors,
  watch,
  register,
}: BioUpdateProps) {
  const coverImageRef = useRef<HTMLInputElement | null>(null);
  const profileRef = useRef<HTMLInputElement | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );
  const image = watch("Profile_image");
  const cover = watch("Cover_image");

  const { createArtist, isPending } = useCreateArtistProfile();
  const { currentArtist } = useCurrentArtist();
  const navigate = useNavigate();

  const submitFn: SubmitHandler<ArtistOnboardingFormInputs> = (data) => {
    if (!currentArtist || !currentArtist.data) {
      toaster.create({
        title: "❌ You have to sign in first!",
      });
      return;
    }
    createArtist(
      {
        profileDetails: {
          user_email: currentArtist.data.email!,
          user_id: currentArtist.data.id!,
          user_type: "artist",
          nickname: data.Nickname,
          full_name: data.Name,
        },
        songs: null,
        songs_count: 0,
        followers_count: 0,
        monthly_plays: 0,
        user_id: currentArtist.data.id!,
        about: data.Bio,
        cover_image: data?.Cover_image?.[0],
        profile_image: data.Profile_image[0],
        location: data.Location,
      },
      {
        onSuccess: () => navigate("/artist"),
        onError: (error) =>
          toaster.create({
            title: error.message,
          }),
      }
    );
  };

  useEffect(() => {
    if (!image || image.length < 1) return;
    const file = image[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result !== null) {
        setProfilePreview(reader.result as string);
      }
    };

    reader.readAsDataURL(file);
  }, [image]);

  useEffect(() => {
    if (!cover || cover.length < 1) return;
    const file = cover[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result !== null) {
        setCoverImagePreview(reader.result as string);
      }
    };

    reader.readAsDataURL(file);
  }, [cover]);

  return (
    <Box
      w={"1/3"}
      h={"1/2"}
      display={"flex"}
      pos={"relative"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      data-state={"open"}
      gap={4}
      _open={{
        animation: "400ms fadeIn  ease-out ",
      }}
      _closed={{
        animation: "400ms fadeOut  ease-out ",
      }}
    >
      <Text textStyle={"4xl"} lineHeight={"0.9"} fontWeight={"semibold"}>
        Complete your Profile
      </Text>
      <Box flex={"1"} w={"full"} display={"flex"} justifyContent={"center"}>
        <Box
          mt={4}
          w={"95%"}
          h={"8rem"}
          borderWidth={"2px"}
          borderColor={"green.700"}
          borderStyle={"dashed"}
          rounded={"md"}
          bg={"green.subtle"}
          display={"flex"}
          justifyContent={"center"}
          flexDir={"column"}
          alignItems={"center"}
          gap={2}
        >
          <Controller
            control={control}
            name="Cover_image"
            render={({ field }) => (
              <Input
                type="file"
                display={"none"}
                ref={coverImageRef}
                accept="image/jpeg, image/png, image/svg+xml"
                name={field.name}
                onChange={(e) => field.onChange(e.target.files)}
              />
            )}
          />
          {!coverImagePreview && (
            <>
              <Box as={FaImage} boxSize={8} color={"green.500"} />
              <Box
                w={"full"}
                display={"flex"}
                justifyContent={"center"}
                textStyle={"sm"}
              >
                <Text> Drag your cover photo here or</Text>
                <Link
                  onClick={() =>
                    coverImageRef.current
                      ? coverImageRef.current.click()
                      : undefined
                  }
                  textDecor={"underline"}
                  color={"green.500"}
                  py={0}
                  ml={1}
                >
                  Browse
                </Link>
              </Box>
            </>
          )}
          {coverImagePreview && (
            <Box
              w={"full"}
              h={"full"}
              p={4}
              display={"flex"}
              alignItems={"center"}
              gap={4}
            >
              <Image
                w={"10rem"}
                h={"full"}
                src={coverImagePreview}
                objectFit={"cover"}
                objectPosition={"center"}
                rounded={"lg"}
              />
              <Box>
                <Text
                  textStyle={"lg"}
                  fontWeight={"semibold"}
                  lineHeight={1.05}
                  color={"green.400"}
                >
                  {cover
                    ? `${cover[0].name
                        .split(".")[0]
                        .slice(0, 10)}... .${cover[0].name.split(".").pop()}`
                    : ""}
                </Text>
                <Text textStyle={"sm"}>
                  {cover
                    ? `${(cover[0].size / (1024 * 1024)).toFixed(2)}MB`
                    : ""}
                </Text>
                <Box w={"full"} display={"flex"} textStyle={"sm"} py={3}>
                  <Text textStyle={"xs"}> Drag your cover to replace or</Text>
                  <Link
                    onClick={() =>
                      coverImageRef.current
                        ? coverImageRef.current.click()
                        : undefined
                    }
                    textDecor={"underline"}
                    color={"green.500"}
                    textStyle={"xs"}
                    py={0}
                    ml={1}
                  >
                    Browse
                  </Link>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        w={"full"}
        display={"flex"}
        alignItems={"flex-start"}
        h={"10rem"}
        gap={5}
        px={3}
        mt={2}
      >
        <Controller
          control={control}
          rules={{
            required: "You must have a profile picture",
          }}
          name="Profile_image"
          render={({ field }) => (
            <Input
              type="file"
              display={"none"}
              ref={profileRef}
              accept="image/jpeg, image/png, image/svg+xml"
              name={field.name}
              onChange={(e) => field.onChange(e.target.files)}
            />
          )}
        />
        <Box
          h={"9rem"}
          w={"9rem"}
          borderWidth={"2px"}
          borderColor={errors.Profile_image ? "red.700" : "green.700"}
          borderStyle={"dashed"}
          rounded={"full"}
          bg={errors.Profile_image ? "red.subtle" : "green.subtle"}
          display={"flex"}
          justifyContent={"center"}
          flexDir={"column"}
          position={"relative"}
          alignItems={"center"}
          gap={2}
          cursor={"pointer"}
          onClick={() => {
            profileRef.current ? profileRef.current.click() : undefined;
          }}
          className="group"
        >
          <Box
            w={"full"}
            h={"full"}
            rounded={"full"}
            bg={errors.Profile_image ? "red.900/70" : "green.900/70"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            pos={"absolute"}
            zIndex={1}
            opacity={0}
            transition={"opacity 0.2s ease-in-out"}
            _groupHover={{
              opacity: 1,
              transition: "opacity 0.2s ease-in-out",
            }}
          >
            <Box
              as={HiOutlinePlus}
              boxSize={8}
              color={errors.Profile_image ? "red.500" : "green.500"}
            />
          </Box>
          {profilePreview && (
            <Image
              src={profilePreview}
              width={"full"}
              height={"full"}
              rounded={"full"}
              pos={"absolute"}
              objectFit={"cover"}
              objectPosition={"center"}
            />
          )}
          <Box
            as={PiCameraPlusFill}
            boxSize={8}
            color={errors.Profile_image ? "red.500" : "green.500"}
          />
          <Text textStyle={"xs"} textAlign={"center"}>
            Click Here to
            <br />
            Upload
          </Text>
        </Box>

        <Field.Root flex={1}>
          <Textarea
            {...register("Bio", {
              required: "You must have a bio",
              validate: (value) =>
                value.length < 50
                  ? "Bio should be at least 50 characters"
                  : true,
            })}
            resize={"none"}
            h={"8rem"}
            placeholder="Tell us about yourself..."
            bg={"gray.950"}
            focusRing={"none"}
          />

          <Field.HelperText
            display={"flex"}
            color={"white"}
            justifyContent={"center"}
            gap={1}
          >
            {errors.Bio ? (
              <Text
                color={"red.500"}
                display={"flex"}
                gap={1}
                alignItems={"center"}
              >
                <HiInformationCircle />
                {errors.Bio.message}
              </Text>
            ) : (
              <>
                <HiInformationCircle />
                About 50 words is good.
              </>
            )}
          </Field.HelperText>
        </Field.Root>
      </Box>
      <Box textAlign={"left"} w={"full"} display={"flex"}>
        {errors.Profile_image && (
          <Text
            textStyle={"xs"}
            color={"red.500"}
            bottom={0}
            lineHeight={1}
            display={"flex"}
            gap={1}
            flexBasis={"1/2"}
          >
            <HiInformationCircle />
            {errors.Profile_image.message}
          </Text>
        )}
      </Box>
      <DualButtonFooter
        buttonTitle={isPending ? <Spinner color={"gray.950"} /> : "Submit"}
        colorPallete="green"
        backAction={() => {
          if (Increamental !== undefined) {
            Increamental((cur) => cur - 1);
          }
        }}
        nextDisabled={isPending}
        action={handleSubmit(submitFn)}
      />
    </Box>
  );
}

export default BioUpdate;
