import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

interface StatItemProp {
  title: string;
  curFilter: string | null;
  type?: "normal" | "chart";
}
const OtherStat = ({ title, curFilter, type = "normal" }: StatItemProp) => {
  const options: ApexOptions = {
    labels: ["Nigeria", "US", "UK", "Tanzania", "Canada"],

    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: false,
    },
    colors: ["#139041", "#D69E2E", "#DD6B20", "#3182CE", "#805AD5"],
  };

  const series = [44, 55, 41, 17, 15];

  if (type === "normal")
    return (
      <Box
        rounded={"lg"}
        bg={"gray.900/20"}
        w={"full"}
        h={"full"}
        pl={5}
        pos={"relative"}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
      >
        <Text
          lineHeight={1}
          textStyle={"md"}
          fontWeight={"semibold"}
          color={"green.500"}
        >
          {title}
        </Text>
        <Text textStyle={"xs"} color={"gray.400"}>
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
            1.5M
          </Text>
          <Box
            bg={"red.500/30"}
            rounded={"full"}
            px={2}
            py={1}
            borderWidth={"1px"}
            borderColor={"red.600"}
            mb={5}
          >
            <Text color={"red.100"} textStyle={"xs"}>
              -7%
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
              2,300,703
            </Text>
          </Stack>
        </HStack>
      </Box>
    );

  if (type === "chart")
    return (
      <Box
        rounded={"lg"}
        bg={"gray.900/20"}
        w={"full"}
        h={"full"}
        gridColumn={"span 2"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        p={1}
        pl={4}
        gap={1}
      >
        <Box display={"flex"} h={"full"} w={"full"}>
          <Stack flexBasis={"1/2"} gap={0} mt={5} ml={1}>
            <Text
              lineHeight={1}
              textStyle={"md"}
              fontWeight={"semibold"}
              color={"green.500"}
            >
              {title}
            </Text>
            <Text textStyle={"xs"} color={"gray.400"}>
              {curFilter}
            </Text>
            <Stack mt={6} gap={0}>
              <Text>
                <Text
                  display={"inline"}
                  mr={2}
                  textStyle={"sm"}
                  color="green.500"
                  fontWeight={"semibold"}
                >
                  #1
                </Text>
                Nigeria
              </Text>
              <Text>
                <Text
                  display={"inline"}
                  mr={2}
                  textStyle={"sm"}
                  fontWeight={"semibold"}
                  color="yellow.500"
                >
                  #2
                </Text>
                Tanzania
              </Text>
              <Text>
                <Text
                  display={"inline"}
                  mr={2}
                  fontWeight={"semibold"}
                  textStyle={"sm"}
                  color="orange.500"
                >
                  #3
                </Text>
                United Kingdom
              </Text>
              <Text>
                <Text
                  fontWeight={"semibold"}
                  display={"inline"}
                  mr={2}
                  textStyle={"sm"}
                  color="gray.500"
                >
                  #4
                </Text>
                South Africa
              </Text>
              <Text>
                <Text
                  fontWeight={"semibold"}
                  display={"inline"}
                  mr={2}
                  textStyle={"sm"}
                  color="gray.500"
                >
                  #5
                </Text>
                Others
              </Text>
            </Stack>
          </Stack>
          <Box flexBasis={"1/2"} pt={1}>
            <Chart
              series={series}
              options={options}
              height={"99%"}
              width={"100%"}
              type="donut"
            />
          </Box>
        </Box>
      </Box>
    );
};

export default OtherStat;
