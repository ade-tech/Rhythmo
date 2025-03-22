import { Flex, HStack, Image, Spacer, Stack, Text } from "@chakra-ui/react";
import { GoPlusCircle } from "react-icons/go";
import { HiOutlineUpload, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

export function SongContainer() {
  return (
    <Stack w={"1/3"} className="bg-darker-overlay" p={4}>
      <Stack>
        <HStack mb={1}>
          <Link to="sada">
            <Text
              textStyle={"lg"}
              color={"white"}
              transitionDuration={"200ms"}
              _hover={{
                textDecoration: "underline",
                transition: "ease-in-out",
              }}
              fontWeight={"medium"}
            >
              SPRINTER
            </Text>
          </Link>
          <Spacer />
          <HiX className="text-gray-400" size={20} />
        </HStack>
        <Image
          rounded={"lg"}
          width={"300px"}
          height={"300px"}
          objectFit={"cover"}
          mb={2}
          src="https://swjwzsoqbpfsivdzudfx.supabase.co/storage/v1/object/public/Temp//ab6761610000e5ebf6469f2cbf0a7e78744a3173.jpg"
        />
        <Stack gap={0}>
          <Flex>
            <Stack gap={0}>
              <Link to="sada">
                <Text
                  textStyle={"2xl"}
                  color={"white"}
                  transitionDuration={"200ms"}
                  _hover={{
                    textDecoration: "underline",
                    transition: "ease-in-out",
                  }}
                  fontWeight={"bold"}
                >
                  SPRINTER
                </Text>
              </Link>
              <Text
                textStyle={"md"}
                color={"gray.400"}
                transitionDuration={"200ms"}
                _hover={{
                  textDecoration: "underline",
                  transition: "ease-in-out",
                }}
                fontWeight={"medium"}
              >
                Central Cee
              </Text>
            </Stack>
            <Spacer />
            <HStack mr={1}>
              <Link to="sada"></Link>
              <HiOutlineUpload size={20} className="text-gray-400" />
              <GoPlusCircle size={20} className="text-gray-400" />
            </HStack>
          </Flex>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default SongContainer;
