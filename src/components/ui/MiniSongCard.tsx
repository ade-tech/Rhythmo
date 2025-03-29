import { Box, Card, GridItem, Image, Spacer, Text } from "@chakra-ui/react";
import { FaPlayCircle } from "react-icons/fa";
export function MiniSongCard() {
  return (
    <GridItem h={10} mb={2}>
      <Card.Root
        flexDirection="row"
        variant={"subtle"}
        color={"white"}
        overflow="hidden"
        alignItems={"center"}
        _hover={{ bg: "gray.800" }}
        bg={"gray.900"}
        gap={4}
        transition="all 0.2s ease-in-out"
        pr={3}
        className="group"
      >
        <Image
          objectFit="cover"
          w={"50px"}
          h={"50px"}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />
        <Text textStyle={"lg"} fontWeight={"semibold"}>
          Central Cee
        </Text>
        <Spacer />
        <Box
          as={FaPlayCircle}
          boxSize={8}
          opacity={0}
          visibility="hidden"
          transition="opacity 0.2s ease-in-out"
          cursor={"pointer"}
          _groupHover={{
            opacity: 1,
            visibility: "visible",
            color: "green.600",
          }}
        />
      </Card.Root>
    </GridItem>
  );
}

export default MiniSongCard;
