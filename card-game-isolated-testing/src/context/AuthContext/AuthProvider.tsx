import { createContext, useEffect, useState } from "react";
import { AuthContextProps, AuthProviderProps, userAuthType } from "./authTypes";
import { loginWithWallet } from "../../../api/apiFns";
import { useNavigate } from "react-router-dom";

// Create a context for authentication
export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: null,
  login: null,
  logout: null,
});

// Component to provide authentication context
export default function AuthProvider({
  children,
  disableForTesting = false,
}: AuthProviderProps) {
  const [user, setUser] = useState<userAuthType>(null); // This should be your auth logic

  useEffect(() => {
    console.log(
      "%c🛑 | 🧪 |  - Authentication is DISABLED - | 🧪 | 🛑 ",
      "color: #ff0000; font-size: 16px; font-weight: bold; text-shadow: 2px 2px 0px #000000;"
    );
    if (disableForTesting)
      setUser({ wallet: "0x123", aT: "123", rT: "123", username: "testUser" });
  }, []);
  const navigate = useNavigate();

  const login = async (walletAddress: string) => {
    try {
      const response = await loginWithWallet(walletAddress);
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
