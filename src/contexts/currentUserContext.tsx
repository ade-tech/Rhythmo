import { useGetCurrentUser } from "@/features/auth/useOnboarding";
import { Profile } from "@/features/auth/userType";
import { User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface RhythmoUser {
  data: User | null;
  profileInfo: string | Profile;
}

interface UserContextValues {
  currentUser: RhythmoUser | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<RhythmoUser | undefined>>;
}

const currentUserContext = createContext<UserContextValues | undefined>(
  undefined
);

export function CurrentUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<RhythmoUser | undefined>(
    undefined
  );
  const { data, profileInfo } = useGetCurrentUser();

  useEffect(() => {
    if (
      data === null ||
      typeof profileInfo === "string" ||
      profileInfo?.at(0)?.user_type !== "user"
    ) {
      setCurrentUser({
        data: null,
        profileInfo: "empty",
      });
      return;
    }

    if (data && typeof profileInfo !== "string") {
      setCurrentUser({ data, profileInfo: profileInfo?.at(0) || "empty" });
    }
  }, [data, profileInfo?.at(0)]);
  return (
    <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </currentUserContext.Provider>
  );
}

export function useCurrentUser() {
  const context = useContext(currentUserContext);
  if (context === undefined)
    throw new Error("Current User context is used outside of the provider");

  return context;
}
