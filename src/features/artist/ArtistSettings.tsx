/**
 * @file src/features/artist/ArtistSettings.tsx
 * @description Provides settings and preferences for the artist account, allowing profile updates and account actions.
 *
 * Usage:
 * - Used in the artist dashboard for managing artist settings and profile information.
 *
 * @component
 * @returns {JSX.Element} The rendered artist settings UI.
 */

/**
 * ArtistSettings React component
 *
 * Displays and allows editing of artist profile information, including cover photo, avatar, nickname, and follower statistics.
 * Integrates with the current artist context and provides UI for profile updates.
 *
 * @returns {JSX.Element} The artist settings panel.
 */

import { useCurrentArtist } from "@/contexts/currentArtistContext";
import { formatNumbers } from "@/utils/FormatNumbers";
import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { PiCameraFill } from "react-icons/pi";

export function ArtistSettings() {
  const { currentArtist } = useCurrentArtist();
  const profile = currentArtist?.profileInfo;

  console.log(profile);
  return (
    <Box
      w={"full"}
      h={"full"}
      display={"flex"}
      flexDir={"column"}
      color={"white"}
      gap={3}
      rounded={"lg"}
    >
      <Box w={"full"} h={48} pos={"relative"} className="group">
        <Image
          src={profile?.cover_url}
          rounded={"lg"}
          w={"full"}
          h={"full"}
          objectFit={"cover"}
          objectPosition={"top"}
        />
        <Button
          pos={"absolute"}
          bg={"green.500"}
          color={"black"}
          fontWeight={"semibold"}
          transition={"opacity 0.25s ease-in"}
          opacity={0}
          rounded={"full"}
          right={4}
          _groupHover={{
            opacity: 1,
          }}
          bottom={4}
        >
          <PiCameraFill />
          Edit Cover Photo
        </Button>
      </Box>
      <Box
        w={"full"}
        gap={6}
        h={36}
        pl={12}
        mt={-10}
        display={"flex"}
        zIndex={1}
      >
        <Box w={36} h={36} pos={"relative"}>
          <Image
            w={"full"}
            h={"full"}
            rounded={"full"}
            border={"3px solid #111111"}
            src={profile?.profiles.avatar_url}
          />
          <Button
            w={10}
            pos={"absolute"}
            h={10}
            bgGradient={"to-bl"}
            rounded={"full"}
            gradientFrom={"green.500"}
            gradientTo={"green.700"}
            color={"white"}
            bottom={1}
            right={0}
            border={"3px solid #111111"}
          >
            <PiCameraFill />
          </Button>
        </Box>
        <Box
          flex={1}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"flex-end"}
        >
          <HStack gap={0.5} alignItems={"flex-end"}>
            <Text textStyle={"3xl"} fontWeight={"bold"} lineHeight={1}>
              {profile?.profiles.nickname}
            </Text>
            <Text color={"gray.400"}>({profile?.profiles.full_name})</Text>
          </HStack>
          <HStack gap={2} mt={1}>
            <Text display={"inline"} fontWeight={"bold"}>
              {formatNumbers(profile?.followers_count!)}{" "}
              <Text textStyle={"sm"} color={"gray.400"} display={"inline"}>
                Followers
              </Text>
            </Text>
            <Text display={"inline"} fontWeight={"bold"}>
              {formatNumbers(124506943)}{" "}
              <Text textStyle={"sm"} color={"gray.400"} display={"inline"}>
                Followers
              </Text>
            </Text>
          </HStack>
        </Box>
      </Box>
      <Box pl={3} mt={2} className="group">
        <Button
          bg={"transparent"}
          color={"gray.300"}
          rounded={"full"}
          size={"2xs"}
          borderColor={"gray.600"}
          borderWidth={"1px"}
          px={3}
        >
          <MdEdit /> Edit
        </Button>
      </Box>
    </Box>
  );
}

export default ArtistSettings;
