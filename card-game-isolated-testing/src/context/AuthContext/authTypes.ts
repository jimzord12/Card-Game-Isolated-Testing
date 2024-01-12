import { ReactNode } from "react";

export type userAuthType = {
  username: string | null;
  wallet: string | null;
  rT: string | null;
  aT: string | null;
} | null;

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextProps {
  user: userAuthType;
  login: (userCreds: userAuthType) => void;
  logout: () => void;
}
