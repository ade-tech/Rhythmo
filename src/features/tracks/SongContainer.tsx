import IconWithTooltip from "@/components/ui/IconWithTooltip";
import {
  Avatar,
  Button,
  Card,
  Flex,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GoPlusCircle } from "react-icons/go";
import { HiOutlineUpload, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

export function SongContainer() {
  return (
    <Stack
      w={"1/3"}
      className="bg-darker-overlay"
      h={"75dvh"}
      overflowY={"auto"}
      pos={"relative"}
      pb={4}
    >
      <HStack
        mb={1}
        px={2}
        pos={"sticky"}
        w={"full"}
        top={0}
        bg={"gray.950"}
        pt={4}
        pb={3}
        zIndex={1000000}
      >
        <Link to="sada">
          <Text
            ml={2}
            textStyle={"lg"}
            color={"white"}
            transitionDuration={"200ms"}
            _hover={{
              textDecoration: "underline",
              transition: "ease-in-out",
            }}
            fontWeight={"medium"}
          >
            SPRINTER
          </Text>
        </Link>
        <Spacer />
        <HiX className="text-gray-400" size={20} />
      </HStack>
      <Stack>
        <Image
          rounded={"lg"}
          width={"300px"}
          height={"300px"}
          objectFit={"cover"}
          ml={4}
          mb={2}
          src="https://swjwzsoqbpfsivdzudfx.supabase.co/storage/v1/object/public/Temp//ab6761610000e5ebf6469f2cbf0a7e78744a3173.jpg"
        />
        <Stack gap={0} px={5}>
          <Flex>
            <Stack gap={0}>
              <Link to="sada">
                <Text
                  textStyle={"2xl"}
                  color={"white"}
                  transitionDuration={"200ms"}
                  _hover={{
                    textDecoration: "underline",
                    transition: "ease-in-out",
                  }}
                  fontWeight={"bold"}
                >
                  SPRINTER
                </Text>
              </Link>
              <Text
                textStyle={"md"}
                color={"gray.400"}
                transitionDuration={"200ms"}
                _hover={{
                  textDecoration: "underline",
                  transition: "ease-in-out",
                }}
                fontWeight={"medium"}
              >
                Central Cee
              </Text>
            </Stack>
            <Spacer />
            <HStack mr={1}>
              <Link to="sada"></Link>
              <HiOutlineUpload size={20} className="text-gray-400" />
              <GoPlusCircle size={20} className="text-gray-400" />
            </HStack>
          </Flex>
        </Stack>
      </Stack>
      <Card.Root
        mx={"auto"}
        w={"10/12"}
        variant={"subtle"}
        borderRadius={"xl"}
        bg={"gray.800"}
        pb={4}
      >
        <Image
          h={36}
          objectFit={"cover"}
          objectPosition={"center"}
          borderTopRadius={"xl"}
          src="https://swjwzsoqbpfsivdzudfx.supabase.co/storage/v1/object/public/Temp//ab6761610000e5ebf6469f2cbf0a7e78744a3173.jpg"
        />
        <Link to="sada">
          <Text
            ml={4}
            mt={4}
            textStyle={"2xl"}
            fontWeight={"bold"}
            color={"white"}
            transitionDuration={"200ms"}
            _hover={{
              textDecoration: "underline",
              transition: "ease-in-out",
            }}
          >
            SPRINTER
          </Text>
        </Link>
        <HStack mt={3} px={4}>
          <Text
            textStyle={"lg"}
            fontWeight={"bold"}
            lineHeight={1.3}
            color={"gray.400"}
          >
            90,920,900 <br />
            Monthly Listeners
          </Text>
          <Spacer />
          <Button
            rounded={"full"}
            variant={"subtle"}
            color={"white"}
            bg={"green.600"}
          >
            Follow
          </Button>
        </HStack>
        <Text textAlign={"left"} px={4} mt={2} color={"gray.400"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
        </Text>
      </Card.Root>

      <Card.Root
        mx={"auto"}
        w={"10/12"}
        variant={"subtle"}
        borderRadius={"xl"}
        bg={"gray.800"}
        pb={4}
        mt={3}
      >
        <Text
          ml={4}
          mt={4}
          textStyle={"xl"}
          fontWeight={"bold"}
          color={"white"}
          transitionDuration={"200ms"}
          _hover={{
            textDecoration: "underline",
            transition: "ease-in-out",
          }}
        >
          Credits
        </Text>
        <HStack mt={3} px={4}>
          <Stack gap={0}>
            <Text
              textStyle={"md"}
              fontWeight={"semibold"}
              lineHeight={1.3}
              color={"white"}
            >
              Central Cee
            </Text>
            <Text
              textStyle={"sm"}
              fontWeight={"medium"}
              lineHeight={1.3}
              color={"gray.400"}
            >
              Main Artist, Composer
            </Text>
          </Stack>
          <Spacer />
          <Button
            rounded={"full"}
            variant={"subtle"}
            color={"white"}
            bg={"green.600"}
          >
            Follow
          </Button>
        </HStack>
        <HStack mt={4} px={4}>
          <Stack gap={0}>
            <Text
              textStyle={"md"}
              fontWeight={"semibold"}
              lineHeight={1.3}
              color={"white"}
            >
              21 Savage
            </Text>
            <Text
              textStyle={"sm"}
              fontWeight={"medium"}
              lineHeight={1.3}
              color={"gray.400"}
            >
              Main Artist
            </Text>
          </Stack>
          <Spacer />
          <Button
            rounded={"full"}
            variant={"subtle"}
            color={"white"}
            bg={"green.600"}
          >
            Follow
          </Button>
        </HStack>
        <HStack mt={3} px={4}>
          <Stack gap={0}>
            <Text
              textStyle={"md"}
              fontWeight={"semibold"}
              lineHeight={1.3}
              color={"white"}
            >
              Young John
            </Text>
            <Text
              textStyle={"sm"}
              fontWeight={"medium"}
              lineHeight={1.3}
              color={"gray.400"}
            >
              Producer, Manager
            </Text>
          </Stack>
        </HStack>
      </Card.Root>
      <Card.Root
        mx={"auto"}
        w={"10/12"}
        variant={"subtle"}
        borderRadius={"xl"}
        bg={"gray.800"}
        pb={4}
        pt={3}
        px={4}
        mt={3}
      >
        <HStack>
          <Text
            mb={2}
            textStyle={"md"}
            fontWeight={"bold"}
            color={"white"}
            transitionDuration={"200ms"}
            _hover={{
              textDecoration: "underline",
              transition: "ease-in-out",
            }}
          >
            Next in Queue
          </Text>
          <Spacer />
          <Text
            mb={2}
            textStyle={"sm"}
            fontWeight={"bold"}
            color={"gray.400"}
            transitionDuration={"200ms"}
            _hover={{
              textDecoration: "underline",
              transition: "ease-in-out",
            }}
          >
            Open queue
          </Text>
        </HStack>
        <HStack gap={4} align={"center"} w={"full"}>
          <Avatar.Root shape={"rounded"} size={"2xl"}>
            <Avatar.Fallback>
              <Image src="/musicfallback.png" />
            </Avatar.Fallback>
            <Avatar.Image src="https://swjwzsoqbpfsivdzudfx.supabase.co/storage/v1/object/public/Temp//ab6761610000e5ebf6469f2cbf0a7e78744a3173.jpg" />
          </Avatar.Root>
          <Stack gap={0}>
            <Link to="sada">
              <Text
                textStyle={"md"}
                color={"white"}
                transitionDuration={"200ms"}
                _hover={{
                  textDecoration: "underline",
                  transition: "ease-in-out",
                }}
                fontWeight={"bold"}
              >
                SPRINTER
              </Text>
            </Link>
            <Text
              textStyle={"sm"}
              color={"gray.400"}
              transitionDuration={"200ms"}
              _hover={{
                textDecoration: "underline",
                transition: "ease-in-out",
              }}
              fontWeight={"medium"}
            >
              Central Cee
            </Text>
          </Stack>
        </HStack>
      </Card.Root>
    </Stack>
  );
}

export default SongContainer;
