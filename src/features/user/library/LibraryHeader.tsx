/**
 * @file src/features/user/library/LibraryHeader.tsx
 * @description Contains the LibraryHeader component, which displays the header section for the user's library view, including title and controls.
 * This component is responsible for rendering the library title, filter options, and any relevant actions for the user's library.
 */

import { useCurrentUser } from "@/contexts/currentUserContext";
import {
  useCreatePlaylist,
  useFetchPlaylists,
} from "@/features/playlist/usePlaylist";
import { Button, HStack, Spacer, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { LuLibrary } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

/**
 * LibraryHeader Component
 *
 * Renders the header section for the user's music library.
 * Includes navigation, search, and filter controls for the library view.
 *
 * Usage:
 * - Used at the top of the LibraryContainer to provide context and controls.
 */

export function LibraryHeader() {
  const { currentUser } = useCurrentUser();
  const { createPlaylist, isPending } = useCreatePlaylist();
  const { data, isLoading } = useFetchPlaylists(currentUser?.data?.id!);
  const navigate = useNavigate();
  return (
    <HStack mb={6}>
      <Text
        display={"flex"}
        alignItems={"center"}
        gap={1}
        textStyle={"xl"}
        color={"gray.500"}
        fontWeight={"bold"}
      >
        <LuLibrary />
        Your Library
      </Text>
      <Spacer />
      <Button
        size={"xs"}
        rounded={"full"}
        variant={"subtle"}
        bg={"gray.900"}
        disabled={isPending || isLoading}
        color={"white"}
        onClick={() =>
          createPlaylist(
            {
              is_public: false,
              name: `Playlist #${(data?.length || 1) + 1}`,
              created_by: currentUser?.data?.id!,
            },
            {
              onSuccess: (data) => navigate(`/album/${data.playlist_id}`),
              onError: (error) => console.log(error),
            }
          )
        }
      >
        <FiPlus className="text-gray-500" />
        Create Playlist
      </Button>
    </HStack>
  );
}

export default LibraryHeader;
