import { ICardDB, ToolStoreType } from "../../types";
import { createJSCards } from "../../utils/game/createJSCards";
import { cardsInit as templateCardsInit } from "../../components/Modals/InGameModals/CraftCardModal/utils";
import SPCard from "../../classes/spClass_V2";
import { useAllCardsStore } from "../../stores/allCards";
import { useTownMapStore } from "../../stores/townMapEntitiesStore";
import { isSPCard } from "../../types/TypeGuardFns/SPGuards";
import { useGameVarsStore } from "../../stores/gameVars";
import { isToolStore } from "../../types/TypeGuardFns/isToolStore";
import { isBuildingCard } from "../../types/TypeGuardFns/BuildingGuards";
import { multipliersInit } from "./utils/multipliersInit";
import { specialEffectInit } from "./utils/specialEffectInit";

// Here we are Initializing:
// 1. All The Player's Cards
// 2. Special Effect Cards
// 3. Template Cards for Craft Modal
// 4. Active Effect Card
// 5. We also add them to the Town Map if there are activated

const useCardsInit = () => {
  // Town Map Store
  const addEntity = useTownMapStore((state) => state.addEntity);

  // All Cards Store
  const {
    addAllCards,
    addAllInventoryCards,
    addAllActiveCards,
    addAllTemplateCards,
    addAllSPCards,
    setToolStoreCards,
  } = useAllCardsStore();

  // Game Vars Store
  const { setActiveEffect, setMultipliers } = useGameVarsStore(
    (state) => state
  );

  const cardsInit = (cardsFromDB: ICardDB[]) => {
    console.log("🙌 0 - All the Cards from DB: ", cardsFromDB);

    const convertedFromDB_To_JS = createJSCards(cardsFromDB); // 🔷 Convert the Cards from DB to JS
    const inventoryCards = convertedFromDB_To_JS.filter(
      (card) => card.state === false && card.forSale === false
    );
    const activeCards = convertedFromDB_To_JS.filter(
      (card) => card.state === true && card.forSale === false
    );
    const spCards = convertedFromDB_To_JS.filter((card) =>
      isSPCard(card)
    ) as SPCard[];
    const toolStoreCards = convertedFromDB_To_JS.filter(
      (card) => isBuildingCard(card) && isToolStore(card)
    ) as ToolStoreType[];

    // Special Effect Init
    const activeEffect = specialEffectInit(spCards); // 🔷 If there is an Active SP Card, creates the Effect.

    // Multipliers Init
    const multipliers = multipliersInit(toolStoreCards); // 🔷 If there are Multipliers, adds them to the Global State

    // Template Cards for Craft Modal
    const templateCards = templateCardsInit(); // 🔷 Initialize the Template Cards (Used in Craft Modal)

    addAllCards(convertedFromDB_To_JS); // 🔷 Add the Cards to Global State
    addAllInventoryCards(inventoryCards); // 🔷 Add the Inactive Cards to Global Inventory State
    addAllActiveCards(activeCards); // 🔷 Add the Active Cards to Global Active State
    addAllTemplateCards(templateCards); // 🔷 Add the Template Cards to Global State
    addAllSPCards(spCards); // 🔷 Add the SP Cards to Global State
    setToolStoreCards(toolStoreCards); // 🔷 Add the Tool Store Cards to Global State
    setMultipliers(multipliers); // 🔷 Add the Multipliers to Global State

    if (activeEffect !== null) setActiveEffect(activeEffect); // 🔷 If there is an Active SP Card, adds the Effect to Global State

    console.log("🙌 1 - All the Converted JS Cards: ", convertedFromDB_To_JS);
    console.log("🙌 2 - All the Inventory JS Cards: ", inventoryCards);
    console.log("🙌 3 - All the Active JS Cards: ", activeCards);
    console.log("🙌 5 - All the SP JS Cards: ", spCards);

    // 🔷 Adding the Active Cards, that are NOT SP, to the Town Map
    for (const card of activeCards) {
      if (isSPCard(card)) continue;
      addEntity(card);
    }
  };

  return { cardsInit };
};

export default useCardsInit;
