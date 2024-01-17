import { createContext, useEffect, useState } from "react";
import { AuthContextProps, AuthProviderProps, userAuthType } from "./authTypes";
import { getPlayerByWallet, loginWithWallet } from "../../../api/apiFns";
import { useNavigate } from "react-router-dom";
import { useGameVarsStore } from "../../stores/gameVars";

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
  const setPlayer = useGameVarsStore((state) => state.setPlayer);

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
      console.log("🧪 1.1 | - 🚀 Logging in User - With Data...");
      const response = await loginWithWallet(walletAddress);
      setUser({ ...response });
      console.log("🧪 1.2 | - ✅ Logged User in - With Data: ", response);
      const playerData = await getPlayerByWallet(walletAddress);
      console.log("🧪 2.1 | - 🚀 Fetching Player In-Game Data...");

      setPlayer(playerData.player);
      console.log("🧪 2.2 | - ✅ Successfully GOT Player Data: ", playerData);

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
