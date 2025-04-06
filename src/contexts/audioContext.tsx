import { Song } from "@/features/tracks/songType";
import { JSX } from "@emotion/react/jsx-runtime";
import React, { createContext, useContext, useState } from "react";

interface AudioContextType {
  activeSong: Song | null;
  currentHowl: Howl | null;

  audioStatus: "idle" | "playing" | "loading";
  setAudioStatus: React.Dispatch<
    React.SetStateAction<"idle" | "playing" | "loading">
  >;
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
  const [audioStatus, setAudioStatus] = useState<
    "idle" | "playing" | "loading"
  >("idle");
  const [currentHowl, setCurrentHowl] = useState<Howl | null>(null);
  return (
    <audioContext.Provider
      value={{
        activeSong,
        currentHowl,
        setCurrentHowl,
        setActiveSong,
        audioStatus,
        setAudioStatus,
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
