import {
  Avatar,
  Box,
  Flex,
  HStack,
  Image,
  Input,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GoHome, GoHomeFill } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdOutlineNotifications } from "react-icons/md";
import IconWithTooltip from "@/components/ui/IconWithTooltip";
import { useCurrentArtist } from "@/contexts/currentArtistContext";

export function ArtistTopMenu() {
  const { currentArtist } = useCurrentArtist();
  return (
    <Box px={10} py={3} h={"fit"} w={"full"}>
      <Flex align={"center"} justifyContent={"space-between"}>
        <Image src="/Asset 4.png" width={130} mr={14} />
        <HStack w={"1/3"} gap={5}>
          <NavLink
            to="/artist"
            className={({ isActive }) =>
              `w-14 h-12 rounded-full flex items-center justify-center ${
                isActive ? "bg-dark-overlay" : "bg-darker-overlay"
              }`
            }
          >
            {({ isActive }) => (
              <IconWithTooltip tooltipText="Home">
                {isActive ? (
                  <GoHomeFill size={30} color="white" />
                ) : (
                  <GoHome size={30} color="white" />
                )}
              </IconWithTooltip>
            )}
          </NavLink>

          <Input
            size={"lg"}
            placeholder="What do you wanna play?"
            borderRadius={"3xl"}
            variant={"subtle"}
            focusRing={"none"}
            border={"none"}
            bg={"gray.900"}
            color={"white"}
          />
        </HStack>

        {currentArtist && currentArtist.profileInfo !== null && (
          <HStack gap={4}>
            <MdOutlineNotifications size={25} color="white" />
            <Stack gap={0} alignItems={"flex-end"}>
              <Text fontWeight={"bold"} lineHeight={1}>
                {currentArtist.profileInfo.profiles.nickname}
              </Text>
              <Text textStyle={"xs"} color={"gray.400"}>
                Verified Artist
              </Text>
            </Stack>
            <Separator
              orientation={"vertical"}
              height={"4"}
              mx={2}
              colorPalette={"gray"}
            />
            <Link to={"/artist/settings"}>
              <Avatar.Root colorPalette={"green"}>
                <Avatar.Image
                  src={currentArtist.profileInfo.profiles.avatar_url}
                />
                <Avatar.Fallback
                  name={currentArtist.profileInfo.profiles.nickname}
                />
              </Avatar.Root>
            </Link>
          </HStack>
        )}
      </Flex>
    </Box>
  );
}

export default ArtistTopMenu;
