/**
 * @file src/contexts/audioContext.tsx
 * @description Provides global state and actions for music playback, including current song, Howl instance, queue, playback status, looping, shuffling, and volume.
 *
 * Usage:
 * - Wrap your app in <AudioContextProvider>.
 * - Use useCurrentMusic() to access and control playback state anywhere in the app.
 */

/**
 * AudioReducerTypes defines the actions and state for the audio context reducer.
 * @typedef {Object} AudioReducerTypes
 * @property {AudioContextType} state - The current audio context state.
 * @property {Function} setAudioStatus - Sets the audio status (idle, playing, loading).
 * @property {Function} setCurrentHowl - Sets the current Howl instance.
 * @property {Function} setCurrentSong - Sets the current song.
 * @property {Function} setCurrentQueue - Sets the current playback queue.
 * @property {Function} loopSong - Loops the current song.
 * @property {Function} loopQueue - Loops the current queue.
 * @property {Function} shuffleQueue - Shuffles the playback queue.
 * @property {Function} resetApp - Resets the audio context state.
 * @property {Function} setVolume - Sets the playback volume.
 */

/**
 * AudioContextType defines the shape of the audio context state.
 * @typedef {Object} AudioContextType
 * @property {Song | null} activeSong - The currently active song.
 * @property {Howl | null} currentHowl - The current Howl instance.
 * @property {"idle" | "playing" | "loading"} audioStatus - The current playback status.
 * @property {boolean} isLoopingSong - Whether the current song is looping.
 * @property {boolean} isShufflingQueue - Whether the queue is shuffled.
 * @property {Song[] | undefined} activeQueue - The current playback queue.
 * @property {boolean} isLoopingQueue - Whether the queue is looping.
 * @property {number} volume - The playback volume.
 */

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
  resetApp: () => void;
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
  | "CHANGE_VOLUME"
  | "RESET";

const audioContext = createContext<AudioReducerTypes | undefined>(undefined);

const initialState: AudioContextType = {
  activeSong: null,
  currentHowl: null,
  audioStatus: "idle",
  isLoopingSong: false,
  isShufflingQueue: false,
  activeQueue: undefined,
  isLoopingQueue: false,
  volume: 0.5,
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
    case "RESET":
      return initialState;

    default:
      return state;
  }
}

/**
 * Provides the AudioContext to child components.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} The provider component.
 */
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
  const resetApp = (): void => dispatch({ type: "RESET" });

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
        resetApp,
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
