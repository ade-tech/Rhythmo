import {
  Box,
  Button,
  Dialog,
  Field,
  Image,
  Input,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { toaster } from "@/components/ui/toaster";
import { Song } from "./songType";
import { useEditSong } from "./useSong";
import { useNavigate } from "react-router-dom";

interface EditSongProps {
  ButtonContent: React.ReactNode;
  SongInformation: Song;
}
export interface EditSongInput {
  title: string;
  album?: string;
  coverFile?: FileList | string;
  songID: string;
  artist_id: string;
}
export default function EditSong({
  ButtonContent,
  SongInformation,
}: EditSongProps) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<EditSongInput>();
  const [imageURL, setImageURL] = useState<string | undefined>(
    SongInformation.cover_url
  );
  const naviagte = useNavigate();
  const { editSongFn, isPending } = useEditSong();

  const imageFormRef = useRef<HTMLInputElement | null>(null);
  const imageFile = watch("coverFile");

  useEffect(() => {
    if (!imageFile || typeof imageFile === "string" || imageFile.length < 1)
      return;
    const imageReader = new FileReader();

    imageReader.onload = (ev: ProgressEvent<FileReader>) => {
      if (ev.target && typeof ev.target.result === "string") {
        setImageURL(ev.target.result);
      }
    };

    imageReader.readAsDataURL(imageFile[0]);
  }, [imageFile]);

  const submitFunction: SubmitHandler<EditSongInput> = (data) => {
    if (!SongInformation.id) return;
    const hasUploadedImage =
      data.coverFile instanceof FileList && data.coverFile.length > 0;
    data.coverFile = !hasUploadedImage
      ? SongInformation.cover_url
      : data.coverFile;
    console.log(hasUploadedImage, data);
    data.songID = SongInformation.id ?? "";
    data.artist_id = SongInformation.artist_id;

    editSongFn(data, {
      onSuccess: (_, variables) =>
        toaster.create({
          title: "Edit Successful!",
          action: {
            label: "View Song",
            onClick: () => naviagte(`/tracks/${variables.songID}`),
          },
        }),
      onError: (error) => {
        console.error(error);
        toaster.create({ title: "An Error Occured" });
      },
    });
  };

  return (
    <form>
      <Dialog.Root placement={"center"} motionPreset={"slide-in-bottom"}>
        <Dialog.Trigger asChild>{ButtonContent}</Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop bg={"black/60"} />
          <Dialog.Positioner>
            <Dialog.Content bg={"gray.950"} color={"white"}>
              <Dialog.Header>
                <Dialog.Title textStyle={"xl"} fontWeight={"extrabold"}>
                  Edit Playlist Details
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body
                display={"grid"}
                gridTemplateColumns={"1fr 2fr"}
                gap={4}
              >
                <Box className="group" position={"relative"}>
                  <Image
                    src={imageURL || "/musicfallback.png"}
                    rounded={"md"}
                  />
                  <Input
                    display={"none"}
                    type="file"
                    {...register("coverFile")}
                    ref={(e) => {
                      imageFormRef.current = e;
                      register("coverFile").ref(e);
                    }}
                  />

                  <Box
                    cursor={"pointer"}
                    position={"absolute"}
                    rounded={"md"}
                    h={"full"}
                    w={"full"}
                    transition={"opacity 0.2s ease-in"}
                    p={2}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    visibility={"hidden"}
                    flexDir={"column"}
                    opacity={0}
                    top={0}
                    bg={"blackAlpha.500"}
                    _groupHover={{ visibility: "visible", opacity: 1 }}
                    onClick={() => {
                      imageFormRef?.current?.click();
                    }}
                  >
                    <MdOutlineEdit size={48} />
                    <Text>Choose Photo</Text>
                  </Box>
                </Box>
                <Stack>
                  <Field.Root invalid={!!errors.title}>
                    <Field.Label>Song Title</Field.Label>
                    <Input
                      borderColor={"gray.800"}
                      columnWidth={2}
                      focusRing={"none"}
                      defaultValue={SongInformation.title}
                      {...register("title", {
                        required: "Name cannot be empty",
                      })}
                    />
                    <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Song Album</Field.Label>
                    <Input
                      columnWidth={2}
                      focusRing={"none"}
                      {...register("album")}
                      defaultValue={SongInformation?.album}
                    />
                  </Field.Root>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button
                    rounded={"full"}
                    borderColor={"gray.800"}
                    color={"white"}
                    disabled={isPending}
                    onClick={() => setImageURL(undefined)}
                    bg={"blackAlpha.300"}
                  >
                    Close
                  </Button>
                </Dialog.ActionTrigger>

                <Button
                  rounded={"full"}
                  onClick={() => handleSubmit(submitFunction)()}
                  color={"gray.900"}
                  bg={"white"}
                  disabled={isPending}
                >
                  {isPending ? "Saving.." : "Save"}
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </form>
  );
}
