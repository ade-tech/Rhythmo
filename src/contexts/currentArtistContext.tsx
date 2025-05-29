/**
 * @file src/contexts/currentArtistContext.tsx
 * @description Provides authentication and profile state for the current artist.
 *
 * Usage:
 * - Wrap your app in <CurrentArtistProvider>.
 * - Use useCurrentArtist() to access or update artist state anywhere in the app.
 */

import { Artist } from "@/features/artist/artistTypes";
import { useGetCurrentArtist } from "@/features/auth/useOnboarding";
import { User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * RhythmoArtist type contains Supabase user data and artist profile info.
 * @typedef {Object} RhythmoArtist
 * @property {User | null} data - The Supabase user data.
 * @property {Artist | null} profileInfo - The artist profile information.
 */

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
  error: Error | null;
}

const currentArtistContext = createContext<UserContextValues | undefined>(
  undefined
);

/**
 * Provides the current artist context to child components.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} The provider component.
 */
export function CurrentArtistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentArtist, setCurrentArtist] = useState<RhythmoArtist | undefined>(
    undefined
  );
  const { data, profileInfo, isLoading, error } = useGetCurrentArtist();

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
      value={{ currentArtist, setCurrentArtist, isLoading, error }}
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
