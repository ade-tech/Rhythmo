import { Box, Field, Link, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { FaImage } from "react-icons/fa6";
import { HiInformationCircle } from "react-icons/hi";
import { PiCameraPlusFill } from "react-icons/pi";
import DualButtonFooter from "./DualButtonFooter";
type BioUpdateProps = {
  Increamental?: React.Dispatch<React.SetStateAction<number>>;
};

export function BioUpdate({ Increamental }: BioUpdateProps) {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleClick = async () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosed(true);
      if (Increamental !== undefined) {
        Increamental((cur) => cur + 1);
      }
    }, 350);
  };
  return (
    <Box
      w={"1/3"}
      h={"1/2"}
      display={isClosed ? "none" : "flex"}
      pos={"relative"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      data-state={isClosing ? "closed" : "open"}
      gap={4}
      _open={{
        animation: "400ms fadeIn  ease-out ",
      }}
      _closed={{
        animation: "400ms fadeOut  ease-out ",
      }}
    >
      <Text textStyle={"4xl"} lineHeight={"0.9"} fontWeight={"semibold"}>
        Complete your Profile
      </Text>
      <Box flex={"1"} w={"full"} display={"flex"} justifyContent={"center"}>
        <Box
          mt={4}
          w={"95%"}
          h={"8rem"}
          borderWidth={"2px"}
          borderColor={"green.700"}
          borderStyle={"dashed"}
          rounded={"md"}
          bg={"green.subtle"}
          display={"flex"}
          justifyContent={"center"}
          flexDir={"column"}
          alignItems={"center"}
          gap={2}
        >
          <Box as={FaImage} boxSize={8} color={"green.500"} />
          <Box
            w={"full"}
            display={"flex"}
            justifyContent={"center"}
            textStyle={"sm"}
          >
            <Text> Drag your cover photo here or</Text>
            <Link textDecor={"underline"} color={"green.500"} py={0} ml={1}>
              Browse
            </Link>
          </Box>
        </Box>
      </Box>
      <Box
        w={"full"}
        display={"flex"}
        alignItems={"flex-start"}
        h={"10rem"}
        gap={5}
        px={3}
        mt={2}
      >
        <Box
          h={"8rem"}
          w={"8rem"}
          borderWidth={"2px"}
          borderColor={"green.700"}
          borderStyle={"dashed"}
          rounded={"full"}
          bg={"green.subtle"}
          display={"flex"}
          justifyContent={"center"}
          flexDir={"column"}
          alignItems={"center"}
          gap={2}
        >
          <Box as={PiCameraPlusFill} boxSize={8} color={"green.500"} />
          <Text textStyle={"xs"} textAlign={"center"}>
            Click Here to
            <br />
            Upload
          </Text>
        </Box>
        <Field.Root flex={1}>
          <Textarea
            resize={"none"}
            h={"8rem"}
            placeholder="Tell us about yourself..."
            bg={"gray.950"}
            focusRing={"none"}
          />
          <Field.HelperText
            display={"flex"}
            color={"white"}
            justifyContent={"center"}
          >
            <HiInformationCircle />
            About 50 words is good.
          </Field.HelperText>
        </Field.Root>
      </Box>
      <DualButtonFooter
        buttonTitle="Proceed"
        colorPallete="green"
        backAction={() => {
          if (Increamental !== undefined) {
            Increamental((cur) => cur - 1);
          }
        }}
        action={handleClick}
      />
    </Box>
  );
}

export default BioUpdate;
