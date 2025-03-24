import IconWithTooltip from "@/components/ui/IconWithTooltip";
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
import { HiPlay } from "react-icons/hi";
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
  return (
    <HStack
      h={"fit"}
      px={5}
      bg={"black"}
      display={"flex"}
      alignItems={"center"}
    >
      <HStack gap={4} align={"center"}>
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
        <IconWithTooltip tooltipText="Add to Fav.">
          <GoPlusCircle size={20} className="text-gray-400" />
        </IconWithTooltip>
      </HStack>
      <Spacer />
      <Stack display={"flex"} alignItems={"center"} gap={0}>
        <HStack gap={4}>
          <IconWithTooltip tooltipText="Shuffle">
            <PiShuffle size={20} />
          </IconWithTooltip>
          <IconWithTooltip tooltipText="Previous">
            <PiSkipBackFill size={20} />
          </IconWithTooltip>
          <IconWithTooltip tooltipText="Play">
            <HiPlay size={45} />
          </IconWithTooltip>
          <IconWithTooltip tooltipText="Next">
            <PiSkipForwardFill size={20} />
          </IconWithTooltip>
          <IconWithTooltip tooltipText="Repeat">
            <PiRepeatFill size={20} />
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
