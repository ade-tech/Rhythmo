import { toaster } from "@/components/ui/toaster";
import { Box, Button, Input, Link, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormResetField,
  UseFormSetValue,
} from "react-hook-form";
import { HiOutlineUpload, HiX } from "react-icons/hi";
import { CreateMusicProps } from "./CreateMusicDialog";
interface ArtistDropZoneProps {
  name: "title" | "description" | "audio" | "coverImage";
  acceptedFiles: string[];
  icon: React.ReactNode;
  caption: string;
  setValue: UseFormSetValue<CreateMusicProps>;
  preview: File;
  reset: UseFormResetField<CreateMusicProps>;
  errors: FieldErrors<CreateMusicProps>;
  control: Control<CreateMusicProps>;
}

export function ArtistDropZone({
  name,
  acceptedFiles,
  setValue,
  reset,
  errors,
  control,
  icon,
  caption,
  preview,
}: ArtistDropZoneProps) {
  const fileUploadRef = useRef<HTMLInputElement | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

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
      setValue(name, droppedfile[0]);
    } else {
      reset(name);
      setIsDraggingOver(false);
      toaster.create({
        title: "You dropped the wrong file!",
      });
    }
  };
  return (
    <Box display={"flex"} flexDir={"column"} w={"full"}>
      <Box
        mt={5}
        w={"full"}
        h={"10.5rem"}
        borderWidth={"1px"}
        borderColor={errors[name]?.message ? "red.500" : "gray.600"}
        borderStyle={"dashed"}
        bg={errors[name]?.message ? "red.900" : "gray.900"}
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
                  if (typeof value === "string") return false;
                  if (acceptedFiles.find((cur) => cur === value.type)) {
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
              {icon}
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
      {errors[name] && (
        <Text color={"red.500"} mt={2} textStyle={"xs"}>
          {errors[name]?.message}
        </Text>
      )}
    </Box>
  );
}
export default ArtistDropZone;
