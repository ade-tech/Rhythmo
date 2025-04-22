import { Box, Button, Spacer } from "@chakra-ui/react";
import { MdOutlineArrowBack } from "react-icons/md";

type DualButtonProps = {
  action?: () => void;
  backAction?: () => void;
  buttonTitle: string;
};

const DualButtonFooter = (obj: DualButtonProps) => {
  return (
    <Box w={"full"} display={"flex"} mt={4}>
      <Button onClick={obj.backAction} colorPalette={"white"} rounded={"full"}>
        <Box as={MdOutlineArrowBack} boxSize={4} />
      </Button>
      <Spacer />
      <Button
        textStyle={"lg"}
        fontWeight={"semibold"}
        onClick={obj.action}
        w={"1/3"}
        rounded={"full"}
        bg={"green.500"}
        color={"gray.950"}
        size={"lg"}
      >
        {obj.buttonTitle}
      </Button>
    </Box>
  );
};

export default DualButtonFooter;
