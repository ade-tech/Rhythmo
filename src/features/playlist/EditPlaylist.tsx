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
import { Playlist } from "./playlistType";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEditPlaylist } from "./usePlaylist";
import { toaster } from "@/components/ui/toaster";

interface EditPlaylistProps {
  ButtonContent: React.ReactNode;
  playlistInformation: Playlist;
}
export interface EditPlaylistInput {
  name: string;
  description?: string;
  coverFile?: FileList | string;
  playlist_id: string;
}
export default function EditPlaylist({
  ButtonContent,
  playlistInformation,
}: EditPlaylistProps) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPlaylistInput>();
  const [imageURL, setImageURL] = useState<string | undefined>(
    playlistInformation.cover_url
  );

  const { editPlaylistFn, isPending } = useEditPlaylist();
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

  const submitFunction: SubmitHandler<EditPlaylistInput> = (data) => {
    if (!playlistInformation.playlist_id) return;
    const hasUploadedImage = data.coverFile instanceof FileList;
    data.coverFile = !hasUploadedImage
      ? playlistInformation.cover_url
      : data.coverFile;

    data.playlist_id = playlistInformation.playlist_id ?? "";

    editPlaylistFn(data, {
      onSuccess: () =>
        toaster.create({
          title: "Playlist Updated 🥳",
        }),
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
                  <Field.Root invalid={!!errors.name}>
                    <Field.Label>Playlist Name</Field.Label>
                    <Input
                      borderColor={"gray.800"}
                      columnWidth={2}
                      focusRing={"none"}
                      defaultValue={playlistInformation.name}
                      {...register("name", {
                        required: "Name cannot be empty",
                      })}
                    />
                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Playlist Description</Field.Label>
                    <Input
                      columnWidth={2}
                      focusRing={"none"}
                      {...register("description")}
                      defaultValue={playlistInformation?.description}
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
                  Save
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </form>
  );
}
