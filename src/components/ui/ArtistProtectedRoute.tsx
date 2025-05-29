import { useCurrentArtist } from "@/contexts/currentArtistContext";
import { Box, Image, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ReloadButton from "./ReloadButton";
import { GoHomeFill } from "react-icons/go";

/**
 * ArtistProtectedRoute Component
 *
 * Protects artist-specific routes by ensuring the current artist is loaded and valid before rendering children.
 * Displays a loading indicator while artist data is being fetched, and shows a message if loading takes longer than expected.
 * Redirects to the home page if the artist data is incomplete or missing.
 *
 * Usage:
 * - Wrap artist dashboard and profile routes with this component to require authentication.
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
  const { currentArtist, isLoading, error } = useCurrentArtist();
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
        flexDir={"column"}
        justifyContent={"center"}
        className="bg-darker-overlay"
        rounded={"lg"}
      >
        <Image src="/Rhythmo.svg" w={"4rem"} animation={"bounce"} />
        {showMessage && (
          <>
            <Stack mt={4}>
              {error ? (
                <Text
                  textStyle={"2xl"}
                  lineHeight={1.2}
                  color={"gray.500"}
                  textAlign={"center"}
                >
                  It seems there was an error,
                  <br />
                  kindly use the button below to go back.
                </Text>
              ) : (
                <Text
                  textStyle={"2xl"}
                  lineHeight={1.2}
                  color={"gray.500"}
                  textAlign={"center"}
                >
                  This is taking longer than expected,
                  <br />
                  kindly reload this tab.
                </Text>
              )}
            </Stack>
            {error && (
              <ReloadButton
                type="home"
                title="Back to Home"
                icon={<GoHomeFill />}
              />
            )}
          </>
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
