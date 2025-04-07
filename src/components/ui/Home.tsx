import { Box, Grid, GridItem, Stack } from "@chakra-ui/react";
import TopMenu from "./TopMenu";
import LibraryContainer from "@/features/user/library/LibraryContainer";
import MainContainer from "./MainContainer";
import ActivelyPlayinTack from "@/features/tracks/ActivelyPlayinTack";
import { useCurrentMusic } from "@/contexts/audioContext";

const Home = () => {
  const { state } = useCurrentMusic();
  return (
    <Box bg="black" w="100vw" h="100dvh">
      <Stack w="100vw" h="100dvh">
        <TopMenu />
        <Grid
          h={state.activeSong ? "75dvh" : "86dvh"}
          templateColumns="repeat(4, 1fr)"
          gap={3}
          px={3}
          overflow={"hidden"}
        >
          <GridItem colSpan={1}>
            <LibraryContainer />
          </GridItem>
          <GridItem colSpan={3}>
            <MainContainer />
          </GridItem>
        </Grid>
        <ActivelyPlayinTack />
      </Stack>
    </Box>
  );
};

export default Home;
