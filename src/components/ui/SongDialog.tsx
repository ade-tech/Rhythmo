/**
 * SongDialog Component
 *
 * Renders a modal dialog for prompting users to sign in or take action before playing a song.
 *
 * Usage:
 * - Used as a triggerable dialog from play buttons for unauthenticated users.
 * - Accepts a custom trigger button, song image, and color for theming.
 */

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
import { useNavigate } from "react-router-dom";
interface SongDialogProps {
  triggerSongImage: string | undefined;
  triggerSongColor: string;
  triggerButton: React.ReactNode;
}

const SongDialog = ({
  triggerSongImage,
  triggerButton,
  triggerSongColor,
}: SongDialogProps) => {
  const navigate = useNavigate();
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
                  onClick={() => navigate("/login")}
                >
                  Start Listening
                </Button>
                <Button
                  w={"8/12"}
                  size={"lg"}
                  fontWeight={"bold"}
                  rounded={"full"}
                  variant={"outline"}
                  onClick={() => navigate("/artist/login")}
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
