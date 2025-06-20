import { toaster } from "@/components/ui/toaster";
import { Box, Button, Image, Input, Link, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  Path,
  PathValue,
  UseFormResetField,
  UseFormSetValue,
} from "react-hook-form";
import { HiOutlineUpload, HiX } from "react-icons/hi";
import { CreateMusicProps } from "./CreateMusicDialog";
import { CreateAlbumProps } from "./CreateAlbumDialog";
interface ArtistDropZoneProps<T extends CreateMusicProps | CreateAlbumProps> {
  name: Path<T>;
  acceptedFiles: string[];
  icon: React.ReactNode;
  caption: string;
  setValue: UseFormSetValue<T>;
  preview: File;
  previewUrl?: string;
  reset: UseFormResetField<T>;
  errors: FieldErrors<T>;
  control: Control<T>;
}

export function ArtistDropZone<T extends CreateMusicProps | CreateAlbumProps>({
  name,
  acceptedFiles,
  setValue,
  reset,
  errors,
  previewUrl,
  control,
  icon,
  caption,
  preview,
}: ArtistDropZoneProps<T>) {
  const fileUploadRef = useRef<HTMLInputElement | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  const fieldError = errors[name as keyof typeof errors];

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedfile: FileList = e.dataTransfer.files;
    if (
      acceptedFiles.find((cur) => (cur === droppedfile[0].type ? true : false))
    ) {
      setValue(name, droppedfile[0] as PathValue<T, Path<T>>);
    } else {
      reset(name);
      setIsDraggingOver(false);
      toaster.create({
        title: "You dropped the wrong file!",
      });
    }
  };
  return (
    <Box
      display={"flex"}
      h={"full"}
      minH={"11rem"}
      flexDir={"column"}
      w={"full"}
      mt={5}
    >
      <Box
        w={"full"}
        h={"full"}
        flex={1}
        borderWidth={"1px"}
        borderColor={fieldError?.message ? "red.500" : "gray.600"}
        borderStyle={"dashed"}
        bg={fieldError?.message ? "red.900" : "gray.900"}
        rounded={"sm"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"column"}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={handleDrop}
        pos={"relative"}
      >
        {!isDraggingOver && !preview && (
          <>
            <Box as={HiOutlineUpload} boxSize={5} />
            <Controller
              name={name}
              control={control}
              rules={{
                required: `You need to ${
                  name === "audio"
                    ? "add an Audio File."
                    : "add a Cover Image. "
                }`,
                validate: (value) => {
                  if (!(value instanceof File)) return false;

                  if (acceptedFiles.find((cur) => cur === value?.type)) {
                    return true;
                  } else {
                    return "Wrong File Type";
                  }
                },
              }}
              render={({ field }) => (
                <Input
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                  type="file"
                  accept={acceptedFiles.join(",")}
                  display={"none"}
                  ref={fileUploadRef}
                />
              )}
            />

            <Text fontWeight={"light"}>
              {caption} or{" "}
              <Link
                onClick={() => {
                  fileUploadRef.current?.click();
                }}
                variant={"underline"}
              >
                Browse
              </Link>
            </Text>
            <Text fontWeight={"sm"} textStyle={"xs"} color={"gray.500"}>
              {acceptedFiles.map(
                (curFile, i, array) =>
                  `.${curFile.split("/")[1]}${
                    i === array.length - 1 ? " " : ", "
                  }`
              )}
            </Text>
          </>
        )}
        {isDraggingOver && !preview && (
          <>
            <Text textStyle={"lg"}>Drop it like it’s hot 🔥</Text>
          </>
        )}
        {preview && (
          <>
            <Box display={"flex"} gap={3} alignItems={"center"}>
              {name === "coverImage" ? (
                <Image
                  w={"6rem"}
                  h={"6rem"}
                  src={previewUrl}
                  objectFit={"cover"}
                  objectPosition={"center"}
                  rounded={"lg"}
                />
              ) : (
                icon
              )}
              <Box>
                <Text>{preview.name}</Text>
                <Text>
                  {" "}
                  {preview
                    ? `${(preview.size / (1024 * 1024)).toFixed(2)}MB`
                    : ""}
                </Text>
              </Box>
            </Box>
            {preview && (
              <Button
                onClick={() => {
                  reset(name);
                  setIsDraggingOver(false);
                }}
                size={"xs"}
                pos={"absolute"}
                variant={"ghost"}
                right={2}
                bottom={2}
                _hover={{
                  bg: "transparent",
                }}
              >
                <HiX />
                Clear
              </Button>
            )}
          </>
        )}
      </Box>
      {fieldError && (
        <Text color={"red.500"} mt={2} textStyle={"xs"}>
          {typeof fieldError.message === "string"
            ? fieldError.message
            : "Invalid input."}
        </Text>
      )}
    </Box>
  );
}
export default ArtistDropZone;
