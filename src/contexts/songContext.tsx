/**
 * @file src/contexts/songContext.tsx
 * @description Provides global state for song modal/queue UI, including open/close state and queue visibility.
 *
 * Usage:
 * - Wrap your app in <OpenSongProvider> to provide context.
 * - Use useIsSongOpen() to access and control modal/queue state in any component.
 */

import React, { createContext, useContext, useState } from "react";

/**
 * SongType defines the shape of the song modal/queue context.
 * @typedef {Object} SongType
 * @property {boolean} isOpen - Whether the song modal is open.
 * @property {boolean} isShowingQueue - Whether the queue is being shown.
 * @property {Function} setIsOpen - State setter for modal open/close.
 * @property {Function} setIsShowingQueue - State setter for queue visibility.
 */

type SongType = {
  isOpen: boolean;
  isShowingQueue: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowingQueue: React.Dispatch<React.SetStateAction<boolean>>;
};

const songContext = createContext<SongType | undefined>(undefined);

/**
 * Provides the song modal/queue context to child components.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} The provider component.
 */
export default function OpenSongProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isShowingQueue, setIsShowingQueue] = useState<boolean>(false);
  return (
    <songContext.Provider
      value={{ isOpen, setIsOpen, isShowingQueue, setIsShowingQueue }}
    >
      {children}
    </songContext.Provider>
  );
}

/**
 * Custom hook to access the song modal/queue context.
 * Throws an error if used outside the provider.
 * @returns {SongType} The song modal/queue context value.
 */
export function useIsSongOpen() {
  const context = useContext(songContext);

  if (context === undefined)
    throw new Error("is Song Open context is used outside of it's Provider");

  return context;
}
