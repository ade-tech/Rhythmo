import IconWithTooltip from "@/components/ui/IconWithTooltip";
import { PlayPauseMini } from "@/components/ui/PlayPause";
import { useCurrentMusic } from "@/contexts/audioContext";
import {
  usePauseMusic,
  usePlayMusic,
  useReapeatMusic,
} from "@/hooks/useAudioControls";
import {
  Avatar,
  Box,
  HStack,
  Image,
  Slider,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GoPlusCircle } from "react-icons/go";
import { HiOutlineQueueList } from "react-icons/hi2";
import {
  PiRepeatFill,
  PiShuffle,
  PiSkipBackFill,
  PiSkipForwardFill,
  PiSpeakerHigh,
} from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";
import { Link } from "react-router-dom";

const ActivelyPlayinTack = () => {
  const {
    state: { activeSong, isLoopingSong },
  } = useCurrentMusic();

  const repeat = useReapeatMusic();
  if (!activeSong) return null;

  return (
    <HStack
      h={"fit"}
      px={5}
      bg={"black"}
      display={"flex"}
      color={"white"}
      alignItems={"center"}
    >
      <HStack gap={4} align={"center"}>
        <Avatar.Root shape={"rounded"} size={"2xl"}>
          <Avatar.Fallback>
            <Image src="/musicfallback.png" />
          </Avatar.Fallback>
          <Avatar.Image src={activeSong.cover_url} />
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
          <GoPlusCircle size={20} className="text-gray-400" />
        </IconWithTooltip>
      </HStack>
      <Spacer />
      <Stack display={"flex"} alignItems={"center"} gap={0}>
        <HStack gap={4} mb={1}>
          <IconWithTooltip tooltipText="Shuffle">
            <Box as={PiShuffle} boxSize={6} cursor={"pointer"} />
          </IconWithTooltip>
          <IconWithTooltip tooltipText="Previous">
            <Box as={PiSkipBackFill} boxSize={6} cursor={"pointer"} />
          </IconWithTooltip>
          <PlayPauseMini />
          <IconWithTooltip tooltipText="Next">
            <Box as={PiSkipForwardFill} boxSize={6} cursor={"pointer"} />
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
        <HStack>
          <Text textStyle={"xs"}>1:05</Text>
          <Slider.Root w={"md"} size={"sm"} defaultValue={[30]}>
            <Slider.Control>
              <Slider.Track h={1} bg="green.100" borderRadius={"full"}>
                <Slider.Range bg="green.600" borderRadius={"full"} />
              </Slider.Track>
              <Slider.Thumb index={0} boxSize={3} bg="green.600" shadow="md" />
            </Slider.Control>
          </Slider.Root>
          <Text textStyle={"xs"}>1:05</Text>
        </HStack>
      </Stack>
      <Spacer />
      <HStack gap={3} mr={2}>
        <IconWithTooltip tooltipText="Show Queue">
          <HiOutlineQueueList size={18} />
        </IconWithTooltip>
        <HStack>
          <IconWithTooltip tooltipText="mute">
            <PiSpeakerHigh size={18} />
          </IconWithTooltip>
          <Slider.Root w={24} size={"sm"} defaultValue={[30]}>
            <Slider.Control>
              <Slider.Track h={1} bg="green.100" borderRadius={"full"}>
                <Slider.Range bg="green.600" borderRadius={"full"} />
              </Slider.Track>
              <Slider.Thumb index={0} boxSize={3} bg="green.600" shadow="md" />
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
