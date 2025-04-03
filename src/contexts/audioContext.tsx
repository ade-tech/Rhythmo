import { Song } from "@/features/tracks/songType";
import { JSX } from "@emotion/react/jsx-runtime";
import React, { createContext, useContext, useState } from "react";

interface AudioContextType {
  activeSong: Song | null;
  currentHowl: Howl | null;

  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveSong: React.Dispatch<React.SetStateAction<Song | null>>;
  setCurrentHowl: React.Dispatch<React.SetStateAction<Howl | null>>;
}

const audioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentHowl, setCurrentHowl] = useState<Howl | null>(null);
  return (
    <audioContext.Provider
      value={{
        activeSong,
        currentHowl,
        setCurrentHowl,
        setActiveSong,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </audioContext.Provider>
  );
}

export function useCurrentMusic() {
  const context = useContext(audioContext);
  if (context === undefined)
    throw new Error(
      "Current Playing Music context is used outside of it's provider"
    );

  return context;
}
