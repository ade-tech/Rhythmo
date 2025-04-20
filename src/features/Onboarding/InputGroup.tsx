import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
type InputGroupProps = {
  title: string;
  InputType: string;
  buttonLabel: string;
};

const InputGroup = (obj: InputGroupProps) => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  return (
    <Box
      w={"1/3"}
      h={"1/2"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      className={isClosing ? "closing" : ""}
      gap={4}
      animation={"400ms fadeIn  ease-out "}
    >
      <Text textStyle={"5xl"} fontWeight={"semibold"}>
        {" "}
        {obj.title}
      </Text>
      <Input type={obj.InputType} size={"xl"} bg={"gray.950"} />
      <Button
        w={"full"}
        textStyle={"lg"}
        mt={2}
        rounded={"full"}
        bg={"white"}
        color={"gray.950"}
        onClick={() => {
          setIsClosing(true);
          setTimeout(() => setIsClosed(true), 2000);
        }}
      >
        {obj.buttonLabel}
      </Button>
    </Box>
  );
};

export default InputGroup;
