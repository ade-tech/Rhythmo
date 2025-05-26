import { Box, HStack, Stack, Text } from "@chakra-ui/react";

interface StatItemProp {
  title: string;
  curFilter: string | null;
}
const MoneyStat = ({ title, curFilter }: StatItemProp) => {
  return (
    <Box
      rounded={"lg"}
      bgGradient={"to-bl"}
      gradientFrom={"green.600"}
      gradientTo={"green.950"}
      w={"full"}
      h={"full"}
      pl={5}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
    >
      <Text
        lineHeight={1}
        textStyle={"md"}
        fontWeight={"semibold"}
        color={"green.50"}
      >
        {title}
      </Text>
      <Text textStyle={"xs"} color={"green.100"}>
        {curFilter}
      </Text>
      <HStack
        color={"white"}
        w={"full"}
        display={"flex"}
        alignItems={"flex-end"}
      >
        <Text
          lineHeight={1}
          p={0}
          display={"inline"}
          textStyle={"7xl"}
          fontWeight={"extrabold"}
        >
          <Text display={"inline"} textStyle={"4xl"} mr={1}>
            $
          </Text>
          25K
        </Text>
        <Box
          bg={"green.500/30"}
          rounded={"full"}
          px={2}
          py={1}
          borderWidth={"1px"}
          borderColor={"green.600"}
          mb={5}
        >
          <Text color={"green.50"} textStyle={"xs"}>
            +2%
          </Text>
        </Box>
      </HStack>
      <HStack>
        <Stack gap={0}>
          <Text lineHeight={1} color={"green.100"} textStyle={"xs"}>
            Vs Last Month
          </Text>
          <Text
            lineHeight={1}
            p={0}
            display={"inline"}
            textStyle={"2xl"}
            fontWeight={"extrabold"}
          >
            $22,250
            <Text display={"inline"} textStyle={"xl"}>
              .25
            </Text>
          </Text>
        </Stack>
      </HStack>
    </Box>
  );
};

export default MoneyStat;
