import { updateCardData } from "../../../../api/apiFns";
import RegCard from "../../../classes/regClass_V2";
import { cardsStateManager, hoursToSecRates } from "./utils";
import { useAllCardsStore } from "../../../stores/allCards";
import { useGameVarsStore } from "../../../stores/gameVars";
import { isRegCard } from "../../../types/TypeGuardFns/RegGuards";
import { isNotNullOrUndefined } from "../../../types/TypeGuardFns/isNullorUndefined";
import { roundToDecimal } from "../../../utils";
import { useToastError } from "../../notifications";
import { gameConfig } from "../../../constants/game";
import { isBuildingCard } from "../../../types/TypeGuardFns/BuildingGuards";
import BuildingCard from "../../../classes/buildingClass_V2";

const useValuesChecker = () => {
  const allCardsState = useAllCardsStore();
  const gameVars = useGameVarsStore();
  const toastError = useToastError();

  // This check the if there is enough gold to pay for the maintenance of the REG cards
  function maintenanceSubtracker() {
    const regCards = allCardsState.activeCards.filter((card) =>
      isRegCard(card)
    ) as RegCard[];

    // If there are not any REG Cards don't waste processing power
    if (regCards.length === 0) {
      gameVars.setExpences(0);
      return true;
    }

    const playerGold = isNotNullOrUndefined<number>(
      gameVars.player?.gold,
      "gold"
    );

    const temp = regCards.reduce((acc, card) => {
      return acc + card.maintenance.gold;
    }, 0);

    const newExpenses = roundToDecimal(temp, 4);

    if (newExpenses > playerGold) {
      cardsStateManager(regCards, "deactivate", updateCardData);

      regCards.forEach((card) => {
        allCardsState.removeCardFromActiveCards(card);
        allCardsState.addCardToInventory(card);
      });

      gameVars.setExpences(0);

      toastError.showError(
        "Low on Gold",
        "😱 Your current Gold is not enough to pay for the maintenance of your Generators! Therefore, your Generators will be deactivated."
      );
      return false;
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
      //@Important: This Line subtracts gold from the resources
      gameVars.updatePlayerData({
        gold: playerGold - newExpense_GameLoopTickAmount,
      });

      console.log("======== ======== ========");
      return true;
    }
  }

  function energyChecker() {
    const buildingCards = allCardsState.activeCards.filter((card) =>
      isBuildingCard(card)
    ) as BuildingCard[];

    // If there are not any REG Cards don't waste processing power
    if (buildingCards.length === 0) {
      gameVars.setEnergyConsumed(0);
      return true;
    }

    const energyProduced = gameVars.energyProduced;

    const temp = buildingCards.reduce((acc, card) => {
      return acc + card.maintenance.energy;
    }, 0);

    const newEnergyConsumed = roundToDecimal(temp, 4);

    if (newEnergyConsumed > energyProduced) {
      cardsStateManager(buildingCards, "deactivate", updateCardData);

      buildingCards.forEach((card) => {
        allCardsState.removeCardFromActiveCards(card);
        allCardsState.addCardToInventory(card);
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
  return { maintenanceSubtracker, energyChecker };
};

export default useValuesChecker;
