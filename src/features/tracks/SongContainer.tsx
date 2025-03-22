import { HStack, Image, Spacer, Stack, Text } from "@chakra-ui/react";
import { HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

export function SongContainer() {
  return (
    <Stack w={"1/3"} className="bg-darker-overlay" p={4}>
      <Stack>
        <HStack mb={1}>
          <Link to="sada">
            <Text
              textStyle={"2xl"}
              color={"white"}
              _hover={{
                textDecoration: "underline",
              }}
              fontWeight={"bold"}
            >
              SPRINTER
            </Text>
          </Link>
          <Spacer />
          <HiX className="text-gray-400" size={25} />
        </HStack>
        <Image
          rounded={"md"}
          width={"300px"}
          height={"300px"}
          objectFit={"cover"}
          src="https://swjwzsoqbpfsivdzudfx.supabase.co/storage/v1/object/public/Temp//ab6761610000e5ebf6469f2cbf0a7e78744a3173.jpg"
        />
      </Stack>
    </Stack>
  );
}

export default SongContainer;
