import { Song } from "@/features/tracks/songType";
import { JSX } from "@emotion/react/jsx-runtime";
import React, { createContext, useContext, useReducer } from "react";

interface AudioReducerTypes {
  state: AudioContextType;
  setAudioStatus: (status: "idle" | "playing" | "loading") => void;
  setCurrentHowl: (howl: Howl) => void;
  setCurrentSong: (song: Song) => void;
  setCurrentQueue: (queue: Song[]) => void;
  loopSong: () => void;
  loopQueue: () => void;
  shuffleQueue: () => void;
  setVolume: (value: number) => void;
}

interface AudioContextType {
  activeSong: Song | null;
  currentHowl: Howl | null;
  audioStatus: "idle" | "playing" | "loading";
  isLoopingSong: boolean;
  isShufflingQueue: boolean;
  activeQueue: Song[] | undefined;
  isLoopingQueue: boolean;
  volume: number;
}
interface RythymoActionType {
  type: Action;
  payload?: any;
}

type Action =
  | "SET_AUDIO_STATUS"
  | "SET_CURRENT_HOWL"
  | "SET_SONG_TO_LOOPING"
  | "SET_QUEUE_TO_SHUFFLING"
  | "SET_QUEUE_TO_LOOPING"
  | "SET_CURRENT_SONG"
  | "SET_CURRENT_QUEUE"
  | "CHANGE_VOLUME";

const audioContext = createContext<AudioReducerTypes | undefined>(undefined);

const initialState: AudioContextType = {
  activeSong: null,
  currentHowl: null,
  audioStatus: "idle",
  isLoopingSong: false,
  isShufflingQueue: false,
  activeQueue: undefined,
  isLoopingQueue: false,
  volume: 1,
};

function reducer(
  state: AudioContextType,
  action: RythymoActionType
): AudioContextType {
  switch (action.type) {
    case "SET_AUDIO_STATUS":
      return { ...state, audioStatus: action.payload };
    case "SET_CURRENT_HOWL":
      return { ...state, currentHowl: action.payload };
    case "SET_SONG_TO_LOOPING":
      return { ...state, isLoopingSong: !state.isLoopingSong };
    case "SET_QUEUE_TO_SHUFFLING":
      return { ...state, isShufflingQueue: !state.isShufflingQueue };
    case "SET_QUEUE_TO_LOOPING":
      return { ...state, isLoopingQueue: !state.isLoopingQueue };
    case "SET_CURRENT_SONG":
      return { ...state, activeSong: action.payload };
    case "SET_CURRENT_QUEUE":
      return { ...state, activeQueue: action.payload };
    case "CHANGE_VOLUME":
      return { ...state, volume: action.payload };

    default:
      return state;
  }
}

export function AudioContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setAudioStatus = (status: "idle" | "playing" | "loading"): void =>
    dispatch({ type: "SET_AUDIO_STATUS", payload: status });
  const setCurrentHowl = (howl: Howl): void =>
    dispatch({ type: "SET_CURRENT_HOWL", payload: howl });
  const setCurrentSong = (song: Song): void =>
    dispatch({ type: "SET_CURRENT_SONG", payload: song });
  const setCurrentQueue = (queue: Song[]): void =>
    dispatch({ type: "SET_CURRENT_QUEUE", payload: queue });
  const loopSong = (): void => dispatch({ type: "SET_SONG_TO_LOOPING" });
  const loopQueue = (): void => dispatch({ type: "SET_QUEUE_TO_LOOPING" });
  const shuffleQueue = (): void => dispatch({ type: "SET_QUEUE_TO_SHUFFLING" });
  const setVolume = (value: number): void =>
    dispatch({ type: "CHANGE_VOLUME", payload: value });

  return (
    <audioContext.Provider
      value={{
        state,
        setAudioStatus,
        setCurrentQueue,
        setCurrentSong,
        setCurrentHowl,
        loopQueue,
        loopSong,
        shuffleQueue,
        setVolume,
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
