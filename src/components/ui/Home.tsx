import { Box, Grid, GridItem, Stack } from "@chakra-ui/react";
import TopMenu from "./TopMenu";
import LibraryContainer from "@/features/user/library/LibraryContainer";
import MainContainer from "./MainContainer";

const Home = () => {
  return (
    <Box bg="black" w="100vw" h="100dvh">
      <Stack w="100vw" h="100dvh">
        <TopMenu />
        <Grid flex={1} templateColumns="repeat(4, 1fr)" gap={3} px={3}>
          <GridItem colSpan={1}>
            <LibraryContainer />
          </GridItem>
          <GridItem colSpan={3}>
            <MainContainer />
          </GridItem>
        </Grid>
      </Stack>
    </Box>
  );
};

export default Home;
