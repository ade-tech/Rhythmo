import {
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Spacer,
  Span,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { HiPencil } from "react-icons/hi";
import { RxTimer } from "react-icons/rx";

const ProfileContainer = () => {
  return (
    <Box h={"75dvh"} overflow={"auto"} className="trend-group" pos={"relative"}>
      <Box
        w={"100%"}
        opacity={"0.9"}
        h={"70%"}
        zIndex={0}
        top={0}
        bgGradient={"to-b"}
        gradientFrom={"blue.600"}
        gradientTo={"gray.950"}
        position={"absolute"}
        roundedTop={"md"}
      ></Box>

      <Box
        flexDirection={"row"}
        display={"flex"}
        h={"10rem"}
        gap={5}
        mt={6}
        pl={4}
        mb={4}
        border={"1"}
        zIndex={10}
      >
        <Avatar.Root h={"10rem"} w={"10rem"} shape={"full"}>
          <Avatar.Fallback>
            <Image src="/musicfallback.png" />
          </Avatar.Fallback>
          <Avatar.Image
            shadow={"lg"}
            src="https://swjwzsoqbpfsivdzudfx.supabase.co/storage/v1/object/public/Temp//0x1900-000000-80-0-0.png"
          />
        </Avatar.Root>
        <Stack
          color={"white"}
          w={"2/3"}
          gap={0}
          zIndex={1}
          justifyContent={"center"}
        >
          <Text>Profile</Text>
          <Text textStyle={"7xl"} lineHeight={1} fontWeight={"black"}>
            Abdone
          </Text>

          <Text fontWeight={"bold"}>
            11 Public Playlist . <Span color={"gray.400"}>10 Songs</Span>
          </Text>
        </Stack>
      </Box>
      <Stack
        zIndex={10}
        bg={"blackAlpha.400"}
        minH="calc(100% - 12.5rem)"
        gap={3}
        pos={"relative"}
        py={3}
        px={4}
      >
        <HStack gap={2} pr={4}>
          <Spacer />
          <Button
            mt={3}
            variant={"outline"}
            rounded={"full"}
            borderColor={"white"}
            color={"white"}
            _hover={{
              bg: "white",
              color: "black",
            }}
          >
            <HiPencil />
            Edit Profile
          </Button>
        </HStack>
        <Stack gap={0} mt={5}>
          <Text textStyle={"2xl"} color={"white"} fontWeight={"bold"}>
            Top Tracks this Month
          </Text>
          <Text textStyle={"sm"} color={"gray.400"}>
            Only visible to you
          </Text>
        </Stack>
        <Table.Root size="lg" stickyHeader={true}>
          <Table.Header>
            <Table.Row bg={"transparent"}>
              <Table.ColumnHeader color={"gray.400"}>#</Table.ColumnHeader>
              <Table.ColumnHeader color={"gray.400"}>Title</Table.ColumnHeader>
              <Table.ColumnHeader color={"gray.400"}>Plays</Table.ColumnHeader>
              <Table.ColumnHeader color={"gray.400"}>
                <RxTimer size={15} />
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row bg={"transparent"} _hover={{ bg: "gray.900" }}>
              <Table.Cell borderBottom={"none"} color={"white"}>
                1
              </Table.Cell>
              <Table.Cell
                borderBottom={"none"}
                color={"white"}
                display={"flex"}
                gap={2}
              >
                <Avatar.Root shape={"rounded"} size={"sm"}>
                  <Avatar.Image src="https://swjwzsoqbpfsivdzudfx.supabase.co/storage/v1/object/public/Temp//ab6761610000e5ebf6469f2cbf0a7e78744a3173.jpg" />
                </Avatar.Root>
                <Stack gap={0}>
                  <Text
                    textStyle={"md"}
                    color={"white"}
                    fontWeight={"bold"}
                    lineHeight={1.1}
                  >
                    Motigbana
                  </Text>
                  <Text
                    textStyle={"sm"}
                    fontWeight={"medium"}
                    color={"gray.400"}
                  >
                    Olamide
                  </Text>
                </Stack>
              </Table.Cell>
              <Table.Cell
                color={"white"}
                borderBottom={"none"}
                fontWeight={"bold"}
              >
                1,200,220
              </Table.Cell>
              <Table.Cell borderBottom={"none"} color={"gray.400"}>
                3:05
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Stack>
    </Box>
  );
};

export default ProfileContainer;
