import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  Field,
  Image,
  Input,
  Portal,
  Steps,
  Text,
  Textarea,
} from "@chakra-ui/react";
import ArtistDropZone from "./ArtistDropZone";
import { PiFileImage } from "react-icons/pi";
import { LuFileAudio } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCurrentArtist } from "@/contexts/currentArtistContext";

interface createButtonProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface CreateMusicProps {
  title: string;
  description: string;
  audio: File;
  coverImage: File;
}
const CreateMusicDialog = ({ title, icon, description }: createButtonProps) => {
  const { currentArtist } = useCurrentArtist();
  const {
    register,
    formState: { errors },
    trigger,
    resetField,
    watch,
    control,
    setValue,
  } = useForm<CreateMusicProps>({
    mode: "onBlur",
  });
  const audioFile = watch("audio");
  const imageFile = watch("coverImage");
  const stringsInputs = watch(["title", "description"]);

  const [stepIndex, setStepIndex] = useState<number>(0);
  const [imageURL, setImageURL] = useState<string>("");

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
    console.log(stepIndex);
    if (stepIndex === 0) {
      const isValid = await trigger(["title", "description"]);

      if (isValid) setStepIndex((cur) => cur + 1);
      return;
    }
    if (stepIndex === 1) {
      const isValid = await trigger(["audio"]);
      if (isValid) setStepIndex((cur) => cur + 1);
      return;
    }
    if (stepIndex === 2) {
      const isValid = await trigger(["coverImage"]);
      if (isValid) setStepIndex((cur) => cur + 1);
      return;
    }
  }

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
              <Dialog.Header display={"flex"} flexDir={"column"} gap={0}>
                <Dialog.Title>Let's Add Some Music.</Dialog.Title>
                <Text textStyle={"xs"} fontWeight={"normal"} color={"gray.400"}>
                  Share your latest track with the world—add your song details,
                  upload the audio, and we’ll handle the rest.
                </Text>
              </Dialog.Header>
              <Steps.Root
                step={stepIndex}
                bg={"gray.950"}
                count={3}
                variant={"subtle"}
              >
                <Dialog.Body>
                  <Steps.List>
                    <Steps.Item index={0} title="Upload Song">
                      <Steps.Indicator
                        color={"white"}
                        _complete={{ bg: "gray.800" }}
                        bg={"gray.900"}
                      />
                      <Steps.Title color={"white"}>Song Info</Steps.Title>
                      <Steps.Separator bg={"gray.800"} />
                    </Steps.Item>
                    <Steps.Item index={1} title="Upload Song">
                      <Steps.Indicator
                        color={"white"}
                        _incomplete={{ bg: "gray.700" }}
                        bg={"gray.900"}
                      />
                      <Steps.Title color={"white"}>Audio Details</Steps.Title>
                      <Steps.Separator bg={"gray.800"} />
                    </Steps.Item>

                    <Steps.Item index={2} title="Upload Song">
                      <Steps.Indicator
                        color={"white"}
                        _incomplete={{ bg: "gray.700" }}
                        bg={"gray.900"}
                      />
                      <Steps.Title color={"white"}>Cover Image</Steps.Title>
                      <Steps.Separator bg={"gray.800"} />
                    </Steps.Item>
                    <Steps.Item index={3} title="Upload Song">
                      <Steps.Indicator
                        color={"white"}
                        _incomplete={{ bg: "gray.700" }}
                        bg={"gray.900"}
                      />
                      <Steps.Title color={"white"}>Finish</Steps.Title>
                      <Steps.Separator bg={"gray.800"} />
                    </Steps.Item>
                  </Steps.List>
                  <Steps.Content
                    index={0}
                    pt={5}
                    display={"flex"}
                    flexDir={"column"}
                    gap={3}
                    h={"12rem"}
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
                    <Field.Root invalid={!!errors.description}>
                      <Field.Label>Song Description</Field.Label>
                      <Textarea
                        {...register("description", {
                          required: "You have to include a description",
                        })}
                        resize={"none"}
                        bg={"none"}
                        borderColor={"gray.800"}
                        focusRing={"none"}
                        placeholder="Enter a short description about the song."
                      />
                      <Field.ErrorText>
                        {errors.description?.message}
                      </Field.ErrorText>
                    </Field.Root>
                  </Steps.Content>
                  <Steps.Content
                    index={1}
                    pt={5}
                    display={"flex"}
                    alignItems={"center"}
                    h={"12rem"}
                  >
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
                    pt={5}
                    display={"flex"}
                    alignItems={"center"}
                    h={"12rem"}
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
                    />
                  </Steps.Content>

                  <Steps.Content
                    pt={5}
                    index={3}
                    display={"flex"}
                    flexDir={"column"}
                    alignItems={"center"}
                    h={"12rem"}
                    justifyContent={"center"}
                    gap={5}
                    color={"white"}
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
                </Dialog.Body>
                <Dialog.Footer>
                  <ButtonGroup size="sm" variant="outline">
                    <Steps.PrevTrigger asChild>
                      <Button
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
                    </Steps.PrevTrigger>
                    <Steps.NextTrigger asChild>
                      <Button
                        onClick={handleStepsAction}
                        rounded={"full"}
                        borderColor={"gray.800"}
                        color={"white"}
                        _hover={{
                          bg: "blackAlpha.300",
                        }}
                      >
                        Next
                      </Button>
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
