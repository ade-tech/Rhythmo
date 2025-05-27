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
        bgPos={"bottom"}
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
        <CreateButton title="Upload a song" icon={PiMusicNotesPlus} />
        <CreateButton title="Create an ablum" icon={BiAlbum} />
      </Box>
    </Box>
  );
};

interface createButtonProps {
  title: string;
  icon: React.ElementType;
}
const CreateButton = ({ title, icon }: createButtonProps) => {
  return (
    <Button
      flexBasis={"1/2"}
      m={0}
      w={"full"}
      h={"full"}
      rounded={"lg"}
      variant={"outline"}
      textStyle={"4xl"}
      color={"gray.600"}
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
    </Button>
  );
};

export default CreateMusic;
