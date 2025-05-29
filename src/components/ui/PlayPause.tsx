/**
 * @file src/components/ui/PlayPause.tsx
 * @description Provides Play/Pause button components for controlling audio playback in the UI.
 *
 * Usage:
 * - Used in song, album, and player components to control playback state.
 */

import { Box, Stack } from "@chakra-ui/react";
import IconWithTooltip from "./IconWithTooltip";
import { HiPlay } from "react-icons/hi";
import { IoPause, IoPauseCircle } from "react-icons/io5";
import { usePauseMusic, usePlayMusic } from "@/hooks/useAudioControls";
import { useCurrentMusic } from "@/contexts/audioContext";
import { IoMdPlay } from "react-icons/io";
import { SongQueryType } from "@/services/songsApi";
import { useCurrentUser } from "@/contexts/currentUserContext";

/**
 * PlayPauseMini Component
 *
 * Renders a small play/pause button for quick playback control.
 * Integrates with global audio state and user authentication.
 *
 * @param {Object} props - Component props
 * @param {string} [props.color="white"] - The color of the icon
 * @returns {JSX.Element} The rendered mini play/pause button
 */
export const PlayPauseMini = ({ color = "white" }: { color?: string }) => {
  const {
    state: { activeQueue, activeSong, audioStatus },
  } = useCurrentMusic();
  const { currentUser } = useCurrentUser();
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
          if (!currentUser?.data || currentUser?.profileInfo === "string")
            return;
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

/**
 * PlayPause Component
 *
 * Renders a play/pause button for a specific song or queue, with optional relative/absolute positioning and custom size.
 * Integrates with global audio state and user authentication.
 *
 * @param {Object} props - Component props
 * @param {SongQueryType | undefined} props.data - The song and queue data to control
 * @param {boolean} [props.isRelative=false] - Whether the button is positioned relatively
 * @param {number} [props.boxSize=6] - The size of the icon
 * @returns {JSX.Element} The rendered play/pause button
 */
export const PlayPause = ({
  data: songs,
  boxSize = 6,
  isRelative = false,
}: {
  data: SongQueryType | undefined;
  isRelative?: boolean;
  boxSize?: number;
}) => {
  const { data, queue } = songs ?? {};
  const {
    state: { activeSong, audioStatus },
  } = useCurrentMusic();
  const play = usePlayMusic();
  const pause = usePauseMusic();
  const { currentUser } = useCurrentUser();

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
        visibility={isRelative ? "visible" : "hidden"}
        opacity={isRelative ? 1 : 0}
        m={0}
        transition={"all ease-in-out 0.3s"}
        _groupHover={{
          visibility: "visible",
          opacity: 1,
        }}
        p={3}
        pos={isRelative ? "relative" : "absolute"}
        bottom={isRelative ? 0 : 2}
        right={isRelative ? 0 : 1}
        _disabled={
          audioStatus === "loading"
            ? { pointerEvents: "none", opacity: 0.6 }
            : {}
        }
        onClick={() => {
          if (
            !songs ||
            data === undefined ||
            !currentUser?.data ||
            currentUser?.profileInfo === "string"
          )
            return;
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
          boxSize={boxSize}
          color={"black"}
        />
      </Stack>
    </IconWithTooltip>
  );
};
