import "./cardGrid.css";

import {
  classBuilding,
  classREG,
  classSP,
} from "../../../../../classes/index.js";
// import {
//   isFloat,
//   rarityCoverter,
//   convertToMySQLDateTime,
//   convertToMySQLDate,
// } from "./utils";

// import TemplateCard from "../../../../Cards/CardTemplates/CompleteCard/CompleteCard.js";

import {
  useToastConfetti,
  useToastError,
} from "../../../../../hooks/notifications";

// import vertDivider from "../../myAssets/vertical_section_divider.png";
// import CustomInput from "../../../../CustomInput/CustomInput";

import {
  createCardStats,
  sellCard,
  updateCardData,
  createCard,
  updatePlayerData as updatePlayerDataSQL,
} from "../../../../../../api/apiFns/index.js";

//@Note: These images imports are all over the place! When refactoring, find a way to centralize them.
import { cardsWithStats } from "../../../../../constants/game/gameConfig";
import {
  BuildingTemplateId,
  CardClass,
  CardRequirements,
  RegTemplateId,
  SPTemplateId,
} from "../../../../../types/index.js";
import SPCard from "../../../../../classes/spClass_V2.js";

import { useAllCardsStore } from "../../../../../stores/allCards.js";
import { useGameVarsStore } from "../../../../../stores/gameVars.js";
import { templateIdToTemplateDataREG } from "../../../../../constants/templates/regsTemplates.js";
import { templateIdToTemplateDataBuilding } from "../../../../../constants/templates/buildingsTemplates.js";
import { templateIdToTemplateDataSP } from "../../../../../constants/templates/spsTemplates.js";
// import { useTownMapStore } from "../../../../../stores/townMapEntitiesStore.js";
// import { isSPCard } from "../../../../../types/TypeGuardFns/SPGuards.js";
import CraftingCardGrid from "./Parts/CraftingCardGrid/CraftingCardGrid.js";
import InventoryCardGrid from "./Parts/InventoryCardGrid/InventoryCardGrid.js";
import { useMutation } from "@tanstack/react-query";
import { isSPCard } from "../../../../../types/TypeGuardFns/SPGuards.js";
import {
  hasEnoughResources,
  subtractResources,
} from "../../../../../utils/game/resourcesHandlers.js";

interface CardGridProps {
  setSelectedCardModal: React.Dispatch<React.SetStateAction<CardClass | null>>;
  selectedCardModal: CardClass | null;
  // handleCardClickScroll: (e: React.MouseEvent<HTMLDivElement>) => void;
  currentModal: "Inventory" | "Craft";
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cards: CardClass[];
  closeModal: () => void;
}

export default function CardGrid({
  setSelectedCardModal: setSelectedCard,
  selectedCardModal: selectedCard,
  // handleCardClickScroll,
  cards,
  currentModal,
  closeModal,
}: CardGridProps) {
  // console.log(" &&&& CardGrid: cards: ", cards);

  //   specialEffectsRef, // TODO: 🛑 NOT yet  implemented in GameVards
  //   maxLimitsRef, // TODO: use "townhallLevel" from GameVards + 🛑 a constants file
  //   awardPoints, // TODO: 🅱 🛑 Not yet implemented in Blockchain Hooks
  //   createNFTCard, // TODO: 🅱 🛑 Not yet implemented in Blockchain Hooks
  // } = usePlayerContext();

  const {
    activeCards,
    inventory: inventoryCards,
    addCardToInventory,
    removeCardFromInventory,
  } = useAllCardsStore((state) => state);

  const {
    energy,
    // energyConsumed,
    // energyProduced,
    // expences,
    player,
    updatePlayerData,
  } = useGameVarsStore((state) => state);

  // const mapEntities = useTownMapStore((state) => state.mapEntities);

  const toastConfetti = useToastConfetti();
  const toastError = useToastError();

  // const [newCard_2, setNewCard_2] = useState<CardClass | null>(null); // Can't think another name for "newCard" 🤣
  // const [showPriceInput, setShowPriceInput] = useState(false);
  // const [priceInput /* setPriceInput */] = useState("");

  let newCard_2: CardClass | null = null;

  const {
    // data: newCardData,
    mutate: createCard_DB,
    // isSuccess: isSuccessNewCard,
  } = useMutation({
    mutationFn: createCard, // Replace with your API function
    onError: (error) =>
      console.error("Error while creating the new card!", error),
    onSuccess: (newCardID) => {
      console.log("New Card: ", newCardID);
      console.log("1 - 😍🏝 - newCard_2: ", newCard_2);
      if (newCard_2 === null)
        throw new Error(
          "⛔ CardGrid: createCard_DB Mutations: newCard_2 is null!"
        );

      const newCard = newCard_2; // Just to make the code more readable
      newCard.id = newCardID.cardId; // This "newCardData" comes from the the createCard_DB Mutation

      addCardToInventory(newCard);

      if (cardsWithStats.includes(newCard.templateId)) {
        createCardStats_DB({
          cardId: newCard.id,
          gold: 0,
          concrete: 0,
          metals: 0,
          crystals: 0,
          population: 0,
          energy: 0,
          rank: 0,
          expenses: 0,
        });
      }
    },
  });

  // Mutation #2 - Create Card's Stats
  const { mutate: createCardStats_DB } = useMutation({
    mutationFn: createCardStats, // Replace with your API function
    onError: () => console.error("Error while creating the new card STATS!"),
    onSuccess: (newCardStats) => console.log("New Card STATS: ", newCardStats),
  });

  // Mutation #3 - Sell Card
  const { mutate: putCardForSale } = useMutation({
    mutationFn: sellCard, // Replace with your API function
    onError: (error) => console.error("Error while selling the card!", error),
    onSuccess: (response) => console.log("Response from MP: ", response),
  });

  /**
   * @firstCheck Completed ✅
   * @param type Can be: "reg" | "building" | "sp"
   * @param cardTemplateId  Can be: RegTemplateId | BuildingTemplateId | SPTemplateId
   * @returns A new Card of the CardClass Type
   */
  function createNewCard(
    type: "reg" | "building" | "sp",
    cardTemplateId: RegTemplateId | BuildingTemplateId | SPTemplateId
    // cardName: RegName | BuildingName | SPName
  ) {
    if (player === null) {
      toastError.showError("There was an Error!", "Player is null!");
      throw new Error("⛔ CardGrid: createNewCard: Player is null!");
    }

    let newCard: CardClass;

    switch (type) {
      case "reg":
        // 🔷 Checks if the Card Template ID is valid
        if (!(cardTemplateId in templateIdToTemplateDataREG)) {
          toastError.showError(
            "There was an Error!",
            "(REG) Invalid Template ID!"
          );
          throw new Error(
            "⛔ CardGrid: createNewCard: (REG) Invalid Template ID!"
          );
        }
        newCard = classREG.createNew({
          ownerId: player.id,
          templateId: cardTemplateId as RegTemplateId,
          playerName: player.name,
        });
        break;

      case "building":
        if (!(cardTemplateId in templateIdToTemplateDataBuilding)) {
          toastError.showError(
            "There was an Error!",
            "(Building) Invalid Template ID!"
          );

          throw new Error(
            "⛔ CardGrid: createNewCard: (Building) Invalid Template ID!"
          );
        }
        newCard = classBuilding.createNew({
          ownerId: player.id,
          templateId: cardTemplateId as BuildingTemplateId,
          playerName: player.name,
        });
        break;

      case "sp":
        if (!(cardTemplateId in templateIdToTemplateDataSP)) {
          toastError.showError(
            "There was an Error!",
            "(SP) Invalid Template ID!"
          );
          throw new Error(
            "⛔ CardGrid: createNewCard: (SP) Invalid Template ID!"
          );
        }
        newCard = classSP.createNew({
          ownerId: player.id,
          templateId: cardTemplateId as SPTemplateId,
          playerName: player.name,
        });
        break;

      default:
        toastError.showError(
          "There was an Error!",
          "createNewCard: Invalid Card Type!"
        );
        throw new Error("⛔ CardGrid: createNewCard: Invalid Card Type!");
    }

    // 🅱 Blockchain: Game Smart Contract
    // awardPoints("cardCreation"); // TODO: Implement This in Blockchain Hooks
    // createNFTCard(newCard.id, newCard.templateId); // TODO: Implement This in Blockchain Hooks

    // console.log("CardGrid, Create Card Data: ", newCard);
    newCard_2 = newCard; // This is done so in useEffect we have access to this Card.

    return newCard;
  }

  /**
   * @firstCheck Completed ✅
   * @param _card Selected Card
   * @param type Action type: "level" or "craft"
   * @description Checks if the player has the resources to level up or craft a card. If yes, it subtracts the resources from the player. If not, it shows an alert with the missing resources.
   */
  async function checkAndSubtractRes(
    _card: CardClass,
    type: "level" | "craft"
  ) {
    if (
      player === null ||
      player.gold === null ||
      player.concrete === null ||
      player.metals === null ||
      player.crystals === null ||
      player.population === null ||
      player.diesel === null ||
      energy === null
    ) {
      // console.log("player :>> ", player);
      // console.log("energy :>> ", energy);
      toastError.showError(
        "There was an Error!",
        "checkAndSubtractRes: Something is null!"
      );
      throw new Error("⛔ CardGrid: checkAndSubtractRes: Player is null!");
    }

    const playerResources: CardRequirements = {
      gold: player.gold,
      concrete: player.concrete,
      metals: player.metals,
      crystals: player.crystals,
      population: player.population,
      diesel: player.diesel,
    };

    const alertFlags = hasEnoughResources({
      playerResources: playerResources,
      requirements: _card.requirements,
    });

    // 🔷 If Player does NOT has enough resources
    if (alertFlags.length > 0) {
      toastError.showError(
        "Low on Resources",
        "😬 You are short on the following Resources: ",
        alertFlags.join(", ")
      );
    }

    // 🔷 If Card is MAX Level
    if (type === "level" && !(_card instanceof SPCard) && _card.level === 5) {
      toastError.showError(
        "MAX Level",
        "😅 Your Card is at the Maximum Level! It can not be leveled Up any further"
      );
      return;
    }

    console.log("OLD Player Resources: ", playerResources);
    // 🔷 Subtracks the Resources.
    const newPlayerResources = subtractResources({
      playerResources: playerResources,
      requirements: _card.requirements,
    });
    console.log("NEW Player Resources: ", newPlayerResources);

    // 🔷 Updates the Player Resources in DB
    const success_playerRes = await updatePlayerDataSQL(
      player.id,
      newPlayerResources
    );
    if (success_playerRes === false) {
      toastError.showError(
        "There was an Error!",
        "checkAndSubtractRes: updatePlayerDataSQL: Something went wrong!"
      );
      throw new Error(
        "⛔ CardGrid: checkAndSubtractRes: updatePlayerDataSQL: Something went wrong!"
      );
    }

    // 🔷 Updates the State of GameVars Store (Client)
    updatePlayerData(newPlayerResources);

    // 🔷 Checks if its a Level Up Call. Then levels Card Up and then updated DB
    if (type === "level" && !(_card instanceof SPCard) && _card.level >= 1) {
      _card.levelUp(); // 🔷 Level Up the Card
      const { level, id } = _card;
      if (id === null)
        throw new Error(
          "⛔ CardGrid: checkAndSubtractRes: While trying to lvl up: Card ID is null!"
        );

      updateCardData({ id, level }); // 🔷 Update MySQL Database

      toastConfetti.show(
        "Leveled Up Card",
        "💪 Awesome! You just leveled Up your Card!"
      );
    }

    // If this Call was for Crafting a Card
    if (type === "craft") {
      // 🔷 Creates a new Card Instance. 💥 This "newCard" does not have an ID yet!!!
      const newCard = createNewCard(_card.type, _card.templateId);

      // 🔷 If the Card is of SP type, stored Card in DB
      if (_card.type === "sp" || _card instanceof SPCard) {
        const { templateId, rarity, creationTime } = newCard;
        createCard_DB({
          templateId,
          in_mp: false,
          priceTag: null,
          ownerId: player.id,
          state: false,
          locked: false,
          rarity,
          creationTime: creationTime,
          creator: player.name,
        });
      } else {
        // 🔷 If the Card is NOT SP, stored Card in DB
        // 🔃 The difference is that SP Cards, have no level prop
        const { templateId, rarity, creationTime } = newCard;
        createCard_DB({
          templateId,
          level: 1,
          ownerId: player.id,
          state: false,
          locked: false,
          rarity,
          in_mp: false,
          priceTag: null,
          creationTime: creationTime,
          creator: player.name,
        });
      }

      toastConfetti.show(
        "Crafted New Card",
        "✨ You can check it out in your Inventory!"
      );
    }
  }

  // Here we register the effects of SE Cards
  // TODO: 🛑 Fix When Creating Game Loop
  /*
  function createEffect(_templateId, boost) {
    if (specialEffectsRef.current.isEffectActive) {
      return false;
    }
    if (testCardTemplateData[_templateId].name === "Workaholism") {
      return {
        isEffectActive: true,
        // endDate: 1679833229000, // @Important!: Very bad naming! StartDate is the correct one!!!
        endDate: Date.now(),
        goldGathRate: 1,
        popGrowthRate: 1,
        concreteGathRate: boost,
        metalsGathRate: boost,
        crystalsGathRate: boost,
      };
    }
  }
  */

  // TODO: 🛑 The Activation of Cards will be done by using the Map's Placeholders and the CardPicker Modal!
  // This will work only for SP Cards
  // TODO: 🛑 Check Again once you Implement the Special Effects

  const handleActivateClick = (card: SPCard) => {
    console.log("Attempting Card Activation: ", card);
    if (isSPCard(card)) {
      if (card.disabled === true) {
        toastError.showError(
          "MAX Special Effects Capacity",
          "😅 Special Effect Cards can be used only Once per Player. You have already used this one!"
        );
        return;
      }

      toastError.showError(
        "NOT Implemented Yet!",
        "😅 But you successfully called handleActivateClick"
      );
      // const effect = createEffect(_card.templateId, Number(_card.output.boost)); // TODO:
      // if (effect === false) {
      //   // alert('Only one effect can be active at a time. 😅');
      //   toastError.showError(
      //     "MAX Special Effects Capacity",
      //     "😅 Special Effect Cards can be used only Once per Player. You have already used this one!"
      //   );
      //   return;
      // } else {
      //   const { id } = _card;
      //   if (id === null)
      //     throw new Error(
      //       "⛔ Cardgrid: handleActivateClick (#1): Card ID is null!"
      //     );

      //   const mysqlDate = convertToMySQLDateTime(Date.now());
      //   console.log("HandleActivateClick::MySQLDate: ", mysqlDate);
      //   updateCardData({ id, state: 1, endDate: mysqlDate });
      //   specialEffectsRef.current = effect; // TODO: Add a Zustand Store Property "CurrentSPEffect" in GameVars
      // }
    }

    // // 0. Change Card's State to true
    // _card.activate();

    // // 4. Update MySQL Database
    // const { state, id } = _card;
    // if (id === null)
    //   throw new Error(
    //     "⛔ Cardgrid: handleActivateClick (#2): Card ID is null!"
    //   );
    // updateCardData({ id, state });

    // // 1. Add Selected Card => Activated Cards
    // // setActiveCards((prev) => [...prev, _card]); // TODO: Use Zustang Store, All Cards:
    // addCardToActiveCards(_card);

    // // 2. Remove Selected Card from the Inventory
    // // setInventoryCards([...removeObjectWithId(inventoryCards, _card.id)]); // TODO_DONE ✅: Use Zustang Store, All Cards: removeCardFromInventory(_card)
    // removeCardFromInventory(_card);

    // // 5. Unselect the Card. This also goes 1 step back in the Modal (Where all the cards are dispayed).
    // setSelectedCard(null);

    // // 6. Close the Modal
    // setIsOpen(false);
  };

  /**
   * @firstCheck Completed ✅
   * @param _card
   * @returns
   */
  const handleSellClick = (_card: CardClass) => {
    console.log("Selling this Card: ", _card);
    // handle sell functionality here
    // if (showPriceInput) {
    //   if (parseInt(priceInput) === 0 || priceInput === "") {
    //     setShowPriceInput(false);
    //     return;
    //   }

    if (_card === null || _card.id === null)
      throw new Error(
        "⛔ CardGrid: handleSellClick: Card is null or Card ID is null!"
      );
    putCardForSale({
      id: _card.id,
      in_mp: true,
      priceTag: Number(_card.priceTag),
      state: false,
    });

    removeCardFromInventory(_card); // 🔷 Remove Card from Inventory
    closeModal(); // 🔷 Close the Modal
    setSelectedCard(null); // 🔷 Go 1 step back in the Modal (Where all the cards are displayed)
    // setShowPriceInput(false); // 🔷 Hide the Price Input

    console.log("Sell Button was clicked!");
    console.log("Active Card: ", activeCards);
    console.log("Inventory: ", inventoryCards);
    return;
    // } else {
    //   setShowPriceInput(true);
    // }
  };

  /**
   * @firstCheck Completed ✅
   * @param _card
   */
  const handleLevelUpClick = (_card: CardClass) => {
    checkAndSubtractRes(_card, "level");
    closeModal();
  };

  /**
   * @firstCheck Completed ✅
   * @param card
   */
  const handleCraftClick = (card: CardClass) => {
    // handle craft functionality here
    // 1. Check if player has the resources to craft the Card
    // 2. If "Yes" => Next(), Else "No" Show AlertModal (Not yet created!)
    // 3. Subtract the resources from the player
    // 4. Create the new Card (It needs a unique ID)
    // 5. Add the Card to:
    //    1) MySQL
    //    2) To Blockchain
    //    3) Local Storage
    //    4) Frontend => CardsInInventory (Context Variable

    checkAndSubtractRes(card, "craft");

    // 6. Unselect the Card. This also goes 1 step back in the Modal (Where all the cards are dispayed).
    setSelectedCard(null);

    // 7. Close Gracefully the Modal
    closeModal();
  };

  return (
    <div className={selectedCard === null ? "card-grid" : "single-card-grid"}>
      {currentModal === "Craft" ? (
        <CraftingCardGrid
          cards={cards}
          handleCraftClick={handleCraftClick}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      ) : (
        <InventoryCardGrid
          cards={cards}
          handleLevelUp={handleLevelUpClick}
          handleSell={handleSellClick}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          handleActivate={handleActivateClick}
        />
      )}
    </div>
  );
}
