import {
  Box,
  Button,
  Dialog,
  Image,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { HiX } from "react-icons/hi";
interface SongDialogProps {
  triggerSongImage: string;
  triggerSongColor: string;
  triggerButton: React.ReactNode;
}

const SongDialog = ({
  triggerSongImage,
  triggerButton,
  triggerSongColor,
}: SongDialogProps) => {
  return (
    <Dialog.Root placement={"center"} size={"xl"}>
      <Dialog.Trigger>{triggerButton}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            h={"2/3"}
            py={10}
            bgGradient={"to-r"}
            gradientFrom={triggerSongColor}
            gradientVia={"gray.950"}
            gradientTo={"gray.950"}
          >
            <Dialog.Body display={"flex"} alignItems={"center"}>
              <Stack
                flexBasis={"2/5"}
                h={"full"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Image
                  src={triggerSongImage}
                  boxShadow={"2xl"}
                  shadowColor={"red"}
                  w={"4/5"}
                  rounded={"lg"}
                />
              </Stack>
              <Stack
                flexBasis={"3/5"}
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"Center"}
                gap={4}
                h={"full"}
              >
                <Text
                  textStyle={"4xl"}
                  textAlign={"center"}
                  mb={3}
                  w={"full"}
                  fontWeight={"extrabold"}
                >
                  Start listening with a<br />
                  free Rhythmo account
                </Text>
                <Button
                  w={"8/12"}
                  size={"lg"}
                  fontWeight={"bold"}
                  rounded={"full"}
                  bg={"green.600"}
                >
                  Start Listening
                </Button>
                <Button
                  w={"8/12"}
                  size={"lg"}
                  fontWeight={"bold"}
                  rounded={"full"}
                  variant={"outline"}
                >
                  Become an Artist
                </Button>
                <Dialog.CloseTrigger>
                  <Box as={HiX} boxSize={6} mr={4} mt={4} />
                </Dialog.CloseTrigger>
              </Stack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SongDialog;
