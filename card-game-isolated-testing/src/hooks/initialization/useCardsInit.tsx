import { ICardDB } from "../../types";
import { createJSCards } from "../../utils/game/createJSCards";
import { cardsInit as templateCardsInit } from "../../components/Modals/InGameModals/CraftCardModal/utils";
import SPCard from "../../classes/spClass_V2";
import { useAllCardsStore } from "../../stores/allCards";
import { useTownMapStore } from "../../stores/townMapEntitiesStore";
import { isSPCard } from "../../types/TypeGuardFns/SPGuards";
import { useGameVarsStore } from "../../stores/gameVars";
import EffectClass from "../../classes/effectClass";

const useCardsInit = () => {
  // Town Map Store
  const addEntity = useTownMapStore((state) => state.addEntity);

  // All Cards Store
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
  const addAllSPCards = useAllCardsStore((state) => state.addAllSPCards);

  // Game Vars Store
  const setActiveEffect = useGameVarsStore((state) => state.setActiveEffect);

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

    // Special Effect Init
    spCardsInit(spCards);

    // Template Cards for Craft Modal
    const templateCards = templateCardsInit(); // 🔷 Initialize the Template Cards (Used in Craft Modal)

    addAllCards(convertedFromDB_To_JS); // 🔷 Add the Cards to Global State
    addAllInventoryCards(inventoryCards); // 🔷 Add the Inactive Cards to Global Inventory State
    addAllActiveCards(activeCards); // 🔷 Add the Active Cards to Global Active State
    addAllTemplateCards(templateCards); // 🔷 Add the Template Cards to Global State
    addAllSPCards(spCards); // 🔷 Add the SP Cards to Global State

    console.log("🙌 1 - All the Converted JS Cards: ", convertedFromDB_To_JS);
    console.log("🙌 2 - All the Inventory JS Cards: ", inventoryCards);
    console.log("🙌 3 - All the Active JS Cards: ", activeCards);
    console.log("🙌 5 - All the SP JS Cards: ", spCards);

    for (const card of activeCards) {
      if (isSPCard(card)) continue;
      addEntity(card);
    }
  };

  const spCardsInit = (spCards: SPCard[]) => {
    const activeSpCards = spCards.filter((card) => card.state === true);
    if (activeSpCards.length > 1)
      throw new Error("⛔ - Custom: More than 1 Active Effect Card Detected!");
    if (activeSpCards.length === 1) {
      const spCard = activeSpCards[0];
      if (spCard.expiresAtUnix === null)
        throw new Error(
          "⛔ - Custom: Active Effect Card has no expiration date!"
        );
      const activeEffect = new EffectClass(spCard, spCard.expiresAtUnix);
      setActiveEffect(activeEffect);
      console.log("🙌 4 - The Active Effect: ", activeEffect);
    }
  };
  return { cardsInit };
};

export default useCardsInit;
