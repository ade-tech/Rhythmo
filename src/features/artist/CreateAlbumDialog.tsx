import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  Field,
  Image,
  Input,
  Portal,
  Spinner,
  Steps,
  Text,
} from "@chakra-ui/react";

import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCurrentArtist } from "@/contexts/currentArtistContext";

import SelectSongs from "./SelectSongs";
import ArtistDropZone from "./ArtistDropZone";
import { PiFileImage } from "react-icons/pi";
import { useCreateAlbum } from "../tracks/useSong";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface createButtonProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface CreateAlbumProps {
  title: string;
  albumSongs: string[];
  coverImage: File;
  artist_id: string;
}
const CreateAlbumDialog = ({ title, icon, description }: createButtonProps) => {
  const { currentArtist } = useCurrentArtist();
  const {
    register,
    formState: { errors },
    trigger,
    resetField,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
  } = useForm<CreateAlbumProps>({
    mode: "onBlur",
  });
  const imageFile = watch("coverImage");
  const stringsInputs = watch(["title"]);

  const [stepIndex, setStepIndex] = useState<number>(0);
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const { mutate, isPending, error } = useCreateAlbum();

  function resetForm() {
    setStepIndex(0);
    reset();
    setImageURL(undefined);
  }

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
      const isValid = await trigger(["title"]);
      if (isValid) setStepIndex((cur) => cur + 1);
      return;
    }
    if (stepIndex === 1) {
      const isValid = await trigger(["albumSongs"]);
      if (isValid) setStepIndex((cur) => cur + 1);
      return;
    }
    if (stepIndex === 2) {
      const isValid = await trigger(["coverImage"]);
      if (isValid) setStepIndex((cur) => cur + 1);
      return;
    }

    if (stepIndex === 3) {
      setStepIndex((cur) => cur + 1);
      handleSubmit(submitFn)();
    }
  }
  const submitFn: SubmitHandler<CreateAlbumProps> = (data) => {
    if (!currentArtist || !currentArtist.data || !currentArtist.profileInfo)
      return;
    const allData = {
      ...data,
      artist_id: currentArtist.data.id,
    };
    mutate(allData);
  };

  return (
    <Dialog.Root size={"lg"} placement={"center"}>
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
          <Dialog.Positioner>
            <Dialog.Content bg={"gray.950"} color={"white"}>
              <Dialog.Header mb={3} display={"flex"} flexDir={"column"} gap={0}>
                <Dialog.Title>Let's Create Your Album.</Dialog.Title>
                <Text textStyle={"xs"} fontWeight={"normal"} color={"gray.400"}>
                  Bring your vision to life—add your album details, upload your
                  tracks, and we’ll help you share your story with the world.
                </Text>
              </Dialog.Header>
              <Steps.Root
                size={"xs"}
                step={stepIndex}
                bg={"gray.950"}
                count={4}
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
                        Album Info
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
                        Album Songs
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
                        Finish
                      </Steps.Title>
                      <Steps.Separator bg={"gray.800"} />
                    </Steps.Item>
                  </Steps.List>
                  <Steps.Content
                    index={0}
                    pt={5}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    flexDir={"column"}
                    gap={3}
                    minH={"10rem"}
                  >
                    <Field.Root invalid={!!errors.title}>
                      <Field.Label>Album Title</Field.Label>
                      <Input
                        {...register("title", {
                          required: "You have to include a title",
                        })}
                        placeholder="what's the name of the album?"
                        size={"lg"}
                        bg={"none"}
                        borderColor={"gray.800"}
                        focusRing={"none"}
                      />
                      <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
                    </Field.Root>
                  </Steps.Content>
                  <Steps.Content
                    flex={1}
                    index={1}
                    pt={5}
                    display={"flex"}
                    alignItems={"center"}
                    minH={"15rem"}
                  >
                    <SelectSongs control={control} errors={errors} />
                  </Steps.Content>
                  <Steps.Content
                    index={2}
                    pt={3}
                    display={"flex"}
                    flexDir={"column"}
                    minH={"15rem"}
                  >
                    <ArtistDropZone
                      control={control}
                      reset={resetField}
                      setValue={setValue}
                      name="coverImage"
                      errors={errors}
                      caption="Drag and drop the song audio here"
                      icon={
                        <Box
                          as={PiFileImage}
                          strokeWidth={1}
                          color={"gray.500"}
                          boxSize={16}
                        />
                      }
                      preview={imageFile}
                      previewUrl={imageURL}
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
                          Uploading Album ....
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
                          You song is now Live!
                        </Text>
                      </Box>
                    )}
                  </Steps.CompletedContent>
                </Dialog.Body>
                <Dialog.Footer>
                  <ButtonGroup size="sm" variant="outline">
                    {stepIndex <= 3 ? (
                      <Steps.NextTrigger asChild>
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
                          >
                            {stepIndex === 3 ? "Publish" : "Next"}
                          </Button>
                        </Box>
                      </Steps.NextTrigger>
                    ) : (
                      <Dialog.CloseTrigger
                        transform={"translateY(-3rem)"}
                        borderWidth={"1px"}
                        borderColor={"gray.800"}
                        cursor={"pointer"}
                        px={3}
                        py={2}
                        rounded={"full"}
                        onClick={resetForm}
                        color={"white"}
                        _hover={{
                          bg: "blackAlpha.300",
                        }}
                      >
                        Close
                      </Dialog.CloseTrigger>
                    )}
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
export default CreateAlbumDialog;
