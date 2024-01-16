import { ReactNode } from "react";

export type userAuthType = {
  username: string | null;
  wallet: string | null;
  rT: string | null;
  aT: string | null;
} | null;

export interface AuthProviderProps {
  children: ReactNode;
  disableForTesting?: boolean;
}

export interface AuthContextProps {
  user: userAuthType | null;
  setUser: React.Dispatch<React.SetStateAction<userAuthType>> | null;
  login: ((walletAddress: string) => Promise<void>) | null;
  logout: (() => void) | null;
}
