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
import { Box, Button, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import { IoLocationOutline } from "react-icons/io5";
import { MdEdit, MdMusicNote, MdVerified } from "react-icons/md";
import { PiCameraFill } from "react-icons/pi";

import SettingsItem from "./SettingsItem";

export function ArtistSettings() {
  const { currentArtist } = useCurrentArtist();
  const profile = currentArtist?.profileInfo;

  console.log(profile);
  return (
    <Box
      w={"full"}
      h={"full"}
      display={"flex"}
      maxH={"82vh"}
      overflow={"hidden"}
      overflowY={"auto"}
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
          mb={4}
          flex={1}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"flex-end"}
          gap={0.5}
        >
          <HStack gap={0.5} alignItems={"flex-end"}>
            <Text textStyle={"3xl"} fontWeight={"bold"} lineHeight={1}>
              {profile?.profiles.nickname}
            </Text>
            <Text color={"gray.500"}>({profile?.profiles.full_name})</Text>
            <Box as={MdVerified} ml={1} color={"green.500"} boxSize={6} />
            <Button
              bg={"transparent"}
              color={"gray.300"}
              rounded={"full"}
              size={"2xs"}
              borderColor={"gray.600"}
              borderWidth={"1px"}
              px={3}
              ml={4}
            >
              <MdEdit /> Edit
            </Button>
          </HStack>
          <HStack gap={2} mt={1}>
            <Text display={"inline"} fontWeight={"bold"}>
              {formatNumbers(profile?.followers_count!)}{" "}
              <Text
                textStyle={"sm"}
                fontWeight={"medium"}
                color={"gray.500"}
                display={"inline"}
              >
                Followers
              </Text>
            </Text>
            <Text display={"inline"} fontWeight={"bold"}>
              {formatNumbers(profile?.monthly_plays ?? 0)}{" "}
              <Text
                textStyle={"sm"}
                fontWeight={"medium"}
                color={"gray.500"}
                display={"inline"}
              >
                Monthly Listeners
              </Text>
            </Text>
          </HStack>
          <HStack>
            <HStack color={"gray.500"} gap={0.5}>
              <IoLocationOutline />
              <Text display={"inline"} textStyle={"sm"} color={"white"}>
                {profile?.location}
              </Text>
            </HStack>
            <HStack color={"gray.500"} gap={0.5}>
              <MdMusicNote />
              <Text display={"inline"} textStyle={"sm"} color={"white"}>
                {profile?.songs_count}
              </Text>
            </HStack>
          </HStack>
        </Box>
      </Box>
      <Box ml={3} w={"97%"} mt={2}>
        <Text fontWeight={"bold"} textStyle={"2xl"} color={"white"}>
          Notification Preference
        </Text>
        <Text color={"gray.500"} textStyle={"sm"} mb={2}>
          Customize what kind of notifications you get and where you get them.
        </Text>
        <Box
          w={"full"}
          bg={"gray.800/50"}
          py={3}
          px={3}
          gap={3}
          display={"flex"}
          flexDir={"column"}
          mt={2}
          rounded={"lg"}
        >
          <SettingsItem title={"New Follower"} />
          <SettingsItem title={"New Video Like"} />
          <SettingsItem title={"New comments"} />
          <SettingsItem title={"Collaboration Invite"} />
        </Box>
      </Box>
      <Box ml={3} w={"97%"} mt={2}>
        <Text fontWeight={"bold"} textStyle={"2xl"} color={"white"}>
          Payout & Account
        </Text>
        <Text color={"gray.500"} textStyle={"sm"} mb={2}>
          Set up payment info and manage your account. No passwords needed.
        </Text>
        <Box
          w={"full"}
          bg={"gray.800/50"}
          py={3}
          px={3}
          gap={3}
          display={"flex"}
          flexDir={"column"}
          mt={2}
          rounded={"lg"}
        >
          <HStack px={2} h={10}>
            <Text>Payout Account Details</Text>
            <Spacer />

            <Box display={"flex"} gap={2} alignItems={"center"}>
              <Text textStyle={"sm"} color={"gray.400"}>
                224*****32
              </Text>
              <Box>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  p={0}
                  _hover={{
                    bg: "none",
                  }}
                  color={"gray.50"}
                  mx={2}
                >
                  View
                </Button>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  p={0}
                  _hover={{
                    bg: "none",
                  }}
                  color={"green.500"}
                >
                  Edit
                </Button>
              </Box>
            </Box>
          </HStack>

          <HStack px={2} h={10}>
            <Text>Account Email</Text>
            <Spacer />

            <Box display={"flex"} gap={2} alignItems={"center"}>
              <Text textStyle={"sm"} color={"gray.400"}>
                adelopo****@gmail.com
              </Text>
              <Button
                variant={"ghost"}
                size={"sm"}
                p={0}
                _hover={{
                  bg: "none",
                }}
                color={"green.500"}
              >
                Change
              </Button>
            </Box>
          </HStack>
          <HStack px={2} h={10}>
            <Text>Recovery Email</Text>
            <Spacer />

            <Box display={"flex"} gap={2} alignItems={"center"}>
              <Text textStyle={"sm"} color={"gray.400"}>
                loverboy****@reactdev.com
              </Text>
              <Button
                variant={"ghost"}
                size={"sm"}
                p={0}
                _hover={{
                  bg: "none",
                }}
                color={"green.500"}
              >
                Change
              </Button>
            </Box>
          </HStack>
        </Box>
      </Box>

      <Box ml={3} w={"97%"} mt={2}>
        <Text fontWeight={"bold"} textStyle={"2xl"} color={"white"}>
          Advanced
        </Text>
        <Text color={"gray.500"} textStyle={"sm"} mb={2}>
          Advanced Rhythmo settings, don't do these unless you are sure.
        </Text>
        <Box
          w={"full"}
          bg={"gray.800/50"}
          py={3}
          px={3}
          gap={3}
          display={"flex"}
          flexDir={"column"}
          mt={2}
          rounded={"lg"}
        >
          <HStack px={2} h={10}>
            <Text>Hirbernate My Account</Text>
            <Spacer />
            <Button
              variant={"ghost"}
              size={"sm"}
              p={0}
              _hover={{
                bg: "none",
              }}
              color={"red.500"}
            >
              Hibernate
            </Button>
          </HStack>
          <HStack px={2} h={10}>
            <Text>Delete My Account</Text>
            <Spacer />
            <Button
              variant={"ghost"}
              size={"sm"}
              p={0}
              _hover={{
                bg: "none",
              }}
              color={"red.500"}
            >
              Delete
            </Button>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}

export default ArtistSettings;
