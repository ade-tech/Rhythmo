import { Box } from "@chakra-ui/react";
import IconWithTooltip from "./IconWithTooltip";
import { useCurrentUser } from "@/contexts/currentUserContext";
import {
  usecreatePlaylistFromLike,
  useHasLikedSong,
} from "@/features/likes/useLikes";
import { toaster } from "./toaster";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { GoPlusCircle } from "react-icons/go";
import { Song } from "@/features/tracks/songType";

interface addSongLikeProps {
  song: Song;
  boxSize: number;
}

export default function AddToLikeSongButton({
  song,
  boxSize,
}: addSongLikeProps) {
  const { currentUser } = useCurrentUser();
  const naviagte = useNavigate();

  const { likeSong } = usecreatePlaylistFromLike();
  const { data } = useHasLikedSong({
    song_id: song?.id!,
    liker_id: currentUser?.data?.id!,
  });
  return (
    <IconWithTooltip tooltipText="Add to Fav.">
      <Box
        cursor={"pointer"}
        as={data === 1 ? IoCheckmarkCircleSharp : GoPlusCircle}
        boxSize={boxSize}
        color={data === 1 ? "green.500" : "gray.400"}
        onClick={
          data === 1 || !song
            ? undefined
            : () => {
                likeSong(
                  {
                    song_id: song?.id!,
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
      />
    </IconWithTooltip>
  );
}
