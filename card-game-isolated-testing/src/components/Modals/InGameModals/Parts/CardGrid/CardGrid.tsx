import { useEffect, useState } from "react";
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

import { updateCardData } from "../../../../../../api/apiFns/index.js";

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

import { useCardMutations } from "./useCardMutations.js";
import { useAllCardsStore } from "../../../../../stores/allCards.js";
import { useGameVarsStore } from "../../../../../stores/gameVars.js";
import { templateIdToTemplateDataREG } from "../../../../../constants/templates/regsTemplates.js";
import { templateIdToTemplateDataBuilding } from "../../../../../constants/templates/buildingsTemplates.js";
import { templateIdToTemplateDataSP } from "../../../../../constants/templates/spsTemplates.js";
// import { useTownMapStore } from "../../../../../stores/townMapEntitiesStore.js";
// import { isSPCard } from "../../../../../types/TypeGuardFns/SPGuards.js";
import CraftingCardGrid from "./Parts/CraftingCardGrid/CraftingCardGrid.js";
import InventoryCardGrid from "./Parts/InventoryCardGrid/InventoryCardGrid.js";

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
  console.log(" &&&& CardGrid: cards: ", cards);

  //   specialEffectsRef, // TODO: 🛑 NOT yet  implemented in GameVards
  //   maxLimitsRef, // TODO: use "townhallLevel" from GameVards + 🛑 a constants file
  //   awardPoints, // TODO: 🅱 🛑 Not yet implemented in Blockchain Hooks
  //   createNFTCard, // TODO: 🅱 🛑 Not yet implemented in Blockchain Hooks
  // } = usePlayerContext();

  const {
    // cards,
    activeCards,
    inventory: inventoryCards,
    // addCard,
    // removeCard,
    // addCardToActiveCards,
    // removeCardFromActiveCards,
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

  const {
    createCard_DB,
    isSuccessNewCard,
    newCardData,
    createCardStats_DB,
    putCardForSale,
  } = useCardMutations();

  const toastConfetti = useToastConfetti();
  const toastError = useToastError();

  const [newCard_2, setNewCard_2] = useState<CardClass | null>(null); // Can't think another name for "newCard" 🤣
  const [showPriceInput, setShowPriceInput] = useState(false);
  const [priceInput /* setPriceInput */] = useState("");

  useEffect(() => {
    console.log(
      "CardGrid: UseEffect() Number of Activated Cards: ",
      activeCards.length,
      activeCards,
      cards
    );
  }, [activeCards]);

  useEffect(() => {
    if (isSuccessNewCard && newCardData?.cardId && newCard_2) {
      const newCard = newCard_2; // Just to make the code more readable
      newCard.id = newCardData.cardId; // This "newCardData" comes from the the createCard_DB Mutation

      // TODO: Add the new Card to the Blockchain 🅱
      // TODO: Add the new Card to the Inventory
      addCardToInventory(newCard);
      // setInventoryCards((prev) => [...prev, newCard]); // TODO_DONE ✅: Use Zustang Store, All Cards: addCardToInventory(newCard)
      // 🛑 Maybe call "checkAndSubtractRes" here where the card has an ID.

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

      console.log("CardGrid::UseEffect() Complete New Card: ", newCard);

      toastConfetti.show(
        "Crafted New Card",
        "Congratulations on Crafting a New Card!"
      );

      setNewCard_2(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessNewCard, newCard_2, newCardData]);

  /**
   * @firstCheck Completed ✅
   * @param type Can be: "reg" | "building" | "sp"
   * @param cardTemplateId  Can be: RegTemplateId | BuildingTemplateId | SPTemplateId
   * @returns A new Card of the CardClass Type
   */
  function createCard(
    type: "reg" | "building" | "sp",
    cardTemplateId: RegTemplateId | BuildingTemplateId | SPTemplateId
    // cardName: RegName | BuildingName | SPName
  ) {
    if (player === null)
      throw new Error("⛔ CardGrid: createCard: Player is null!");

    let newCard: CardClass;

    switch (type) {
      case "reg":
        // 🔷 Checks if the Card Template ID is valid
        if (!(cardTemplateId in templateIdToTemplateDataREG))
          throw new Error(
            "⛔ CardGrid: createCard: (REG) Invalid Template ID!"
          );
        newCard = classREG.createNew({
          ownerId: player.id,
          templateId: cardTemplateId as RegTemplateId,
          playerName: player.name,
        });
        break;

      case "building":
        if (!(cardTemplateId in templateIdToTemplateDataBuilding))
          throw new Error(
            "⛔ CardGrid: createCard: (Building) Invalid Template ID!"
          );
        newCard = classBuilding.createNew({
          ownerId: player.id,
          templateId: cardTemplateId as BuildingTemplateId,
          playerName: player.name,
        });
        break;

      case "sp":
        if (!(cardTemplateId in templateIdToTemplateDataSP))
          throw new Error("⛔ CardGrid: createCard: (SP) Invalid Template ID!");
        newCard = classSP.createNew({
          ownerId: player.id,
          templateId: cardTemplateId as SPTemplateId,
          playerName: player.name,
        });
        break;

      default:
        throw new Error("⛔ CardGrid: createCard: Invalid Card Type!");
    }

    // 🅱 Blockchain: Game Smart Contract
    // awardPoints("cardCreation"); // TODO: Implement This in Blockchain Hooks
    // createNFTCard(newCard.id, newCard.templateId); // TODO: Implement This in Blockchain Hooks

    console.log("CardGrid, Create Card Data: ", newCard);

    return newCard;
  }

  /**
   * @firstCheck Completed ✅
   * @param _card Selected Card
   * @param type Action type: "level" or "craft"
   * @description Checks if the player has the resources to level up or craft a card. If yes, it subtracts the resources from the player. If not, it shows an alert with the missing resources.
   */
  function checkAndSubtractRes(_card: CardClass, type: "level" | "craft") {
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
      console.log("player :>> ", player);
      console.log("energy :>> ", energy);
      throw new Error(
        "⛔ CardGrid: checkAndSubtractRes: Player is null! | Player: "
      );
    }

    const playerResources: CardRequirements = {
      gold: player.gold,
      concrete: player.concrete,
      metals: player.metals,
      crystals: player.crystals,
      population: player.population,
      diesel: player.diesel,
    };
    const alertFlags = [];

    for (const key in _card.requirements) {
      if (Object.hasOwnProperty.call(_card.requirements, key)) {
        // Checks if the requirements are met
        if (
          playerResources[key as keyof CardRequirements] <
          _card.requirements[key as keyof CardRequirements]
        ) {
          // If they are NOT...
          alertFlags.push(key);
        }
      }
    }

    // 🔷 Players has enough resources
    if (alertFlags.length === 0) {
      if (type === "level" && !(_card instanceof SPCard) && _card.level === 5) {
        toastError.showError(
          "MAX Level",
          "😅 Your Card is at the Maximum Level! It can not be leveled Up any further"
        );
        return;
      }

      // 🔷 Subtracks the Resources. Also Prints the Old and New Resources
      for (const key in _card.requirements) {
        if (Object.hasOwnProperty.call(_card.requirements, key)) {
          console.log(
            "Old [",
            key,
            "] => ",
            playerResources[key as keyof CardRequirements]
          );

          // 🔷 Subtracts the Resources
          playerResources[key as keyof CardRequirements] -=
            _card.requirements[key as keyof CardRequirements];

          console.log(
            "New [",
            key,
            "] => ",
            playerResources[key as keyof CardRequirements]
          );
          console.log("------------------------------------");
        }
      }

      // 🔷 Updates the State of GameVars Store
      updatePlayerData(playerResources);

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

      if (type === "craft") {
        // 💥 This "newCard" does not have an ID yet!!!
        const newCard = createCard(_card.type, _card.templateId);

        // 🔷 Creates the Card in MySQL Database in case it IS a Special Effect Card
        if (_card.type === "sp" && _card instanceof SPCard) {
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
          // 🔷 Creates the Card in MySQL Database in case it's NOT a Special Effect Card
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

        setNewCard_2(newCard); // This is done so in useEffect we have access to this Card.
      }
    } else {
      toastError.showError(
        "Low on Resources",
        "😬 You are short on the following Resources: ",
        alertFlags.join(", ")
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
  /* <== ✨
  const handleActivateClick = (_card: SPCard) => {
    console.log("Attempting Card Activation: ", _card);
    if (_card.type === "sp" && isSPCard(_card)) {
      if (_card.disabled === true) {
        toastError.showError(
          "MAX Special Effects Capacity",
          "😅 Special Effect Cards can be used only Once per Player. You have already used this one!"
        );
      } else {
        const effect = createEffect(
          _card.templateId,
          Number(_card.output.boost)
        );
        if (effect === false) {
          // alert('Only one effect can be active at a time. 😅');
          toastError.showError(
            "MAX Special Effects Capacity",
            "😅 Special Effect Cards can be used only Once per Player. You have already used this one!"
          );
          return;
        } else {
          const { id } = _card;
          if (id === null)
            throw new Error(
              "⛔ Cardgrid: handleActivateClick (#1): Card ID is null!"
            );

          const mysqlDate = convertToMySQLDateTime(Date.now());
          console.log("HandleActivateClick::MySQLDate: ", mysqlDate);
          updateCardData({ id, state: 1, endDate: mysqlDate });
          specialEffectsRef.current = effect; // TODO: Add a Zustand Store Property "CurrentSPEffect" in GameVars
        }
      }
    }

    // 0. Change Card's State to true
    _card.activate();

    // 4. Update MySQL Database
    const { state, id } = _card;
    if (id === null)
      throw new Error(
        "⛔ Cardgrid: handleActivateClick (#2): Card ID is null!"
      );
    updateCardData({ id, state });

    // 1. Add Selected Card => Activated Cards
    // setActiveCards((prev) => [...prev, _card]); // TODO: Use Zustang Store, All Cards:
    addCardToActiveCards(_card);

    // 2. Remove Selected Card from the Inventory
    // setInventoryCards([...removeObjectWithId(inventoryCards, _card.id)]); // TODO_DONE ✅: Use Zustang Store, All Cards: removeCardFromInventory(_card)
    removeCardFromInventory(_card);

    // 5. Unselect the Card. This also goes 1 step back in the Modal (Where all the cards are dispayed).
    setSelectedCard(null);

    // 6. Close the Modal
    setIsOpen(false);

    // (For REGs) Check if there is enough Gold to activate
    // if (_card.type.toLowerCase() === "reg") {
    //   const regCards = activeCards.filter(
    //     (card: CardClass) => card.type.toLowerCase() === "reg"
    //   );
    //   const playerGold = materialResourcesRef.current.gold; //TODO: Use Global Variable from GameVars
    //   // TODO: Add a Zustand Store Property "maintenanceExpenses" in GameVars
    //   const totalMaintenanceGold = regCards.reduce((acc, card) => {
    //     return acc + card.maintenance.gold;
    //   }, 0);
    //   console.log("1 SUKA SUKA! ", playerGold);
    //   console.log("2 SUKA SUKA! ", totalMaintenanceGold);
    //   if (totalMaintenanceGold + _card.maintenance.gold > playerGold) {
    //     // alert(
    //     //   `😱 Your current Gold is not enough to pay for the maintenance of your Generators! Therefore, you can not activate any more generators.`
    //     // );
    //     toastError.showError(
    //       "Low on Gold",
    //       "😱 Your current Gold is not enough to pay for the maintenance of your Generators! Therefore, you can not activate any more generators."
    //     );
    //     return;
    //   }
    // }

    // -1. (For Buildings) Check if there is enough Energy to activate
    // TODO: Add a Zustand Store Properties "energyDelta" in GameVars
    // if (
    //   _card.maintenance?.energy !== undefined &&
    //   energyRef.current.delta - _card.maintenance.energy < 0
    // ) {
    //   // alert(`You need more ⚡ Energy to activate the (${_card.name}) Card!`);
    //   toastError.showError(
    //     "Insufficient Energy",
    //     `You need more ⚡ Energy to activate the (${_card.name}) Card!`
    //   );
    //   return;
    // }
  };
   ✨ ==> */

  /**
   * @firstCheck Completed ✅
   * @param _card
   * @returns
   */
  const handleSellClick = (_card: CardClass) => {
    // handle sell functionality here
    // setForceRerender((prev) => !prev);
    if (showPriceInput) {
      if (parseInt(priceInput) === 0 || priceInput === "") {
        setShowPriceInput(false);
        return;
      }

      if (_card === null || _card.id === null)
        throw new Error(
          "⛔ CardGrid: handleSellClick: Card is null or Card ID is null!"
        );
      putCardForSale({
        cardId: _card.id,
        in_mp: true,
        priceTag: Number(priceInput),
        state: false,
      });

      removeCardFromInventory(_card); // 🔷 Remove Card from Inventory
      closeModal(); // 🔷 Close the Modal
      setSelectedCard(null); // 🔷 Go 1 step back in the Modal (Where all the cards are displayed)
      setShowPriceInput(false); // 🔷 Hide the Price Input

      console.log("Sell Button was clicked!");
      console.log("Active Card: ", activeCards);
      console.log("Inventory: ", inventoryCards);
      return;
    } else {
      setShowPriceInput(true);
    }
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
        />
      )}
    </div>
  );
}
