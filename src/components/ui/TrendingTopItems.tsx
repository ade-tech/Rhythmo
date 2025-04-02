import { Grid } from "@chakra-ui/react";
import MiniSongCard, { MiniSongCardPreLoader } from "./MiniSongCard";
import { useFetchSongs } from "@/features/tracks/useSong";

export function TrendingTopItems() {
  const { data, isLoading } = useFetchSongs();

  if (isLoading) return <TrendingTopItemsPreLoader />;

  return (
    <Grid
      templateColumns={"repeat(2, 1fr)"}
      mb={3}
      gap={2}
      mx={"auto"}
      w={"5/6"}
    >
      {Array.isArray(data) &&
        data?.map((song) => <MiniSongCard key={song.id} />)}
    </Grid>
  );
}

const TrendingTopItemsPreLoader = () => {
  return (
    <Grid
      templateColumns={"repeat(2, 1fr)"}
      mb={3}
      gap={2}
      mx={"auto"}
      w={"5/6"}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <MiniSongCardPreLoader key={i} />
      ))}
    </Grid>
  );
};

export default TrendingTopItems;
