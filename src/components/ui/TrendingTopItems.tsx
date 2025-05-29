/**
 * TrendingTopItems Component
 *
 * Displays a grid of trending songs at the top of the trending section, with loading skeletons.
 *
 * Usage:
 * - Used on the home and trending pages to highlight top songs.
 */

import { Grid } from "@chakra-ui/react";
import MiniSongCard, { MiniSongCardPreLoader } from "./MiniSongCard";
import { useIsSongOpen } from "@/contexts/songContext";
import { JSX } from "@emotion/react/jsx-runtime";
import { Song } from "@/features/tracks/songType";

export function TrendingTopItems({
  data,
  isLoading,
}: {
  data: Song[] | undefined;
  isLoading: boolean;
}) {
  const { isOpen } = useIsSongOpen();

  if (isLoading) return <TrendingTopItemsPreLoader isOpen={isOpen} />;

  return (
    <Grid
      templateColumns={isOpen ? "repeat(2, 1fr)" : "repeat(4, 1fr)"}
      mb={3}
      px={isOpen ? 0 : 14}
      gap={2}
      mx={"auto"}
      w={isOpen ? "5/6" : "full"}
    >
      {Array.isArray(data) &&
        data?.map((song) => <MiniSongCard song={song} key={song.id} />)}
    </Grid>
  );
}

const TrendingTopItemsPreLoader = ({
  isOpen,
}: {
  isOpen: boolean;
}): JSX.Element => {
  return (
    <Grid
      templateColumns={isOpen ? "repeat(2, 1fr)" : "repeat(4, 1fr)"}
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
