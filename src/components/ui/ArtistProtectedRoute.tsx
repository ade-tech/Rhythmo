import { useCurrentArtist } from "@/contexts/currentArtistContext";
import { Box, Image, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

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
