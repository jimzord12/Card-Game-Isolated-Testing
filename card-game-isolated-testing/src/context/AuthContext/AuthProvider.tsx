import { createContext, useEffect, useState } from "react";
import { AuthContextProps, AuthProviderProps, userAuthType } from "./authTypes";
import { getPlayerByWallet, loginWithWallet } from "../../../api/apiFns";
import { useNavigate } from "react-router-dom";
import usePlayerInit from "../../hooks/initialization/usePlayerInit";
import useCardsInit from "../../hooks/initialization/useCardsInit";

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

  const { playerInit } = usePlayerInit();
  const { cardsInit } = useCardsInit();

  useEffect(() => {
    if (disableForTesting) {
      console.log(
        "%c🛑 | 🧪 |  - Authentication is DISABLED - | 🧪 | 🛑 ",
        "color: #ff0000; font-size: 16px; font-weight: bold; text-shadow: 2px 2px 0px #000000;"
      );
      setUser({ wallet: "0x123", aT: "123", rT: "123", username: "testUser" });
    }
  }, []);

  const navigate = useNavigate();

  /**
   *
   * @param walletAddress The user's wallet address
   * @description This function logs in the user and initializes the player and his/her cards
   */
  const login = async (walletAddress: string) => {
    try {
      const response = await loginWithWallet(walletAddress);
      setUser({ ...response });
      const playerData = await getPlayerByWallet(walletAddress);
      console.log("🧪 2.2 | - ✅ Successfully GOT Player Data: ", playerData);

      // 🔷 1. Initialize the Cards, and their side-effects if there are any
      if (playerData.cards !== undefined && playerData.cards !== null) {
        cardsInit(playerData.cards);
      }
      
      // 🔷 2. Initialize the Cards
      playerInit(playerData.player);


      if (playerData.player.gold === null)
        throw new Error("⛔ - Custom: Player is not initialized (has No Gold)");

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
