/**
 * @file src/contexts/currentUserContext.tsx
 * @description Provides authentication and profile state for the current user.
 *
 * Usage:
 * - Wrap your app in <CurrentUserProvider>.
 * - Use useCurrentUser() to access or update user state anywhere in the app.
 */

import { useGetCurrentUser } from "@/features/auth/useOnboarding";
import { Profile } from "@/features/auth/userType";
import { User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface RhythmoUser {
  data: User | null;
  profileInfo: string | Profile;
}

/**
 * RhythmoUser type contains Supabase user data and user profile info.
 * @typedef {Object} RhythmoUser
 * @property {User | null} data - The Supabase user data.
 * @property {string | Profile} profileInfo - The user profile information or 'empty' if not loaded.
 */

interface UserContextValues {
  currentUser: RhythmoUser | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<RhythmoUser | undefined>>;
}

const currentUserContext = createContext<UserContextValues | undefined>(
  undefined
);

/**
 * Provides the current user context to child components.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} The provider component.
 */
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
