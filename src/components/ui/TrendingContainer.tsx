import { Box, Button, HStack, Text } from "@chakra-ui/react";
import Filter from "./Filter";
import TrendingSection from "./TrendingSection";
import TrendingTopItems from "./TrendingTopItems";
import { useFetchSongs } from "@/features/tracks/useSong";
import { HiOutlineStatusOffline } from "react-icons/hi";
import { IoReload } from "react-icons/io5";
import { useCurrentMusic } from "@/contexts/audioContext";

const TrendingContainer = () => {
  const { data, isLoading } = useFetchSongs();
  const { activeSong } = useCurrentMusic();

  if (!isLoading && (!data || !data?.length))
    return (
      <Box
        w={"full"}
        h={"full"}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          as={HiOutlineStatusOffline}
          boxSize={36}
          color={"gray.500"}
          mb={2}
        />
        <Text mb={1} textStyle={"6xl"} fontWeight={"medium"} color={"gray.500"}>
          You are Offline
        </Text>
        <Text textAlign={"center"} lineHeight={"1.3"} color={"gray.300"}>
          Rythmo could not get your music kindly check your <br />
          internet connection
        </Text>
        <Button
          rounded={"full"}
          bg={"green.600"}
          textAlign={"center"}
          fontWeight={"bold"}
          color={"black"}
          mt={4}
          onClick={() => window.location.reload()}
        >
          <IoReload />
          Try Again
        </Button>
      </Box>
    );
  return (
    <Box
      h={activeSong ? "75dvh" : "86dvh"}
      overflow={"auto"}
      className="trend-group"
    >
      <HStack
        mb={1}
        px={2}
        pos={"sticky"}
        w={"full"}
        top={0}
        bg={"#111112"}
        pt={4}
        pl={6}
        pb={3}
        zIndex={10}
      >
        <Filter filterValues={["All", "Quran", "Islamic Music"]} />
      </HStack>
      <TrendingTopItems data={data} isLoading={isLoading} />

      <TrendingSection
        title="Trending Songs"
        data={data}
        isLoading={isLoading}
      />
      <TrendingSection title="Jump Back In" data={data} isLoading={isLoading} />
    </Box>
  );
};

export default TrendingContainer;
