import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import ArtistTopMenu from "./ArtistMenu";
import SideNav from "./SideNav";
import SongStats from "./SongStats";

const ArtistHome = () => {
  return (
    <Box w={"full"} h={"100dvh"} display={"flex"} flexDir={"column"}>
      <ArtistTopMenu />
      <Box
        flex={1}
        px={4}
        pb={4}
        display={"grid"}
        gridTemplateColumns={"1fr 3fr 1.2fr"}
        gap={3}
      >
        <SideNav />
        <Box w={"full"} h={"full"} bg={"gray.950"} p={3} rounded={"lg"}>
          <Outlet />
        </Box>
        <SongStats />
      </Box>
    </Box>
  );
};

export default ArtistHome;
