import {
  // Avatar,
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
import { Tooltip } from "./tooltip";
import { GoHome, GoHomeFill } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
// import { MdOutlineNotifications } from "react-icons/md";
// import { Link } from "react-router-dom";

export function TopMenu() {
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
              <Tooltip content="Home">
                {isActive ? (
                  <GoHomeFill size={30} color="white" />
                ) : (
                  <GoHome size={30} color="white" />
                )}
              </Tooltip>
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
              placeholder="What do you wanna play"
              borderRadius={"3xl"}
              variant={"subtle"}
              focusRing={"none"}
              border={"none"}
              bg={"gray.900"}
              color={"white"}
            />
          </InputGroup>
        </HStack>
        {/* <HStack gap={4}>
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
              <Avatar.Fallback name="Dev Abdone" />
            </Avatar.Root>
          </Link>
        </HStack> */}
        <HStack gap={4}>
          <Link to={"/login"}>
            <Button variant={"ghost"} rounded={"full"} colorPalette={"gray"}>
              Start Listening
            </Button>
          </Link>
          <Separator orientation={"vertical"} height={"4"} mr={2} />
          <Link to={"/login/artist"}>
            <Button rounded={"full"} color={"gray.950"} bg={"white"}>
              Become an Artist
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}

export default TopMenu;
