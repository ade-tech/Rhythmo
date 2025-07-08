import IconWithTooltip from "@/components/ui/IconWithTooltip";
import { PlayPauseMini } from "@/components/ui/PlayPause";
import { useCurrentMusic } from "@/contexts/audioContext";
import { useIsSongOpen } from "@/contexts/songContext";
import {
  formatNumberTime,
  useMusicPlayBack,
  useNextSong,
  usePrevSong,
  useReapeatMusic,
  useVolume,
} from "@/hooks/useAudioControls";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Slider,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { HiOutlineQueueList } from "react-icons/hi2";
import {
  PiRepeatFill,
  PiShuffle,
  PiSkipBackFill,
  PiSkipForwardFill,
  PiSpeakerHigh,
  PiSpeakerLow,
  PiSpeakerSlash,
} from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { usecreatePlaylistFromLike, useHasLikedSong } from "../likes/useLikes";
import { useCurrentUser } from "@/contexts/currentUserContext";
import { toaster } from "@/components/ui/toaster";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

/**
 * ActivelyPlayinTack Component
 *
 * Displays the currently playing track with playback controls and metadata.
 * Shows progress, album art, and allows user interaction (pause, skip, etc.).
 *
 * Usage:
 * - Rendered at the bottom of the main layout to show active playback.
 */

const ActivelyPlayinTack = () => {
  const naviagte = useNavigate();
  const { isShowingQueue, setIsShowingQueue } = useIsSongOpen();
  const { currentUser } = useCurrentUser();
  const { isOpen, setIsOpen } = useIsSongOpen();
  const {
    state: { activeSong, isLoopingSong, currentHowl, volume },
  } = useCurrentMusic();
  const { timeString, duration, currentTime, setCurrentTime } =
    useMusicPlayBack();
  const repeat = useReapeatMusic();
  const volumeFn = useVolume();
  const next = useNextSong();
  const previous = usePrevSong();
  const { likeSong, isPending } = usecreatePlaylistFromLike();
  const { data } = useHasLikedSong({
    song_id: activeSong?.id!,
    liker_id: currentUser?.data?.id!,
  });

  if (!activeSong) return null;

  function handleValueChange({ value }: { value: number[] }) {
    if (currentHowl && value !== undefined) {
      currentHowl.seek(value[0]);
      setCurrentTime(value[0]);
    }
  }
  function handleVolumeChange({ value }: { value: number[] }) {
    volumeFn(value.at(0)!);
  }

  return (
    <HStack
      h={"full"}
      flex={1}
      px={5}
      bg={"black"}
      display={"flex"}
      color={"white"}
      zIndex={1000}
      alignItems={"center"}
      pt={4}
    >
      <HStack gap={4} align={"center"}>
        <Avatar.Root
          shape={"rounded"}
          size={"2xl"}
          pos={"relative"}
          className="group"
        >
          <IconWithTooltip
            positioning="top"
            tooltipText={isOpen ? "Collapse" : "Expand"}
          >
            <Box
              as={isOpen ? FiChevronDown : FiChevronUp}
              pos={"absolute"}
              boxSize={6}
              color={"gray.50"}
              cursor={"pointer"}
              bg={"blackAlpha.900"}
              top={1}
              right={1}
              display={"none"}
              borderColor={"gray.900"}
              rounded={"full"}
              _groupHover={{
                display: "block",
              }}
              onClick={() => setIsOpen((cur) => !cur)}
            />
          </IconWithTooltip>
          <Avatar.Fallback>
            <Image src="/musicfallback.png" />
          </Avatar.Fallback>
          <Avatar.Image src={activeSong.cover_url} />
        </Avatar.Root>
        <Stack gap={0}>
          <Link to={`track/${activeSong.id}`}>
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
              {activeSong.title.toUpperCase()}
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
            {activeSong.artist}{" "}
            {activeSong.featured_artist
              ? `ft ${activeSong.featured_artist.at(0)}`
              : ""}
          </Text>
        </Stack>
        <IconWithTooltip tooltipText="Add to Fav.">
          <Button
            size={"xl"}
            bg={"none"}
            textStyle={"2xl"}
            cursor={"pointer"}
            disabled={isPending}
            p={0}
            rounded={"full"}
            color={data === 1 ? "green.500" : "gray.400"}
            onClick={
              data === 1
                ? undefined
                : () => {
                    likeSong(
                      {
                        song_id: activeSong?.id!,
                        created_by: currentUser?.data?.id!,
                      },
                      {
                        onError: () =>
                          toaster.create({
                            title: "❌ We could not make that happen",
                          }),
                        onSuccess: (data) =>
                          toaster.create({
                            title: "You like the song 💖",
                            action: {
                              label: "View",
                              onClick: () =>
                                naviagte(`/album/${data?.playlist_id}`),
                            },
                          }),
                      }
                    );
                  }
            }
          >
            {data === 1 ? (
              <IoCheckmarkCircleSharp size="2rem" />
            ) : (
              <GoPlusCircle size="2rem" />
            )}
          </Button>
        </IconWithTooltip>
      </HStack>
      <Spacer />
      <Stack
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={0}
        h={"full"}
      >
        <HStack gap={4} mb={1}>
          <IconWithTooltip tooltipText="Shuffle">
            <Box as={PiShuffle} boxSize={6} cursor={"pointer"} />
          </IconWithTooltip>
          <IconWithTooltip tooltipText="Previous">
            <Box
              as={PiSkipBackFill}
              boxSize={6}
              cursor={"pointer"}
              onClick={previous}
            />
          </IconWithTooltip>
          <PlayPauseMini />
          <IconWithTooltip tooltipText="Next">
            <Box
              as={PiSkipForwardFill}
              boxSize={6}
              cursor={"pointer"}
              onClick={next}
            />
          </IconWithTooltip>
          <IconWithTooltip tooltipText="Repeat">
            <Box
              as={PiRepeatFill}
              boxSize={6}
              cursor={"pointer"}
              onClick={() => repeat()}
              color={isLoopingSong ? "green.500" : "white"}
            />
          </IconWithTooltip>
        </HStack>
        <HStack gap={2}>
          <Text textStyle={"xs"} textAlign={"left"} w={"2rem"}>
            {timeString}
          </Text>
          <Slider.Root
            w={"md"}
            size={"sm"}
            value={[currentTime]}
            max={duration}
            onValueChange={handleValueChange}
            className="group"
            step={1}
          >
            <Slider.Control>
              <Slider.Track
                h={1}
                bg="gray.600"
                _groupHover={{ bg: "white" }}
                borderRadius={"full"}
              >
                <Slider.Range
                  bg="white"
                  borderRadius={"full"}
                  _groupHover={{ bg: "green.600" }}
                />
              </Slider.Track>
              <Slider.Thumb
                index={0}
                boxSize={3}
                bg="green.600"
                shadow="md"
                display={"none"}
                _groupHover={{ display: "block" }}
              />
            </Slider.Control>
          </Slider.Root>
          <Text textStyle={"xs"}>{formatNumberTime(duration!)}</Text>
        </HStack>
      </Stack>
      <Spacer />
      <HStack gap={3} mr={2}>
        <IconWithTooltip tooltipText="Show Queue">
          <Box
            as={HiOutlineQueueList}
            boxSize={5}
            color={isShowingQueue ? "green.600" : "white"}
            onClick={() => {
              if (!isShowingQueue && !isOpen) {
                setIsOpen(true);
              }
              setIsShowingQueue((cur) => !cur);
            }}
          />
        </IconWithTooltip>
        <HStack>
          <IconWithTooltip tooltipText="mute">
            {volume > 0.5 ? (
              <PiSpeakerHigh size={18} />
            ) : volume === 0 ? (
              <PiSpeakerSlash size={18} />
            ) : (
              <PiSpeakerLow size={18} />
            )}
          </IconWithTooltip>
          <Slider.Root
            w={24}
            size={"sm"}
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={1}
            step={0.05}
            min={0}
          >
            <Slider.Control>
              <Slider.Track h={1} bg="green.100" borderRadius={"full"}>
                <Slider.Range bg="green.600" borderRadius={"full"} />
              </Slider.Track>
              <Slider.Thumb index={0} boxSize={2} bg="green.600" shadow="md" />
            </Slider.Control>
          </Slider.Root>
        </HStack>
        <IconWithTooltip tooltipText="fullscreen">
          <SlSizeFullscreen size={16} />
        </IconWithTooltip>
      </HStack>
    </HStack>
  );
};

export default ActivelyPlayinTack;
