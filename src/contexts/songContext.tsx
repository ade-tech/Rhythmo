import React, { createContext, useContext, useState } from "react";

type SongType = {
  isOpen: boolean;
  isShowingQueue: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowingQueue: React.Dispatch<React.SetStateAction<boolean>>;
};

const songContext = createContext<SongType | undefined>(undefined);

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

export function useIsSongOpen() {
  const context = useContext(songContext);

  if (context === undefined)
    throw new Error("is Song Open context is used outside of it's Provider");

  return context;
}
