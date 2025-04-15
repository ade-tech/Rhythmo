import { createContext } from "react";

type UserType = {};

const currentUserContext = createContext<UserType | undefined>(undefined);
