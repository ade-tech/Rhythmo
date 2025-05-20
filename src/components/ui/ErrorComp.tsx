import { Box, Text } from "@chakra-ui/react";
import { HiOutlineStatusOffline } from "react-icons/hi";
import ReloadButton from "./ReloadButton";
import { IoReload } from "react-icons/io5";

const ErrorComp = () => {
  return (
    <Box
      w={"full"}
      h={"full"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box as={HiOutlineStatusOffline} boxSize={36} color={"gray.500"} mb={2} />
      <Text mb={1} textStyle={"6xl"} fontWeight={"medium"} color={"gray.500"}>
        You are Offline
      </Text>
      <Text textAlign={"center"} lineHeight={"1.3"} color={"gray.300"}>
        Rythmo could not get your music kindly check your <br />
        internet connection
      </Text>
      <ReloadButton type="reload" icon={<IoReload />} title="Try Again" />
    </Box>
  );
};

export default ErrorComp;
