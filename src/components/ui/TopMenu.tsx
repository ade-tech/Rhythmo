/**
 * TopMenu Component
 *
 * Renders the top navigation menu for the app, including logo, navigation links, and user actions.
 *
 * Usage:
 * - Used as the main header for navigation and quick access to key features.
 */

import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  Separator,
  Text,
} from "@chakra-ui/react";
import { GoHome, GoHomeFill } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCurrentUser } from "@/contexts/currentUserContext";
import { MdOutlineNotifications } from "react-icons/md";
import IconWithTooltip from "./IconWithTooltip";

export function TopMenu() {
  const { currentUser } = useCurrentUser();
  return (
    <Box px={10} py={3} h={"fit"} w={"full"}>
      <Flex align={"center"} justifyContent={"space-between"}>
        <Image src="/Asset 4.png" width={130} mr={14} />
        <HStack w={"1/3"} gap={5}>
          <NavLink
            to="/"
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

          <InputGroup
            endElement={
              <>
                <Text mr={2}>|</Text>
                <NavLink to="/search">
                  {({ isActive }) =>
                    isActive ? (
                      <Image src="/musicFilled.svg" w={6} />
                    ) : (
                      <Image src="/musicOutlined.svg" w={6} />
                    )
                  }
                </NavLink>
              </>
            }
          >
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
          </InputGroup>
        </HStack>
        {(!currentUser ||
          !currentUser.data ||
          typeof currentUser.profileInfo === "string") && (
          <HStack gap={4}>
            <Link to={"/login"}>
              <Button
                variant={"ghost"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "none" }}
              >
                Start Listening
              </Button>
            </Link>
            <Separator
              orientation={"vertical"}
              colorPalette={"gray"}
              height={"4"}
              mr={2}
            />
            <Link to={"/artist/login"}>
              <Button rounded={"full"} color={"gray.950"} bg={"white"}>
                Become an Artist
              </Button>
            </Link>
          </HStack>
        )}
        {currentUser && typeof currentUser.profileInfo !== "string" && (
          <HStack gap={4}>
            <Button
              variant={"solid"}
              color={"gray.900"}
              bg={"white"}
              rounded={"full"}
            >
              Get Premium
            </Button>
            <MdOutlineNotifications size={25} color="white" />
            <Link to={"/profile"}>
              <Avatar.Root colorPalette={"green"}>
                <Avatar.Fallback name={currentUser.profileInfo.full_name} />
              </Avatar.Root>
            </Link>
          </HStack>
        )}
      </Flex>
    </Box>
  );
}

export default TopMenu;
