import { Box, HStack } from "@chakra-ui/react";
import Filter from "./Filter";
import TrendingSection from "./TrendingSection";
import TrendingTopItems from "./TrendingTopItems";
import { useFetchSongs } from "@/features/tracks/useSong";

import { useCurrentMusic } from "@/contexts/audioContext";
import { useCurrentUser } from "@/contexts/currentUserContext";
import TotalEmpty from "./TotalEmpty";
import ErrorComp from "./ErrorComp";
import LandingPageAlt from "./LandingPageAlt";
import { useState } from "react";

const TrendingContainer = () => {
  const { data, isLoading, error } = useFetchSongs();
  const [filterState, setFilterState] = useState<string | null>("all");
  const { currentUser } = useCurrentUser();
  const {
    state: { activeSong },
  } = useCurrentMusic();

  if (!isLoading && !error && (!data || !data?.length)) return <TotalEmpty />;
  if (!isLoading && error && (!data || !data?.length)) return <ErrorComp />;

  if (!currentUser || typeof currentUser.profileInfo === "string")
    return <LandingPageAlt user={currentUser} />;
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
        <Filter
          filterState={filterState}
          filterUpdate={setFilterState}
          filterValues={["all", "quran", "islamic music"]}
          defaultValue={"all"}
        />
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
