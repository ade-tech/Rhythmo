/**
 * CreateMusic Component
 *
 * Provides UI for artists to create and upload new music or albums.
 * Includes form controls and visual feedback for the creation process.
 *
 * Usage:
 * - Used in the artist dashboard for music creation workflows.
 */

import { Box, Button, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { BiAlbum } from "react-icons/bi";
import { PiMusicNotesPlus } from "react-icons/pi";

const CreateMusic = () => {
  return (
    <Box
      w={"full"}
      h={"full"}
      display={"flex"}
      flexDir={"column"}
      gap={3}
      rounded={"lg"}
    >
      <Box
        w={"full"}
        h={48}
        bgSize={"cover"}
        bgPos={"center"}
        rounded={"lg"}
        bgImage={"url('/bgNoise.jpg ')"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        px={8}
      >
        <Stack gap={0}>
          <Text textStyle={"5xl"} fontWeight={"extrabold"}>
            Hello, Central Cee,
          </Text>
          <Text textStyle={"xl"} fontWeight={"semibold"}>
            What are you creating today?
          </Text>
        </Stack>
      </Box>
      <Box
        flex={1}
        display={"flex"}
        gap={2}
        h={"full"}
        pr={2}
        pl={1}
        justifyContent={"space-between"}
      >
        <CreateButton
          title="Upload a song"
          icon={PiMusicNotesPlus}
          description="Add your latest track to Rhythmo so listeners can enjoy it instantly."
        />
        <CreateButton
          title="Create an ablum"
          icon={BiAlbum}
          description="Group multiple songs together into a themed collection or project."
        />
      </Box>
    </Box>
  );
};

interface createButtonProps {
  title: string;
  description: string;
  icon: React.ElementType;
}
const CreateButton = ({ title, icon, description }: createButtonProps) => {
  return (
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
      <Text textStyle={"sm"} w={"3/4"} textWrap={"wrap"} color={"gray.600"}>
        {description}
      </Text>
    </Button>
  );
};

export default CreateMusic;
