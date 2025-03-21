import { Button, HStack, Spacer, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { LuLibrary } from "react-icons/lu";

export function LibraryHeader() {
  return (
    <HStack mb={6}>
      <Text
        display={"flex"}
        alignItems={"center"}
        gap={1}
        textStyle={"xl"}
        color={"gray.500"}
        fontWeight={"bold"}
      >
        <LuLibrary />
        Your Library
      </Text>
      <Spacer />
      <Button
        size={"xs"}
        rounded={"full"}
        variant={"subtle"}
        bg={"gray.900"}
        color={"white"}
      >
        <FiPlus className="text-gray-500" />
        Create Playlist
      </Button>
    </HStack>
  );
}

export default LibraryHeader;
