import { createContext, useState } from "react";
import { AuthContextProps, AuthProviderProps, userAuthType } from "./authTypes";
import { fetchUserDataWithWallet } from "../../../api/apiFns";
import { useNavigate } from "react-router-dom";

// Create a context for authentication
export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: null,
  login: null,
  logout: null,
});

// Component to provide authentication context
export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<userAuthType>(null); // This should be your auth logic
  const navigate = useNavigate();

  //TODO: (CHANGE)THIS is <<Mock>> logic for: Login & Logout
  const login = async (walletAddress: string) => {
    try {
      const response = await fetchUserDataWithWallet(walletAddress);
      setUser({ ...response });
      console.log("🧪 - Logging in User - With Data: ", response);
      navigate("/game");
    } catch (error) {
      console.error("⛔ - Custom: AuthProvider: Login error: ", error);
    }
  };
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
