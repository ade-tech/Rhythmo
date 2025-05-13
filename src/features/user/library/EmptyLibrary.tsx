import { useCurrentUser } from "@/contexts/currentUserContext";
import { useCreatePlaylist } from "@/features/playlist/usePlaylist";
import {
  Box,
  Button,
  HStack,
  Popover,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const EmptyLibrary = () => {
  const { currentUser } = useCurrentUser();
  const { createPlaylist, isPending } = useCreatePlaylist();
  const navigate = useNavigate();
  return (
    <Box
      h={"fit"}
      px={5}
      py={5}
      bg={"gray.800"}
      rounded={"lg"}
      gap={3}
      display={"flex"}
      flexDir={"column"}
    >
      <Text textStyle={"lg"} fontWeight={"extrabold"}>
        Create your first Playlist
      </Text>
      <Text textStyle={"sm"} lineHeight={1.25}>
        it's easy, create and share your playlist with your friends
      </Text>
      {currentUser?.data && currentUser.data !== null && (
        <Button
          disabled={isPending}
          rounded={"full"}
          w={"full"}
          size={"sm"}
          onClick={() =>
            createPlaylist(
              {
                is_public: false,
                name: "Playlist #1",
                created_by: currentUser.data?.id!,
              },
              {
                onSuccess: (data) => navigate(`/album/${data.playlist_id}`),
                onError: (error) => console.log(error),
              }
            )
          }
        >
          Create Playlist
        </Button>
      )}
      <Popover.Root
        modal={true}
        positioning={{ placement: "left-end", offset: { mainAxis: 30 } }}
      >
        {!currentUser?.data && (
          <Popover.Trigger asChild>
            <Button rounded={"full"} w={"full"} size={"sm"}>
              Create Playlist
            </Button>
          </Popover.Trigger>
        )}
        <Portal>
          <Popover.Positioner>
            <Popover.Content>
              <Popover.Body bg={"green.600"} rounded={"lg"} h={"12"}>
                <Stack display={"flex"} flexDir={"column"}>
                  <Popover.Title
                    textStyle={"xl"}
                    fontWeight={"semibold"}
                    lineHeight={1}
                  >
                    Create a Playlist
                  </Popover.Title>
                  <Text textStyle={"sm"} fontWeight={"normal"}>
                    Log in to start creating playlists
                  </Text>
                  <HStack mt={2} justifyContent={"flex-end"} display={"flex"}>
                    <Popover.CloseTrigger asChild>
                      <Button
                        size={"xs"}
                        fontWeight={"semibold"}
                        rounded={"full"}
                        variant={"ghost"}
                        color={"black"}
                        _hover={{ bg: "transparent" }}
                      >
                        Not now
                      </Button>
                    </Popover.CloseTrigger>
                    <Button
                      size={"xs"}
                      rounded={"full"}
                      variant={"solid"}
                      colorPalette={"white"}
                      onClick={() => navigate("/login")}
                    >
                      Sign In
                    </Button>
                  </HStack>
                </Stack>
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </Box>
  );
};

export default EmptyLibrary;
