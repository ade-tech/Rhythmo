import { Box, Grid, GridItem, Stack } from "@chakra-ui/react";
import TopMenu from "./TopMenu";
import LibraryContainer from "@/features/user/library/LibraryContainer";

const Home = () => {
  return (
    <Box bg="black" w="100vw" h="100dvh">
      <Stack w="100vw" h="100dvh">
        <TopMenu />
        <Grid flex={1} templateColumns="repeat(4, 1fr)" gap={3} px={3}>
          <GridItem colSpan={1}>
            <LibraryContainer />
          </GridItem>
          <GridItem colSpan={2}>wqe</GridItem>
          <GridItem colSpan={1}>wqe</GridItem>
        </Grid>
      </Stack>
    </Box>
  );
};

export default Home;
