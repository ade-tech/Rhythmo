import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

/**
 * ArtistLayout Component
 *
 * Provides a layout wrapper for artist-specific routes and pages.
 * Renders nested routes using React Router's Outlet.
 *
 * Usage:
 * - Used as a parent layout for artist dashboard and profile routes.
 */

export function ArtistLayout() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export default ArtistLayout;
