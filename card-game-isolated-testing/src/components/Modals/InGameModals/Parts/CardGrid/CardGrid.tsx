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
import { effectDuration } from "../../../../../constants/game/gameConfig";
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
import {
  hasEnoughResources,
  subtractResources,
} from "../../../../../utils/game/resourcesHandlers.js";
import EffectClass from "../../../../../classes/effectClass.js";
import { convertToMySQLDateTime } from "./utils.js";
import { isBuildingCard } from "../../../../../types/TypeGuardFns/BuildingGuards.js";
import { isToolStore } from "../../../../../types/TypeGuardFns/isToolStore.js";
import { useModalStore } from "../../../../../stores/modalStore.js";
import QuizModal from "../../../QuizModal/QuizModal.js";
import ConfirmationModal from "../../../ConfirmationModal/ConfirmationModal.js";
import { useBlockchainStore } from "../../../../../stores/blockchainStore.js";

interface CardGridProps {
  setSelectedCardModal: React.Dispatch<React.SetStateAction<CardClass | null>>;
  selectedCardModal: CardClass | null;
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
  //   specialEffectsRef, // TODO: 🛑 NOT yet  implemented in GameVards
  //   maxLimitsRef, // TODO: use "townhallLevel" from GameVards + 🛑 a constants file
  //   awardPoints, // TODO: 🅱 🛑 Not yet implemented in Blockchain Hooks
  //   createNFTCard, // TODO: 🅱 🛑 Not yet implemented in Blockchain Hooks
  // } = usePlayerContext();

  const pushModal = useModalStore((state) => state.pushModal);
  const popModal = useModalStore((state) => state.popModal);

  const rewardingToolContract = useBlockchainStore(
    (state) => state.rewardingToolContract
  );
  const gameContract = useBlockchainStore((state) => state.gameContract);

  const {
    activeCards,
    inventory: inventoryCards,
    addCardToInventory,
    removeCardFromInventory,
    addCardToActiveCards,
  } = useAllCardsStore((state) => state);

  const {
    energyProduced,
    player,
    updatePlayerData,
    activeEffect,
    setActiveEffect,
  } = useGameVarsStore((state) => state);

  const toastConfetti = useToastConfetti();
  const toastError = useToastError();

  let newCard_2: CardClass | null = null;

  const { mutate: createCard_DB } = useMutation({
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

      if (gameContract === null) {
        toastError.showError(
          "Error in CardGrid, checkAndSubtractRes",
          "Game Contract is null!"
        );
        throw new Error(
          "⛔ CardGrid: checkAndSubtractRes: Game Contract is null!"
        );
      }

      // 🅱✨ 9. Create the Card in the Blockchain
      // await gameContract.createCard(newCard.id, newCard.templateId);

      addCardToInventory(newCard);

      if (isBuildingCard(newCard) && isToolStore(newCard)) {
        const { id, stats } = newCard;
        createCardStats_DB({
          cardId: id,
          diesel: stats.diesel,
          concrete: stats.concrete,
          metals: stats.metals,
          crystals: stats.crystals,
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
    onError: (error) =>
      console.error("Error while creating the new card STATS!", error),
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
      energyProduced === null
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

      // 8. Play the Quiz Game
      pushModal(<QuizModal resourceCosts={newCard.requirements} />);

      // 🅱 Blockchain: Game Smart Contract
      // awardPoints("cardCreation"); // TODO: Implement This in Blockchain Hooks
      // createNFTCard(newCard.id, newCard.templateId); // TODO: Implement This in Blockchain Hooks

      if (rewardingToolContract === null) {
        toastError.showError(
          "Error in CardGrid, checkAndSubtractRes",
          "Rewarding Tool Contract is null!"
        );
        throw new Error(
          "⛔ CardGrid: checkAndSubtractRes: Rewarding Tool Contract is null!"
        );
      }

      // 🅱 10. Call the Rewarding Tool Contract to Award Points
      try {
        await rewardingToolContract.addPoints("game", "cardCreation");
      } catch (error) {
        console.error(
          "🅱🅱🅱 Error while calling the Rewarding Tool Contract: ",
          error
        );
      }
    }
  }

  // Here we register the effects of SE Cards
  // TODO: 🛑 Fix When Creating Game Loop

  function createEffect(SPcard: SPCard) {
    if (activeEffect !== null) {
      toastError.showError(
        "MAX Special Effects Capacity",
        "😅 Special Effect Cards can be used only Once per Player. You have already used this one!"
      );
      return false;
    }
    return new EffectClass(SPcard, Date.now() + effectDuration);
  }

  // TODO: 🛑 The Activation of Cards will be done by using the Map's Placeholders and the CardPicker Modal!
  // This will work only for SP Cards
  // TODO: 🛑 Check Again once you Implement the Special Effects

  const handleActivateSPCard = (card: SPCard) => {
    console.log("Attempting Card Activation: ", card);

    if (card.disabled === true) {
      toastError.showError(
        "Special Effect Card is Disabled",
        "😅 Special Effect Cards can be used only Once per Player. You have already used this one!"
      );
      return;
    }

    const newEffect = createEffect(card); // 🔷 1. Creating the New Effect Instance
    // If there is already an active effect...
    if (newEffect === false) {
      toastError.showError(
        "MAX Special Effects Capacity",
        "😅 Special Effect Cards can be used only Once per Player. You have already used this one!"
      );
      return;
    }

    const { id } = card;
    if (id === null)
      throw new Error(
        "⛔ Cardgrid: handleActivateClick (#1): Card ID is null!"
      );

    console.log(
      "HandleActivateClick::The JS TIMESTAMP: ",
      newEffect.expiresAtUnix
    );
    const mysqlDate = convertToMySQLDateTime(newEffect.expiresAtUnix);
    console.log("HandleActivateClick::MySQLDate: ", mysqlDate);
    // 🔷 2. Update the Card's Data in the DB
    updateCardData({ id, state: 1, endDate: mysqlDate });

    // 🔷 3.1 Client State - Register Effect - Zustang
    setActiveEffect(newEffect);

    // 🔷 3.2 Client State - Add Card to Active Cards - Zustang
    // For the multiplier to work, the card needs to be in the activeCards array
    addCardToActiveCards(card);

    // 0. Change SPCard's State to true
    card.activate(newEffect.expiresAtUnix); // 🔷 4. Activate the Card

    // 2. Remove Selected Card from the Inventory
    // setInventoryCards([...removeObjectWithId(inventoryCards, _card.id)]); // TODO_DONE ✅: Use Zustang Store, All Cards: removeCardFromInventory(_card)
    removeCardFromInventory(card);

    // 5. Unselect the Card. This also goes 1 step back in the Modal (Where all the cards are dispayed).
    setSelectedCard(null);

    // 6. Close the Modal
    closeModal();
    console.log("✨ The New Effect: ", newEffect);
  };

  /**
   * @firstCheck Completed ✅
   * @param _card
   * @returns
   */
  const handleSellClick = (_card: CardClass) => {
    console.log("Selling this Card: ", _card);

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
    pushModal(
      <ConfirmationModal
        onConfirm={() => {
          popModal();
          checkAndSubtractRes(_card, "level");
          closeModal();
          pushModal(<QuizModal resourceCosts={_card.requirements} />);
        }}
        title="LEVEL UP CONFIRMATION"
      />
    );
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

    checkAndSubtractRes(card, "craft"); // <- The Quiz Modal is called from here

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
          handleActivateSPCard={handleActivateSPCard}
        />
      )}
    </div>
  );
}
