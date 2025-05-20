import { Box, Image, Text } from "@chakra-ui/react";
import { MdError } from "react-icons/md";
import ReloadButton from "./ReloadButton";
import { GoHomeFill } from "react-icons/go";
import { Link } from "react-router-dom";

export function PageNotFound() {
  return (
    <Box
      w={"full"}
      h={"100dvh"}
      display={"flex"}
      alignItems={"center"}
      bg={"gray.900"}
      justifyContent={"center"}
      flexDir={"column"}
    >
      <Link to={"/"} className="absolute top-6 left-6">
        <Image src="/Asset 4.png" width={130} mr={14} />
      </Link>
      <Box as={MdError} boxSize={"10rem"} />
      <Box w={"3/5"} textAlign={"center"}>
        <Text textStyle={"5xl"} mb={4} fontWeight={"extrabold"}>
          Whoops! You’ve hit a dead end.
        </Text>
        <Text>
          Looks like the page you want isn’t here. Try going back to where you
          came <br /> from or visit our homepage to continue browsing.
        </Text>
        <ReloadButton type="home" title="Back to Home" icon={<GoHomeFill />} />
      </Box>
    </Box>
  );
}

export default PageNotFound;
