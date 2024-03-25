import { updateCardData } from "../../../../api/apiFns";
import RegCard from "../../../classes/regClass_V2";
import { cardsStateManager, datesDelta, hoursToSecRates } from "./utils";
import { useAllCardsStore } from "../../../stores/allCards";
import { useGameVarsStore } from "../../../stores/gameVars";
import { isRegCard } from "../../../types/TypeGuardFns/RegGuards";
import { isNotNullOrUndefined } from "../../../types/TypeGuardFns/isNullorUndefined";
import { roundToDecimal } from "../../../utils";
import { useToastError } from "../../notifications";
import { gameConfig } from "../../../constants/game";
import { isBuildingCard } from "../../../types/TypeGuardFns/BuildingGuards";
import BuildingCard from "../../../classes/buildingClass_V2";
import { useTownMapStore } from "../../../stores/townMapEntitiesStore";

const useValuesChecker = () => {
  const allCardsState = useAllCardsStore();
  const gameVars = useGameVarsStore();
  const toastError = useToastError();

  const removeAllBuildings = useTownMapStore(
    (state) => state.removeAllBuildings
  );
  const removeAllREGs = useTownMapStore((state) => state.removeAllREGs);

  // This check the if there is enough gold to pay for the maintenance of the REG cards
  function maintenanceSubtracker() {
    const regCards = useAllCardsStore
      .getState()
      .activeCards.filter((card) => isRegCard(card)) as RegCard[];

    // If there are not any REG Cards don't waste processing power
    if (regCards.length === 0) {
      console.log(
        "%c Maintenance Subtracker - No REGs",
        "color: limegreen; font-size: 16px;"
      );
      gameVars.setExpences(0);
      return { expense: 0, success: true };
    }

    const playerGold = isNotNullOrUndefined<number>(
      useGameVarsStore.getState().player?.gold,
      "gold"
    );

    const temp = regCards.reduce((acc, card) => {
      return acc + card.maintenance.gold;
    }, 0);

    const newExpenses = roundToDecimal(temp, 4);

    if (newExpenses > playerGold) {
      console.log(
        "%c Maintenance Subtracker - Low on GOLD",
        "color: red; font-size: 20px;"
      );
      removeAllREGs();
      regCards.forEach((card) => {
        console.log("useValuesChecker::REG::Card to be Removed: ", card);
        allCardsState.removeCardFromActiveCards(card);
        allCardsState.addCardToInventory(card);
        cardsStateManager(regCards, "deactivate", updateCardData);
      });

      gameVars.setExpences(0);

      toastError.showError(
        "Low on Gold",
        "😱 Your current Gold is not enough to pay for the maintenance of your Generators! Therefore, your Generators will be deactivated."
      );
      return { expense: 0, success: false };
    } else {
      console.log("======== REG Expenses ========");
      console.log("🏭💸 Total Costs (/hour): ", newExpenses);
      console.log(
        "🏭💸 Total Costs (/5sec): ",
        hoursToSecRates(newExpenses, gameConfig.gamePace)
      );

      const newExpense_GameLoopTickAmount = hoursToSecRates(
        newExpenses,
        gameConfig.gamePace,
        gameVars.needsCatchUp
      );
      console.log("Prev - Player gold: ", playerGold);

      //@Important: This Line subtracts gold from the resources
      // gameVars.updatePlayerData({
      //   gold: playerGold - newExpense_GameLoopTickAmount,
      // });

      console.log(
        "New - Player gold: ",
        playerGold - newExpense_GameLoopTickAmount
      );
      gameVars.setExpences(newExpenses);

      console.log("======== ======== ========");
      return { expense: newExpense_GameLoopTickAmount, success: true };
    }
  }

  function energyChecker() {
    console.log("⚡ Running Energy Checker...");
    const buildingCards = useAllCardsStore
      .getState()
      .activeCards.filter((card) => isBuildingCard(card)) as BuildingCard[];

    console.log("UseValuesChecker::Building::Cards: ", buildingCards);

    // If there are not any REG Cards don't waste processing power
    console.log("The Current Buildings: ", buildingCards);
    if (buildingCards.length === 0) {
      gameVars.setEnergyConsumed(0);
      return true;
    }

    const energyProduced = useGameVarsStore.getState().energyProduced;
    console.log("⚡ energyProduced: ", energyProduced);

    const temp = buildingCards.reduce((acc, card) => {
      return acc + card.maintenance.energy;
    }, 0);

    const newEnergyConsumed = roundToDecimal(temp, 4);
    const energyRemaining = energyProduced - newEnergyConsumed;
    console.log("⚡ newEnergyConsumed: ", newEnergyConsumed);
    console.log("⚡ Energy Remaining: ", energyProduced - newEnergyConsumed);

    if (energyRemaining < 0) {
      console.log(
        "%c Energy Checker - Low on Energy",
        "color: red; font-size: 20px;"
      );
      removeAllBuildings();
      buildingCards.forEach((card) => {
        console.log("useValuesChecker::Building::Card to be Removed: ", card);
        allCardsState.removeCardFromActiveCards(card);
        allCardsState.addCardToInventory(card);
        cardsStateManager(buildingCards, "deactivate", updateCardData);
      });

      gameVars.setEnergyConsumed(0);

      toastError.showError(
        "Low on Energy",
        "😱 Your current Energy is not enough to pay for the maintenance of your Buildings! Therefore, your Buildings will be deactivated."
      );

      return false;
    } else {
      console.log("======== Building Energy ========");
      console.log("🏭💸 Total Energy Consumed (/hour): ", newEnergyConsumed);
      console.log(
        "🏭💸 Total Energy Consumed (/5sec): ",
        hoursToSecRates(newEnergyConsumed, gameConfig.gamePace)
      );

      gameVars.setEnergyRemaining(energyProduced - newEnergyConsumed);

      console.log("======== ======== ========");
      return true;
    }
  }

  function hasEffectExpired() {
    const activeEffect = gameVars.activeEffect;
    if (activeEffect === null) {
      return;
    }

    const hasExpired = datesDelta(activeEffect.expiresAtUnix);
    if (hasExpired) {
      gameVars.setActiveEffect(null);
      toastError.showError(
        "Effect Expired",
        "😱 The Special Effect has expired!"
      );

      const spOriginCard = activeEffect.originatesFrom;
      spOriginCard.disable(); // it Also deactivates the card (state === false)

      const spCardID = isNotNullOrUndefined<number>(spOriginCard?.id, "id");

      allCardsState.removeCardFromActiveCards(spOriginCard);
      allCardsState.addCardToInventory(spOriginCard);
      updateCardData({
        id: spCardID,
        disabled: spOriginCard.disabled,
        state: spOriginCard.state,
      });
    }
  }
  return { maintenanceSubtracker, energyChecker, hasEffectExpired };
};

export default useValuesChecker;
