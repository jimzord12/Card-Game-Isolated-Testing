import { createContext, useState } from "react";
import { AuthContextProps, AuthProviderProps, userAuthType } from "./authTypes";

// Create a context for authentication
export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

// Component to provide authentication context
export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<userAuthType>(null); // This should be your auth logic

  //TODO: (CHANGE)THIS is <<Mock>> logic for: Login & Logout
  const login = (walletAddress: string) => {
    setUser(userCreds);
    console.log("🧪 - Logging in User - With Data: ", userCreds);
  };
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
