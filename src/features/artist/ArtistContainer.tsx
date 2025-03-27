import IconWithTooltip from "@/components/ui/IconWithTooltip";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Spacer,
  Span,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { HiPlayCircle } from "react-icons/hi2";
import { IoList } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { RxTimer } from "react-icons/rx";

const ArtistContainer = () => {
  return (
    <Box h={"75dvh"} overflow={"auto"} className="trend-group" pos={"relative"}>
      <Box
        w={"100%"}
        opacity={"0.9"}
        h={"70%"}
        zIndex={0}
        top={0}
        bgGradient={"to-b"}
        gradientFrom={"gray.100"}
        gradientTo={"gray.950"}
        position={"absolute"}
        roundedTop={"md"}
      ></Box>

      <Box
        flexDirection={"row"}
        display={"flex"}
        h={"14rem"}
        gap={5}
        border={"1"}
        position={"relative"}
        zIndex={10}
        borderTopRadius={"md"}
        backgroundPosition={"center center"}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        bgImage="url('https://swjwzsoqbpfsivdzudfx.supabase.co/storage/v1/object/public/Temp//Screenshot_20211012-110224_Facebook.jpg')"
      >
        <Box w={"full"} h={"full"} bg={"blackAlpha.400"} pos={"absolute"} />
        <Stack w={"full"} gap={0} zIndex={1} mt={12} pl={10}>
          <Text
            display={"flex"}
            alignItems={"center"}
            color={"white"}
            gap={2}
            textStyle={"xl"}
            fontWeight={"semibold"}
            textShadow="2px 12px 10px rgba(0, 0, 0, 0.764)"
          >
            <Box
              as={MdVerified}
              color={"white"}
              textShadow="2px 12px 10px rgba(0, 0, 0, 0.764)"
            />{" "}
            Verified Artist
          </Text>
          <Text
            textStyle={"7xl"}
            color={"white"}
            textShadow="2px 12px 20px rgba(0, 0, 0, 0.411)"
            lineHeight={1.1}
            fontWeight={"black"}
          >
            Central Cee
          </Text>

          <Text textStyle={"xl"} color={"white"} fontWeight={"semibold"}>
            2,344,230,120 Monthly listeners
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
          <IconWithTooltip tooltipText="play">
            <Button variant={"outline"} borderColor={"white"} color={"white"}>
              Follow
            </Button>
          </IconWithTooltip>
          <Spacer />
          <IconWithTooltip tooltipText="view as">
            <Box
              as={IoList}
              boxSize={8}
              cursor={"pointer"}
              color={"gray.300"}
            />
          </IconWithTooltip>
        </HStack>
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
        <Stack mt={10} gap={4} pb={3}>
          <Stack gap={0} mb={8}>
            <Text
              textStyle={"2xl"}
              color={"white"}
              fontWeight={"bold"}
              color={"white"}
            >
              Recommended
            </Text>
            <Text textStyle={"sm"} color={"gray.400"}>
              Based on what's in the playlist
            </Text>
          </Stack>

          <HStack w={"full"}>
            <HStack gap={4}>
              <Avatar.Root shape={"rounded"} size={"md"}>
                <Avatar.Image src="https://swjwzsoqbpfsivdzudfx.supabase.co/storage/v1/object/public/Temp//ab6761610000e5ebf6469f2cbf0a7e78744a3173.jpg" />
              </Avatar.Root>
              <Stack gap={0}>
                <Text textStyle={"md"} fontWeight={"bold"} lineHeight={1.1}>
                  Motigbana
                </Text>
                <Text textStyle={"sm"} fontWeight={"medium"} color={"gray.400"}>
                  Olamide
                </Text>
              </Stack>
            </HStack>
            <Spacer />
            <Text>Split Decison</Text>
            <Spacer />
            <Button
              rounded={"full"}
              variant={"outline"}
              borderColor={"white"}
              color={"white"}
            >
              Add
            </Button>
          </HStack>
          <HStack w={"full"}>
            <HStack gap={4}>
              <Avatar.Root shape={"rounded"} size={"md"}>
                <Avatar.Image src="https://swjwzsoqbpfsivdzudfx.supabase.co/storage/v1/object/public/Temp//ab6761610000e5ebf6469f2cbf0a7e78744a3173.jpg" />
              </Avatar.Root>
              <Stack gap={0}>
                <Text
                  textStyle={"md"}
                  fontWeight={"bold"}
                  color={"white"}
                  lineHeight={1.1}
                >
                  Motigbana
                </Text>
                <Text textStyle={"sm"} fontWeight={"medium"} color={"gray.400"}>
                  Olamide
                </Text>
              </Stack>
            </HStack>
            <Spacer />
            <Text color={"white"}>Split Decison</Text>
            <Spacer />
            <Button
              rounded={"full"}
              variant={"outline"}
              borderColor={"white"}
              color={"white"}
            >
              Add
            </Button>
          </HStack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ArtistContainer;
