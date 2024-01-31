import { createContext, useEffect, useState } from "react";
import { AuthContextProps, AuthProviderProps, userAuthType } from "./authTypes";
import { getPlayerByWallet, loginWithWallet } from "../../../api/apiFns";
import { useNavigate } from "react-router-dom";
import { useGameVarsStore } from "../../stores/gameVars";
import { useAllCardsStore } from "../../stores/allCards";
import { createJSCards } from "../../utils/game/createJSCards";
import { ICardDB } from "../../types";
import { cardsInit as templateCardsInit } from "../../components/Modals/InGameModals/CraftCardModal/utils";

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
  const addAllCards = useAllCardsStore((state) => state.addAllCards);
  const addAllInventoryCards = useAllCardsStore(
    (state) => state.addAllInventoryCards
  );
  const addAllActiveCards = useAllCardsStore(
    (state) => state.addAllActiveCards
  );
  const addAllTemplateCards = useAllCardsStore(
    (state) => state.addAllTemplateCards
  );

  useEffect(() => {
    if (disableForTesting) {
      // console.log(
      //   "%c🛑 | 🧪 |  - Authentication is DISABLED - | 🧪 | 🛑 ",
      //   "color: #ff0000; font-size: 16px; font-weight: bold; text-shadow: 2px 2px 0px #000000;"
      // );
      setUser({ wallet: "0x123", aT: "123", rT: "123", username: "testUser" });
    }
  }, []);

  const navigate = useNavigate();

  const login = async (walletAddress: string) => {
    try {
      console.log("🧪 1.1 | - 🚀 Logging in User...");
      const response = await loginWithWallet(walletAddress);
      setUser({ ...response });
      console.log("🧪 1.2 | - ✅ Logged User in - With Data: ", response);
      console.log("🧪 2.1 | - 🚀 Fetching Player In-Game Data...");
      const playerData = await getPlayerByWallet(walletAddress);
      console.log("🧪 2.2 | - ✅ Successfully GOT Player Data: ", playerData);

      setPlayer(playerData.player); // 🔷 Set the Player Data to Global State
      if (playerData.cards !== undefined && playerData.cards !== null) {
        cardsInit(playerData.cards); // 🔷 Initialize the Cards
      }

      console.log(
        "🧪 3.0 | - ✅ Added the Player Dato to Global State: ",
        playerData
      );
      console.log("🧪 3.1 | - 🐱‍🏍 Navigation to Game...");
      if (playerData.player.gold === null)
        throw new Error("⛔ - Custom: Player is not initialized (has No Gold)");

      navigate("/game");
    } catch (error) {
      console.error("⛔ - Custom: AuthProvider: Login error: ", error);
    }
  };

  const logout = () => setUser(null);

  const cardsInit = (cardsFromDB: ICardDB[]) => {
    console.log("🙌 0 - All the Cards from DB: ", cardsFromDB);

    const convertedFromDB_To_JS = createJSCards(cardsFromDB); // 🔷 Convert the Cards from DB to JS
    const inventoryCards = convertedFromDB_To_JS.filter(
      (card) => card.state === false
    );
    const activeCards = convertedFromDB_To_JS.filter(
      (card) => card.state === true
    );

    const templateCards = templateCardsInit(); // 🔷 Initialize the Template Cards (Used in Craft Modal)

    addAllCards(convertedFromDB_To_JS); // 🔷 Add the Cards to Global State
    addAllInventoryCards(inventoryCards); // 🔷 Add the Inactive Cards to Global Inventory State
    addAllActiveCards(activeCards); // 🔷 Add the Active Cards to Global Active State
    addAllTemplateCards(templateCards); // 🔷 Add the Template Cards to Global State

    console.log("🙌 1 - All the Converted JS Cards: ", convertedFromDB_To_JS);
    console.log("🙌 2 - All the Inventory JS Cards: ", inventoryCards);
    console.log("🙌 3 - All the Active JS Cards: ", activeCards);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
