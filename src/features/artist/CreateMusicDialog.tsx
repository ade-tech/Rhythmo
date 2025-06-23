import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Box,
  Button,
  ButtonGroup,
  CheckboxCard,
  CheckboxGroup,
  ColorPicker,
  Dialog,
  Field,
  Image,
  Input,
  InputGroup,
  parseColor,
  Portal,
  Span,
  Spinner,
  Steps,
  Text,
} from "@chakra-ui/react";
import ArtistDropZone from "./ArtistDropZone";
import { PiFileImage } from "react-icons/pi";
import { LuFileAudio } from "react-icons/lu";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCurrentArtist } from "@/contexts/currentArtistContext";
import { GENRES } from "@/helpers/constants";
import { useUploadSong } from "../tracks/useSong";
import { toaster } from "@/components/ui/toaster";

interface createButtonProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface CreateMusicProps {
  title: string;
  album?: string;
  audio: File;
  coverImage: File;
  producer: string;
  composer: string;
  genre: string[];
  prominent_color: string;
  duration: number;
  artist: string;
  artist_id: string;
}
const CreateMusicDialog = ({ title, icon, description }: createButtonProps) => {
  const { currentArtist } = useCurrentArtist();
  const [duration, setDuration] = useState<number>(0);
  const {
    register,
    formState: { errors },
    trigger,
    resetField,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
  } = useForm<CreateMusicProps>({
    mode: "onBlur",
  });
  const audioFile = watch("audio");
  const imageFile = watch("coverImage");
  const stringsInputs = watch(["title", "album"]);

  const [stepIndex, setStepIndex] = useState<number>(0);
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const { mutate, isPending, error } = useUploadSong();

  function resetForm() {
    setStepIndex(0);
    reset();
    setImageURL(undefined);
  }

  useEffect(() => {
    if (!audioFile) return;
    const audioUrl = new Audio(URL.createObjectURL(audioFile));
    const handleMetadata = () => setDuration(audioUrl.duration);

    audioUrl.addEventListener("loadedmetadata", handleMetadata);

    return () => audioUrl.removeEventListener("loadedmetadata", handleMetadata);
  }, [audioFile]);

  useEffect(() => {
    if (!imageFile) return;
    const imageReader = new FileReader();

    imageReader.onload = (ev: ProgressEvent<FileReader>) => {
      if (ev.target && typeof ev.target.result === "string") {
        setImageURL(ev.target.result);
      }
    };

    imageReader.readAsDataURL(imageFile);
  }, [imageFile]);

  async function handleStepsAction() {
    if (stepIndex === 0) {
      const isValid = await trigger(["title", "genre"]);
      if (isValid) setStepIndex((cur) => cur + 1);
      return;
    }
    if (stepIndex === 1) {
      const isValid = await trigger(["audio"]);
      setValue("duration", duration);
      if (isValid) setStepIndex((cur) => cur + 1);
      return;
    }
    if (stepIndex === 2) {
      const isValid = await trigger(["coverImage", "prominent_color"]);
      if (isValid) setStepIndex((cur) => cur + 1);
      return;
    }
    if (stepIndex === 3) {
      const isValid = await trigger(["album", "producer", "composer"]);
      if (isValid) setStepIndex((cur) => cur + 1);
      return;
    }
    if (stepIndex === 4) {
      setStepIndex((cur) => cur + 1);
      handleSubmit(submitFn)();
    }
  }
  const submitFn: SubmitHandler<CreateMusicProps> = (data) => {
    if (!currentArtist || !currentArtist.data || !currentArtist.profileInfo)
      return;
    const allData = {
      ...data,
      artist_id: currentArtist.data.id,
      artist: currentArtist.profileInfo.profiles.nickname,
    };
    mutate(
      { data: allData, id: currentArtist.data.id },
      {
        onSuccess: () =>
          toaster.create({
            title: "🥳 Your Song is now live",
          }),

        onError: () =>
          toaster.create({
            title: "We could not upload the song",
          }),
      }
    );
  };

  return (
    <Dialog.Root size={"lg"}>
      <form>
        <Dialog.Trigger asChild>
          <Button
            flexBasis={"1/2"}
            m={0}
            w={"full"}
            h={"full"}
            rounded={"lg"}
            variant={"outline"}
            textStyle={"4xl"}
            color={"gray.400"}
            borderColor={"gray.800"}
            _hover={{
              borderColor: "green.800",
              bg: "green.800/10",
              color: "green.50",
            }}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            pb={4}
            justifyContent={"center"}
          >
            <Box as={icon} boxSize={14} />
            <Text>{title}</Text>
            <Text
              textStyle={"sm"}
              w={"3/4"}
              textWrap={"wrap"}
              color={"gray.600"}
            >
              {description}
            </Text>
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop bg={"black/60"} />
          <Dialog.Positioner display={"flex"} alignItems={"center"}>
            <Dialog.Content bg={"gray.950"} color={"white"}>
              <Dialog.Header mb={3} display={"flex"} flexDir={"column"} gap={0}>
                <Dialog.Title>Let's Add Some Music.</Dialog.Title>
                <Text textStyle={"xs"} fontWeight={"normal"} color={"gray.400"}>
                  Share your latest track with the world—add your song details,
                  upload the audio, and we’ll handle the rest.
                </Text>
              </Dialog.Header>
              <Steps.Root
                size={"xs"}
                step={stepIndex}
                bg={"gray.950"}
                count={5}
                variant={"subtle"}
              >
                <Dialog.Body display={"flex"} flexDir={"column"}>
                  <Steps.List mb={2}>
                    <Steps.Item index={0} title="Upload Song">
                      <Steps.Indicator
                        color={"white"}
                        _complete={{ bg: "gray.800" }}
                        bg={"gray.900"}
                      />
                      <Steps.Title textStyle={"2xs"} color={"white"}>
                        Song Info
                      </Steps.Title>
                      <Steps.Separator bg={"gray.800"} />
                    </Steps.Item>
                    <Steps.Item index={1} title="Upload Song">
                      <Steps.Indicator
                        color={"white"}
                        _incomplete={{ bg: "gray.700" }}
                        bg={"gray.900"}
                      />
                      <Steps.Title textStyle={"2xs"} color={"white"}>
                        Audio Details
                      </Steps.Title>
                      <Steps.Separator bg={"gray.800"} />
                    </Steps.Item>

                    <Steps.Item index={2} title="Upload Song">
                      <Steps.Indicator
                        color={"white"}
                        _incomplete={{ bg: "gray.700" }}
                        bg={"gray.900"}
                      />
                      <Steps.Title textStyle={"2xs"} color={"white"}>
                        Cover Image
                      </Steps.Title>
                      <Steps.Separator bg={"gray.800"} />
                    </Steps.Item>
                    <Steps.Item index={3} title="Upload Song">
                      <Steps.Indicator
                        color={"white"}
                        _incomplete={{ bg: "gray.700" }}
                        bg={"gray.900"}
                      />
                      <Steps.Title textStyle={"2xs"} color={"white"}>
                        Credits
                      </Steps.Title>
                      <Steps.Separator bg={"gray.800"} />
                    </Steps.Item>
                    <Steps.Item index={4} title="Upload Song">
                      <Steps.Indicator
                        color={"white"}
                        _incomplete={{ bg: "gray.700" }}
                        bg={"gray.900"}
                      />
                      <Steps.Title textStyle={"2xs"} color={"white"}>
                        Finish
                      </Steps.Title>
                      <Steps.Separator bg={"gray.800"} />
                    </Steps.Item>
                  </Steps.List>
                  <Steps.Content
                    index={0}
                    pt={5}
                    display={"flex"}
                    flexDir={"column"}
                    gap={3}
                    minH={"15rem"}
                  >
                    <Field.Root invalid={!!errors.title}>
                      <Field.Label>Song Title</Field.Label>
                      <Input
                        {...register("title", {
                          required: "You have to include a title",
                        })}
                        placeholder="what's the name of the song?"
                        size={"lg"}
                        bg={"none"}
                        borderColor={"gray.800"}
                        focusRing={"none"}
                      />
                      <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
                    </Field.Root>
                    <Box mt={4}>
                      <Text>What type of song is it</Text>
                      <Controller
                        control={control}
                        name={"genre"}
                        rules={{
                          required: "You have to select at least one Genre!",
                        }}
                        render={({ field }) => (
                          <CheckboxGroup
                            w={"full"}
                            gap={3}
                            display={"grid"}
                            gridTemplateColumns={"repeat(5  , 1fr)"}
                            mt={2}
                            value={
                              Array.isArray(field.value)
                                ? field.value
                                : undefined
                            }
                            onValueChange={field.onChange}
                          >
                            {GENRES.map((curGenre) => (
                              <CheckboxCard.Root
                                key={curGenre}
                                colorPalette={"green"}
                                bg={"gray.950"}
                                value={curGenre}
                                rounded={"full"}
                                display={"flex"}
                                alignItems={"center"}
                              >
                                <CheckboxCard.HiddenInput />
                                <CheckboxCard.Content px={4} py={2}>
                                  <CheckboxCard.Label
                                    textStyle={"sm"}
                                    textAlign={"center"}
                                  >
                                    {curGenre}
                                  </CheckboxCard.Label>
                                </CheckboxCard.Content>
                              </CheckboxCard.Root>
                            ))}
                          </CheckboxGroup>
                        )}
                      />
                    </Box>
                    {errors.genre && (
                      <Text color="red.500">{errors.genre?.message}</Text>
                    )}
                  </Steps.Content>
                  <Steps.Content flex={1} index={1} minH={"15rem"}>
                    <ArtistDropZone
                      control={control}
                      reset={resetField}
                      setValue={setValue}
                      name="audio"
                      errors={errors}
                      caption="Drag and drop the song audio here"
                      icon={
                        <Box
                          as={LuFileAudio}
                          strokeWidth={1}
                          color={"gray.500"}
                          boxSize={16}
                        />
                      }
                      preview={audioFile}
                      acceptedFiles={[
                        "audio/mpeg",
                        "audio/wav",
                        "audio/ogg",
                        "audio/webm",
                        "audio/mp4",
                        "audio/x-m4a",
                        "audio/x-ms-wma",
                      ]}
                    />
                  </Steps.Content>
                  <Steps.Content
                    index={2}
                    pt={3}
                    display={"flex"}
                    flexDir={"column"}
                    minH={"15rem"}
                  >
                    <ArtistDropZone
                      errors={errors}
                      reset={resetField}
                      preview={imageFile}
                      setValue={setValue}
                      control={control}
                      name="coverImage"
                      caption="Drag and drop the cover image here"
                      icon={
                        <Box
                          as={PiFileImage}
                          strokeWidth={1}
                          color={"gray.500"}
                          boxSize={16}
                        />
                      }
                      acceptedFiles={[
                        "image/jpeg",
                        "image/png",
                        "image/gif",
                        "image/webp",
                        "image/svg+xml",
                        "image/bmp",
                        "image/tiff",
                      ]}
                      previewUrl={imageURL}
                    />
                    <ColorPicker.Root
                      w={"1/2"}
                      size={"sm"}
                      pt={5}
                      defaultValue={parseColor("#eb5e41")}
                    >
                      <ColorPicker.HiddenInput
                        {...register("prominent_color", {
                          required: "You have to select a Color",
                        })}
                      />
                      <ColorPicker.Label>
                        Promienent Color
                        <Span color="gray.500">(From the Cover Image)</Span>
                      </ColorPicker.Label>
                      <ColorPicker.Control>
                        <InputGroup
                          startElement={
                            <ColorPicker.ValueSwatch boxSize="4.5" />
                          }
                          endElementProps={{ px: "1" }}
                          endElement={
                            <ColorPicker.EyeDropper size="xs" variant="ghost" />
                          }
                        >
                          <ColorPicker.Input />
                        </InputGroup>
                      </ColorPicker.Control>
                    </ColorPicker.Root>
                  </Steps.Content>
                  <Steps.Content
                    index={3}
                    pt={5}
                    display={"flex"}
                    flexDir={"column"}
                    gap={3}
                    minH={"15rem"}
                  >
                    <Field.Root invalid={!!errors.album}>
                      <Field.Label>Song Album</Field.Label>
                      <Input
                        focusRing={"none"}
                        size={"lg"}
                        {...register("album", {
                          validate: (value) => {
                            if (value && value.length < 3)
                              return "Enter a correct Album name!";
                            else {
                              return true;
                            }
                          },
                        })}
                        resize={"none"}
                        bg={"none"}
                        borderColor={"gray.800"}
                        placeholder="Enter a short description about the song."
                      />
                      <Field.ErrorText>{errors.album?.message}</Field.ErrorText>
                    </Field.Root>
                    <Field.Root invalid={!!errors.producer}>
                      <Field.Label>Song Producer</Field.Label>
                      <Input
                        {...register("producer", {
                          required: "You have to include a Producer",
                        })}
                        placeholder="Who produced the song?"
                        size={"lg"}
                        bg={"none"}
                        borderColor={"gray.800"}
                        focusRing={"none"}
                      />
                      <Field.ErrorText>
                        {errors.producer?.message}
                      </Field.ErrorText>
                    </Field.Root>
                    <Field.Root invalid={!!errors.composer}>
                      <Field.Label>Song Composer</Field.Label>
                      <Input
                        {...register("composer", {
                          required: "You have to include a Composer",
                        })}
                        placeholder="Who composed the song?"
                        size={"lg"}
                        bg={"none"}
                        borderColor={"gray.800"}
                        focusRing={"none"}
                      />
                      <Field.ErrorText>
                        {errors.composer?.message}
                      </Field.ErrorText>
                    </Field.Root>
                  </Steps.Content>
                  <Steps.Content
                    pt={5}
                    index={4}
                    display={"flex"}
                    flexDir={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={5}
                    color={"white"}
                    minH={"15rem"}
                  >
                    <Box textAlign={"center"} mb={2}>
                      <Text textStyle={"2xl"} fontWeight={"bold"}>
                        Review and Publish
                      </Text>
                      <Text
                        textStyle={"xs"}
                        fontWeight={"normal"}
                        color={"gray.400"}
                      >
                        Make sure everything looks good. You can always go back
                        to make changes.
                      </Text>
                    </Box>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={5}
                      w={"full"}
                    >
                      <Image
                        w={"6rem"}
                        h={"6rem"}
                        src={imageURL}
                        objectFit={"cover"}
                        objectPosition={"center"}
                        rounded={"lg"}
                      />
                      <Box>
                        <Text textStyle={"2xl"} fontWeight={"bold"}>
                          {stringsInputs[0]}
                        </Text>
                        <Text
                          color={"gray.500"}
                          textStyle={"md"}
                          fontWeight={"semibold"}
                        >
                          {currentArtist?.profileInfo?.profiles.nickname!}
                        </Text>
                        <Text textStyle={"xs"} fontWeight={"light"}>
                          {stringsInputs[1]}
                        </Text>
                      </Box>
                    </Box>
                  </Steps.Content>
                  <Steps.CompletedContent
                    pt={5}
                    display={"flex"}
                    flexDir={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={5}
                    color={"white"}
                    minH={"15rem"}
                  >
                    {isPending ? (
                      <Box display={"flex"} gap={3}>
                        <Spinner color={"green.500"} size={"xl"} />
                        <Text textStyle={"2xl"} fontWeight={"bold"}>
                          {" "}
                          Uploading Song ....
                        </Text>
                      </Box>
                    ) : error ? (
                      <Text textStyle={"lg"} fontWeight={"bold"}>
                        An Error Occured
                      </Text>
                    ) : (
                      <Box
                        w={"full"}
                        h={"full"}
                        flexDir={"column"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <DotLottieReact
                          src="https://lottie.host/92e3061b-c98d-4727-92db-c5c1c1323269/SOKXhqcn3O.lottie"
                          style={{
                            width: "9rem",
                            height: "8rem",
                            margin: "0,auto",
                          }}
                          autoplay
                        />
                        <Text textStyle={"2xl"} fontWeight={"bold"}>
                          You album is now Live!
                        </Text>
                      </Box>
                    )}
                  </Steps.CompletedContent>
                </Dialog.Body>
                <Dialog.Footer>
                  <ButtonGroup size="sm" variant="outline">
                    <Steps.NextTrigger asChild>
                      {stepIndex <= 4 ? (
                        <Box display="flex" gap={2}>
                          <Button
                            disabled={stepIndex === 0}
                            rounded={"full"}
                            borderColor={"gray.800"}
                            color={"white"}
                            _hover={{
                              bg: "blackAlpha.300",
                            }}
                            onClick={() => setStepIndex((cur) => cur - 1)}
                          >
                            Prev
                          </Button>
                          <Button
                            onClick={handleStepsAction}
                            rounded={"full"}
                            borderColor={"gray.800"}
                            color={"white"}
                            _hover={{
                              bg: "blackAlpha.300",
                            }}
                            disabled={isPending}
                          >
                            {stepIndex === 4 ? "Publish" : "Next"}
                          </Button>
                        </Box>
                      ) : (
                        <Dialog.CloseTrigger
                          borderWidth={"1px"}
                          borderColor={"gray.800"}
                          px={3}
                          py={2}
                          rounded={"full"}
                          onClick={resetForm}
                          disabled={isPending}
                          color={"white"}
                          _hover={{
                            bg: "blackAlpha.300",
                          }}
                        >
                          Close
                        </Dialog.CloseTrigger>
                      )}
                    </Steps.NextTrigger>
                  </ButtonGroup>
                </Dialog.Footer>
              </Steps.Root>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </form>
    </Dialog.Root>
  );
};
export default CreateMusicDialog;
