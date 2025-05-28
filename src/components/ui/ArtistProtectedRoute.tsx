import { useCurrentArtist } from "@/contexts/currentArtistContext";
import { Box, Image, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

/**
 * Protects artist-specific routes by ensuring the current artist is loaded and valid before rendering children.
 *
 * Displays a loading indicator while artist data is being fetched, and shows a message if loading takes longer than expected. Redirects to the home page if the artist data is incomplete or missing.
 *
 * @param children - The content to render if access is permitted.
 *
 * @returns The protected content, a loading indicator, or a redirect depending on the artist's authentication and data status.
 */
export function ArtistProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentArtist, isLoading } = useCurrentArtist();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowMessage(true), 3000);
  }, []);

  if (isLoading || !currentArtist) {
    console.log(currentArtist, isLoading, "Loading Block");
    return (
      <Box
        w={"full"}
        h={"100dvh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        className="bg-darker-overlay"
        rounded={"lg"}
      >
        <Image src="/Rhythmo.svg" w={"4rem"} animation={"bounce"} />
        {showMessage && (
          <Stack>
            <Text>
              This is taking longer than expected , check your internet
              connection
            </Text>
          </Stack>
        )}
      </Box>
    );
  }

  if (!currentArtist?.data || !currentArtist?.profileInfo) {
    console.log(currentArtist, isLoading, "Navigate Block");
    return <Navigate to="/" />;
  }

  console.log(currentArtist, isLoading, "Normal Block");
  return children;
}

export default ArtistProtectedRoute;
