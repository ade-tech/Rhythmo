import {
  useFollowArtist,
  useHasFollowArtist,
} from "@/features/likes/useFollow";
import { Button } from "@chakra-ui/react";
import { toaster } from "./toaster";

interface FollowButtonProps {
  artist_id: string;
  currentUser: string;
}

export default function FollowButton({
  artist_id,
  currentUser,
}: FollowButtonProps) {
  const { mutate, isPending } = useFollowArtist();
  const { data, isLoading } = useHasFollowArtist({
    artist_id,
    follower_id: currentUser,
  });

  const hasFollowed = !isLoading && data === 1;

  return (
    <Button
      rounded={"full"}
      variant={hasFollowed ? "ghost" : "subtle"}
      border={hasFollowed ? "1px solid gray" : ""}
      color={"white"}
      disabled={isLoading || isPending}
      bg={hasFollowed ? "transparent" : "green.600"}
      onClick={
        hasFollowed
          ? undefined
          : () =>
              mutate(
                { artist_id, follower_id: currentUser },
                {
                  onSuccess: () =>
                    toaster.create({
                      title: "Done! 😍",
                    }),
                  onError: () =>
                    toaster.create({
                      title: "We could not make that happen",
                    }),
                }
              )
      }
    >
      {hasFollowed ? "Following" : "Follow"}
    </Button>
  );
}
