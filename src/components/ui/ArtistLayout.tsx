import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function ArtistLayout() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export default ArtistLayout;
