import { Box, Stack } from "@chakra-ui/react";
import IconWithTooltip from "./IconWithTooltip";
import { HiPlay } from "react-icons/hi";
import { IoPause, IoPauseCircle } from "react-icons/io5";
import { usePauseMusic, usePlayMusic } from "@/hooks/useAudioControls";
import { useCurrentMusic } from "@/contexts/audioContext";
import { IoMdPlay } from "react-icons/io";
import { SongQueryType } from "@/services/songsApi";

export const PlayPauseMini = ({ color = "white" }: { color?: string }) => {
  const {
    state: { activeQueue, activeSong, audioStatus },
  } = useCurrentMusic();
  const play = usePlayMusic();
  const pause = usePauseMusic();
  return (
    <IconWithTooltip tooltipText="Play">
      <Box
        as={audioStatus === "idle" ? HiPlay : IoPauseCircle}
        boxSize={10}
        cursor={"pointer"}
        color={color}
        onClick={() => {
          if (audioStatus === "playing") {
            pause();
            return;
          }
          play({ data: activeSong!, queue: activeQueue! });
        }}
      />
    </IconWithTooltip>
  );
};

export const PlayPause = ({ data: song }: { data: SongQueryType | null }) => {
  const { data, queue } = song ?? {};
  const {
    state: { activeSong, audioStatus },
  } = useCurrentMusic();
  const play = usePlayMusic();
  const pause = usePauseMusic();

  return (
    <IconWithTooltip
      tooltipText={
        activeSong?.title === data?.title && audioStatus === "playing"
          ? "Pause"
          : "play"
      }
    >
      <Stack
        bg={"green.500"}
        rounded={"full"}
        visibility={"hidden"}
        opacity={0}
        m={0}
        transition={"all ease-in-out 0.3s"}
        _groupHover={{
          visibility: "visible",
          opacity: 1,
        }}
        p={3}
        pos={"absolute"}
        bottom={2}
        right={1}
        _disabled={
          audioStatus === "loading"
            ? { pointerEvents: "none", opacity: 0.6 }
            : {}
        }
        onClick={() => {
          if (!song || data === undefined) return;
          if (audioStatus === "playing" && activeSong?.title === data?.title) {
            pause();
            return;
          }
          play({ data, queue });
        }}
        cursor={"pointer"}
      >
        <Box
          as={
            activeSong?.title === data?.title && audioStatus === "playing"
              ? IoPause
              : IoMdPlay
          }
          boxSize={6}
          color={"black"}
        />
      </Stack>
    </IconWithTooltip>
  );
};
