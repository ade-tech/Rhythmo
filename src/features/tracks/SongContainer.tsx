import { useRef } from "react";
import {
  Avatar,
  Box,
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
import { useIsSongOpen } from "@/contexts/songContext";
import { useCurrentMusic } from "@/contexts/audioContext";
import { useFetchArtist } from "../artist/useArtist";
import { Song } from "./songType";

export function SongContainer() {
  const { isOpen, setIsOpen, setIsShowingQueue } = useIsSongOpen();
  const {
    state: { activeSong, activeQueue },
  } = useCurrentMusic();
  const ref = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useFetchArtist(activeSong?.artist_id ?? "");
  if (!isOpen) return null;
  if (!activeSong) return null;

  return (
    <Stack
      ref={ref}
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
        zIndex={100}
      >
        <Link to={`track/${activeSong.id}`}>
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
            {activeSong.title.toUpperCase()}
          </Text>
        </Link>
        <Spacer />
        <HiX
          cursor={"pointer"}
          className="text-gray-400"
          size={20}
          onClick={() => setIsOpen(false)}
        />
      </HStack>
      <Stack>
        <Image
          rounded={"lg"}
          width={"300px"}
          height={"300px"}
          objectFit={"cover"}
          ml={4}
          mb={2}
          src={activeSong.cover_url}
        />
        <Stack gap={0} px={5}>
          <Flex>
            <Stack gap={0}>
              <Link to={`track/${activeSong.id}`}>
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
                  {activeSong.title.toUpperCase()}
                </Text>
              </Link>
              <Link to={`track/${activeSong.id}`}>
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
                  {activeSong.artist} {activeSong.featured_artist && " ft "}
                  {activeSong.featured_artist?.map((cur) => `${cur}`)}
                </Text>
              </Link>
            </Stack>
            <Spacer />
            <HStack mr={1}>
              <HiOutlineUpload size={20} className="text-gray-400" />
              <GoPlusCircle size={20} className="text-gray-400" />
            </HStack>
          </Flex>
        </Stack>
      </Stack>
      {isLoading ? (
        <Stack
          mt={4}
          mx={"auto"}
          w={"10/12"}
          borderRadius={"xl"}
          bg={"gray.800"}
          h={"fit"}
          gap={3}
          p={4}
        >
          <Box
            w={"full"}
            borderTopRadius={"md"}
            h={"7rem"}
            bg={"gray.700"}
            animation={"pulse"}
          />
          <Box
            h={"1.5rem"}
            rounded={"full"}
            bg={"gray.700"}
            animation={"pulse"}
          />
          <Box
            rounded={"full"}
            h={"3rem"}
            bg={"gray.700"}
            animation={"pulse"}
          />
          <Box
            h={"0.5rem"}
            rounded={"full"}
            bg={"gray.700"}
            animation={"pulse"}
          />
          <Box
            w={"90%"}
            h={"0.5rem"}
            rounded={"full"}
            bg={"gray.700"}
            animation={"pulse"}
          />
          <Box
            w={"80%"}
            h={"0.5rem"}
            rounded={"full"}
            bg={"gray.700"}
            animation={"pulse"}
          />
        </Stack>
      ) : (
        <>
          <Card.Root
            mt={4}
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
              src={activeSong.cover_url}
            />
            <Link to={`artist/${data?.user_id!}`}>
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
                {activeSong.artist}
              </Text>
            </Link>
            <HStack mt={3} px={4}>
              <Text
                textStyle={"lg"}
                fontWeight={"bold"}
                lineHeight={1.3}
                color={"gray.400"}
              >
                {data?.monthly_plays.toLocaleString()} <br />
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
              {data?.about.slice(0, 100)}...
            </Text>
          </Card.Root>
        </>
      )}

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
            onClick={() => setIsShowingQueue(true)}
            cursor={"pointer"}
          >
            Open queue
          </Text>
        </HStack>
        {Array.isArray(activeQueue) && activeQueue?.length > 1 ? (
          <>
            {" "}
            <HStack gap={4} align={"center"} w={"full"}>
              <Avatar.Root shape={"rounded"} size={"2xl"}>
                <Avatar.Fallback>
                  <Image src="/musicfallback.png" />
                </Avatar.Fallback>
                <Avatar.Image src={(activeQueue as Song[])[1]?.cover_url} />
              </Avatar.Root>
              <Stack gap={0}>
                <Link to={`track/${(activeQueue as Song[])[1]?.id}`}>
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
                    {activeQueue[1]?.title.toUpperCase()}
                  </Text>
                </Link>
                <Link to={`/artists/${activeQueue[1]?.artist_id}`}>
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
                    {activeQueue[1]?.artist}
                  </Text>
                </Link>
              </Stack>
            </HStack>
          </>
        ) : (
          <Text>Queue is empty</Text>
        )}
      </Card.Root>
    </Stack>
  );
}

export default SongContainer;
