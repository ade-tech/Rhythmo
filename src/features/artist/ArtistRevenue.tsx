/**
 * ArtistRevenue Component
 *
 * Displays revenue and earnings information for the artist, including charts and payout history.
 *
 * Usage:
 * - Used in the artist dashboard to show financial performance.
 */

import Filter from "@/components/ui/Filter";
import RhythmoTable from "@/components/ui/RhythmoTable";
import { Box, Button, HStack, Spacer, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsBoxArrowInDown, BsBoxArrowUpRight } from "react-icons/bs";

export function ArtistRevenue() {
  const [filterValue, setFilterValue] = useState<string | null>(null);
  return (
    <Box
      w={"full"}
      h={"full"}
      display={"flex"}
      maxH={"82vh"}
      overflow={"hidden"}
      overflowY={"auto"}
      flexDir={"column"}
      color={"white"}
      gap={3}
      rounded={"lg"}
    >
      <HStack w={"full"} h={"2/5"}>
        <Box
          w={"2/3"}
          h={"full"}
          bgGradient={"to-bl"}
          gradientFrom={"green.800"}
          gradientTo={"green.600"}
          rounded={"lg"}
          display={"flex"}
          flexDir={"column"}
          p={8}
        >
          <Text textStyle={"2xl"} fontWeight={"bold"}>
            Payout Balance
          </Text>
          <Box display={"flex"} alignItems={"flex-end"} gap={3}>
            <Text
              mt={2}
              textStyle={"5xl"}
              display={"flex"}
              alignItems={"flex-end"}
              fontWeight={"extrabold"}
              lineHeight={1}
            >
              $230,004
              <Text textStyle={"3xl"} fontWeight={"semibold"}>
                .55
              </Text>
            </Text>
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <Box
                bg={"green.500/30"}
                rounded={"full"}
                px={2}
                py={1}
                borderWidth={"1px"}
                mb={1}
                borderColor={"green.600"}
              >
                <Text color={"green.50"} textStyle={"xs"}>
                  +2%
                </Text>
              </Box>
              <Text color={"green.50"} textStyle={"xs"}>
                Vs Last Month
              </Text>
            </Box>
          </Box>
          <Spacer />
          <HStack w={"full"} gap={2}>
            <Button
              w={"49%"}
              gap={1}
              bg={"green.950"}
              color={"green.400"}
              size={"lg"}
              rounded={"full"}
              textStyle={"lg"}
            >
              <BsBoxArrowInDown size={10} />
              <Text>Withdraw</Text>
            </Button>
            <Button
              w={"49%"}
              gap={1}
              color={"white"}
              _hover={{ bg: "none" }}
              borderColor={"white"}
              borderWidth={"1.5px"}
              variant={"outline"}
              size={"lg"}
              lineHeight={1}
              rounded={"full"}
            >
              <BsBoxArrowUpRight />
              <Text textStyle={"lg"}>Breakdown</Text>
            </Button>
          </HStack>
        </Box>
        <Box
          w={"1/3"}
          h={"full"}
          bgGradient={"to-bl"}
          gradientFrom={"gray.800"}
          gradientTo={"gray.600"}
          rounded={"lg"}
          p={5}
        >
          <Text mb={4} textStyle={"xl"} fontWeight={"bold"}>
            Payout Details
          </Text>

          <Box>
            <Text textStyle={"xs"} color={"gray.400"}>
              Bank
            </Text>
            <Text textStyle={"lg"} fontWeight={"bold"}>
              Bank Of America
            </Text>
          </Box>
          <Box>
            <Text textStyle={"xs"} color={"gray.400"}>
              Account Number
            </Text>
            <Text textStyle={"lg"} fontWeight={"bold"}>
              093 938 7109
            </Text>
          </Box>
          <Box>
            <Text textStyle={"xs"} color={"gray.400"}>
              Account Name
            </Text>
            <Text textStyle={"lg"} fontWeight={"bold"}>
              Adelopo Abdullah .A
            </Text>
          </Box>
        </Box>
      </HStack>
      <Box h={"3/5"} overflow={"hidden"} overflowY={"auto"} px={4}>
        <Box
          pt={2}
          w={"full"}
          pos={"sticky"}
          alignItems={"center"}
          display={"flex"}
          top={0}
          bg={"gray.950"}
        >
          <Text mb={4} textStyle={"xl"} fontWeight={"bold"}>
            Payout Details
          </Text>
          <Spacer />
          <Filter
            filterState={filterValue}
            filterValues={["Last 7 Days", "Last Month", "Last 90 Days"]}
            filterUpdate={setFilterValue}
          />
        </Box>
        <RhythmoTable
          headers={["Date", "Status", "Amount", "Charges"]}
          data={[
            {
              Date: "01-010-24",
              Status: "pending",
              Amount: 21000,
              Charges: 30.24,
            },
            {
              Date: "01-010-24",
              Status: "success",
              Amount: 2000,
              Charges: 3.24,
            },
            {
              Date: "01-010-24",
              Status: "failed",
              Amount: 2100,
              Charges: 0.24,
            },
            {
              Date: "01-010-24",
              Status: "success",
              Amount: 21000,
              Charges: 30.24,
            },
            {
              Date: "01-010-24",
              Status: "success",
              Amount: 21000,
              Charges: 30.24,
            },
            {
              Date: "01-010-24",
              Status: "failed",
              Amount: 21000,
              Charges: 30.24,
            },
          ]}
        />
      </Box>
    </Box>
  );
}

export default ArtistRevenue;
