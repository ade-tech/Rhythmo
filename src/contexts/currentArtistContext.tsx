import { Artist } from "@/features/artist/artistTypes";
import { useGetCurrentArtist } from "@/features/auth/useOnboarding";
import { User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface RhythmoArtist {
  data: User | null;
  profileInfo: null | Artist;
}

interface UserContextValues {
  currentArtist: RhythmoArtist | undefined;
  isLoading: boolean;
  setCurrentArtist: React.Dispatch<
    React.SetStateAction<RhythmoArtist | undefined>
  >;
}

const currentArtistContext = createContext<UserContextValues | undefined>(
  undefined
);

export function CurrentArtistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentArtist, setCurrentArtist] = useState<RhythmoArtist | undefined>(
    undefined
  );
  const { data, profileInfo, isLoading } = useGetCurrentArtist();

  useEffect(() => {
    if (!isLoading && (data || profileInfo)) {
      setCurrentArtist({
        data: data ? data : null,
        profileInfo: profileInfo?.at(0) || null,
      });
    }
  }, [data, profileInfo?.at(0)]);
  return (
    <currentArtistContext.Provider
      value={{ currentArtist, setCurrentArtist, isLoading }}
    >
      {children}
    </currentArtistContext.Provider>
  );
}

export function useCurrentArtist() {
  const context = useContext(currentArtistContext);
  if (context === undefined)
    throw new Error("Current User context is used outside of the provider");

  return context;
}
