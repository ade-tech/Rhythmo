import { useRef } from "react";
import { HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useIsSongOpen } from "@/contexts/songContext";
import { useCurrentMusic } from "@/contexts/audioContext";
import { HiX } from "react-icons/hi";
import QueueItem from "./QueueItem";

/**
 * QueueContainer Component
 *
 * Displays the current playback queue for the user.
 * Allows reordering, removing, or playing songs from the queue.
 *
 * Usage:
 * - Used as a modal or sidebar to manage the playback queue.
 */

export function QueueContainer() {
  const { isOpen, isShowingQueue, setIsShowingQueue } = useIsSongOpen();
  const {
    state: { activeSong, activeQueue },
  } = useCurrentMusic();
  const ref = useRef<HTMLDivElement>(null);

  if (!activeSong) return null;
  if (!isShowingQueue) return null;
  return (
    <Stack
      ref={ref}
      color={"white"}
      w={"1/4"}
      className="bg-darker-overlay"
      h={"75dvh"}
      pos={isOpen ? "absolute" : "relative"}
      right={1}
      pb={4}
    >
      <Stack
        w={"full"}
        className="bg-darker-overlay"
        h={"75dvh"}
        overflowY={"auto"}
        pos={"relative"}
        pb={4}
      >
        <HStack
          mb={1}
          px={4}
          pos={"sticky"}
          w={"full"}
          top={0}
          bg={"gray.950"}
          pt={4}
          pb={3}
          zIndex={1000000}
        >
          <Link to={`track/${activeSong.id}`}>
            <Text
              textStyle={"lg"}
              color={"white"}
              transitionDuration={"200ms"}
              _hover={{
                textDecoration: "underline",
                transition: "ease-in-out",
              }}
              fontWeight={"medium"}
            >
              Queue
            </Text>
          </Link>
          <Spacer />
          <HiX
            cursor={"pointer"}
            className="text-gray-400"
            size={20}
            onClick={() => setIsShowingQueue(false)}
          />
        </HStack>

        <Stack px={4}>
          <Text fontWeight={"bold"} mb={2}>
            Now Playing
          </Text>
          <QueueItem song={activeSong} textColor="green.600" />
        </Stack>
        <Stack px={4} mt={5}>
          <Text fontWeight={"bold"} mb={2}>
            Next Up
          </Text>
          {activeQueue
            ?.filter((song) => song.title !== activeSong.title)
            ?.map((song) => (
              <QueueItem key={song.id} song={song} />
            ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default QueueContainer;
