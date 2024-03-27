import {
  calcRank,
  convertTimestamp,
  convertToMySQLDatetime,
  mysqlDatetimeToUnixTimestamp,
} from "./utils";
import { useGameVarsStore } from "../../../stores/gameVars";
import { isNotNullOrUndefined } from "../../../types/TypeGuardFns/isNullorUndefined";
import { defaultBuildingsConfig, gameConfig } from "../../../constants/game";
import {
  IGameLoopWorkerInput,
  NewGameState,
} from "../../../types/GameLoopTypes/GameLoopTypes";
import { useToastError } from "../../notifications";
import { updatePlayerData } from "../../../../api/apiFns";

const useGameLoop = () => {
  const gameVars = useGameVarsStore();
  const toastError = useToastError();

  const setNewGameState = ({
    newPopulation,
    newPopGrowthRate,
    newGold,
    newConcrete,
    newMetals,
    newCrystals,
    newDiesel,
  }: NewGameState) => {
    const newRank = calcRank(newPopulation, gameVars.energyProduced);
    const newTimestamp = convertToMySQLDatetime(Date.now());
    console.log("NEW TIMESTAMP: ", newTimestamp);

    // 🔷 Updating Client State (Zustand)
    gameVars.setRank(newRank);
    gameVars.setPopGrowthRate(newPopGrowthRate);
    gameVars.updatePlayerData({
      population: newPopulation,
      gold: newGold,
      concrete: newConcrete,
      metals: newMetals,
      crystals: newCrystals,
      diesel: newDiesel,
      rank: newRank,
      timestamp: newTimestamp,
    });

    const playerId = isNotNullOrUndefined<number>(gameVars.player?.id, "id");

    // 🔷 Updating DB Data
    updatePlayerData(playerId, {
      population: newPopulation,
      gold: newGold,
      concrete: newConcrete,
      metals: newMetals,
      crystals: newCrystals,
      diesel: newDiesel,
      timestamp: newTimestamp,
      rank: newRank,
    });

    // TODO: 🅱 Here you give MGS tokens based on the Player's Rank.
  };

  const getGameState = (loopsToRun: number): IGameLoopWorkerInput => {
    const currentPopulation = isNotNullOrUndefined<number>(
      useGameVarsStore.getState().player?.population,
      "population"
    );

    const happinessProvidedByBuildings = isNotNullOrUndefined<number>(
      useGameVarsStore.getState().happinessFromBuildings,
      "happinessFromBuildings"
    );

    const currentPopGrowthRate = isNotNullOrUndefined<number>(
      useGameVarsStore.getState().popGrowthRate,
      "popGrowthRate"
    );

    console.log("Get Game State: PopG: ", currentPopGrowthRate);
    console.log(
      "Get Game State: Multipliers: ",
      useGameVarsStore.getState().multipliers
    );

    const currentGold = isNotNullOrUndefined<number>(
      useGameVarsStore.getState().player?.gold,
      "gold"
    );
    const currentConcrete = isNotNullOrUndefined<number>(
      useGameVarsStore.getState().player?.concrete,
      "concrete"
    );
    const currentMetals = isNotNullOrUndefined<number>(
      useGameVarsStore.getState().player?.metals,
      "metals"
    );
    const currentCrystals = isNotNullOrUndefined<number>(
      useGameVarsStore.getState().player?.crystals,
      "crystals"
    );
    const currentDiesel = isNotNullOrUndefined<number>(
      useGameVarsStore.getState().player?.diesel,
      "diesel"
    );

    const lastLoginDate = isNotNullOrUndefined<string>(
      useGameVarsStore.getState().player?.timestamp,
      "lastLoginDate"
    );

    const townhallLevel = isNotNullOrUndefined<number>(
      useGameVarsStore.getState().townhallLevel,
      "townhallLevel"
    );

    const factoryUnhappiness = isNotNullOrUndefined<number>(
      useGameVarsStore.getState().factoryUnhappiness,
      "factoryUnhappiness"
    );

    const expensesPerHour = isNotNullOrUndefined<number>(
      useGameVarsStore.getState().expences,
      "expensesPerHour"
    );

    const barrelsUsedPerHour = isNotNullOrUndefined<number>(
      useGameVarsStore.getState().factoryBarrels,
      "barrelsUsedPerHour"
    );

    const maxAllowedPopulation =
      defaultBuildingsConfig.townhallHousingLimitPerLevel[
        townhallLevel as keyof typeof defaultBuildingsConfig.townhallHousingLimitPerLevel
      ];
    return {
      activeEffect: useGameVarsStore.getState().activeEffect,
      allWorkers: useGameVarsStore.getState().allWorkers,
      multipliers: useGameVarsStore.getState().multipliers,
      needsCatchUp: useGameVarsStore.getState().needsCatchUp,
      currentGold,
      currentConcrete,
      currentMetals,
      currentCrystals,
      currentDiesel,
      currentPopulation,
      currentPopGrowthRate,
      happinessProvidedByBuildings,
      loopsToRun,
      lastLoginDate,
      maxAllowedPopulation,
      factoryUnhappiness,
      expensesPerHour,
      barrelsUsedPerHour,
    };
  };

  function needsCatchUp() {
    const currentDate = Date.now() / 1000; //secondss
    const lastLoginDate = isNotNullOrUndefined<string>(
      gameVars.player?.timestamp,
      "lastLoginDate"
    );
    // If New Player, no need to catch up
    // if (lastLoginDate === null || lastLoginDate === 0) return false;

    const convertedPrevDate = mysqlDatetimeToUnixTimestamp(lastLoginDate); // secondss
    const diff = Math.abs(currentDate - convertedPrevDate);
    console.log(
      "Player Last Known Login Timestamp: ",
      convertTimestamp(convertedPrevDate)
    );
    console.log("Current Date (Now): ", convertTimestamp(currentDate));
    console.log("#1 - Their Difference: ", convertTimestamp(diff));
    console.log("#2 - Their Difference: ", diff);

    if (diff > 1800 * 8) {
      // 4 hours
      console.log("Catch Up is required!");
      return true;
    }
    console.log("There is no need to catch up the progress of your account");
    return false;
  }

  const calcTimeUnits = () => {
    const currentDate = Date.now();
    const lastLoginDate = isNotNullOrUndefined<string>(
      gameVars.player?.timestamp,
      "lastLoginDate"
    );

    const convertedPrevDate =
      mysqlDatetimeToUnixTimestamp(lastLoginDate) * 1000;
    console.log("1 - Calculating CatchUp Loops | currentDate: ", currentDate);
    console.log(
      "2 - Calculating CatchUp Loops | convertedPrevDate: ",
      convertedPrevDate
    );

    const diff = Math.abs(currentDate - convertedPrevDate);
    const sevenDays = 7 * gameConfig.day;

    console.log("3 - Calculating CatchUp Loops | DIFF: ", diff);

    if (diff > sevenDays) {
      toastError.showError(
        "Absent for too long",
        "😔 We are very sorry to inform you that because you were absent more than 7 Days, your account was disabled and your progress was lost!"
      );
      console.log(
        "4 - Calculating CatchUp Loops | 7 Days | Final: ",
        Math.trunc(diff / gameConfig.catchUpLoopDuration)
      );
      return Math.trunc(sevenDays / gameConfig.catchUpLoopDuration);
    }
    console.log(
      "4 - Calculating CatchUp Loops | Final: ",
      Math.trunc(diff / gameConfig.catchUpLoopDuration)
    );

    return Math.trunc(diff / gameConfig.catchUpLoopDuration);
  };

  return {
    // processGameLoop,
    setNewGameState,
    getGameState,
    needsCatchUp,
    calcTimeUnits,
  };
};

export default useGameLoop;

// const processGameLoop = () => {
//   // 🔷 Making sure the values are not Null or undefined
//   const population = isNotNullOrUndefined<number>(
//     gameVars.player?.population,
//     "population"
//   );

//   const popGrowthRate = isNotNullOrUndefined<number>(
//     gameVars.popGrowthRate,
//     "popGrowthRate"
//   );

//   const currentGold = isNotNullOrUndefined<number>(
//     gameVars.player?.gold,
//     "gold"
//   );
//   const currentConcrete = isNotNullOrUndefined<number>(
//     gameVars.player?.concrete,
//     "concrete"
//   );
//   const currentMetals = isNotNullOrUndefined<number>(
//     gameVars.player?.metals,
//     "metals"
//   );
//   const currentCrystals = isNotNullOrUndefined<number>(
//     gameVars.player?.crystals,
//     "crystals"
//   );
//   const currentDiesel = isNotNullOrUndefined<number>(
//     gameVars.player?.diesel,
//     "diesel"
//   );

//   //////////////////////////////////////////////////////////////////////////////////////
//   ////////////////////////  CALCULATIONS START HERE  ///////////////////////////////////
//   //////////////////////////////////////////////////////////////////////////////////////

//   // 🔷 1. Population (🧪 Requires Testing)
//   const newPopulation = roundToDecimal(
//     calcUpdatedGathValue(
//       population,
//       hoursToSecRates(
//         popGrowthRate,
//         gameConfig.gamePace,
//         gameVars.needsCatchUp
//       )
//     ),
//     4
//   );

//   // 🔷 2. Population Growth Rate (🧪 Requires Testing)
//   const newPopGrowthRate = gathRatesCalculators.calcPopGrowthRate(
//     newPopulation,
//     gameVars.popGrowthRate
//   );

//   // 🔷 3. Private Sector (🧪 Requires Testing)
//   const newPrivateSector = generalCalculators.privateSectorCalc(
//     gameVars.allWorkers,
//     newPopulation
//   );

//   // ✨ GATHERING RATES ✨
//   // 🔷 4. Gold Gather Rate (🧪 Requires Testing)
//   const newGoldGathRate = gathRatesCalculators.goldGathRateCalc(
//     newPrivateSector || newPopulation,
//     gameVars.multipliers.goldMultiplier,
//     gameVars.activeEffect
//   );

//   // 🔷 5. Concrete Gather Rate (🧪 Requires Testing)
//   const newConcreteGathRate = gathRatesCalculators.concreteGathRateCalc(
//     gameVars.allWorkers,
//     gameVars.multipliers.concreteMultiplier,
//     gameVars.activeEffect
//   );

//   // 🔷 6. Concrete Gather Rate (🧪 Requires Testing)
//   const newMetalsGathRate = gathRatesCalculators.metalsGathRateCalc(
//     gameVars.allWorkers,
//     gameVars.multipliers.metalsMultiplier,
//     gameVars.activeEffect
//   );

//   // 🔷 7. Concrete Gather Rate (🧪 Requires Testing)
//   const newCrystalsGathRate = gathRatesCalculators.crystalsGathRateCalc(
//     gameVars.allWorkers,
//     gameVars.multipliers.crystalsMultiplier,
//     gameVars.activeEffect
//   );

//   // 🔷 8. Concrete Gather Rate (🧪 Requires Testing)
//   const newDieselGathRate = gathRatesCalculators.dieselGathRateCalc(
//     gameVars.allWorkers,
//     gameVars.activeEffect
//   );

//   // ✨ RESOURCES ✨
//   // 🔷 9. Gold - Resource (🧪 Requires Testing)
//   const newGold = resourcesCalculators.goldResourceCalc(
//     currentGold,
//     newGoldGathRate,
//     gameConfig.gamePace,
//     gameVars.needsCatchUp
//   );

//   // 🔷 10. Concrete - Resource (🧪 Requires Testing)
//   const newConcrete = resourcesCalculators.concreteResourceCalc(
//     currentConcrete,
//     newConcreteGathRate,
//     gameConfig.gamePace,
//     gameVars.needsCatchUp
//   );

//   // 🔷 10. Concrete - Resource (🧪 Requires Testing)
//   const newMetals = resourcesCalculators.metalsResourceCalc(
//     currentMetals,
//     newMetalsGathRate,
//     gameConfig.gamePace,
//     gameVars.needsCatchUp
//   );

//   // 🔷 10. Concrete - Resource (🧪 Requires Testing)
//   const newCrystals = resourcesCalculators.crystalsResourceCalc(
//     currentCrystals,
//     newCrystalsGathRate,
//     gameConfig.gamePace,
//     gameVars.needsCatchUp
//   );

//   // 🔷 10. Concrete - Resource (🧪 Requires Testing)
//   const newDiesel = resourcesCalculators.dieselResourceCalc(
//     currentDiesel,
//     newDieselGathRate,
//     gameConfig.gamePace,
//     gameVars.needsCatchUp
//   );

//   /////////////////////////////////////////////////////////////////////////////////////////

//   // ✨ Maintenance Check + Resource Subtraction✨
//   maintenanceSubtracker();

//   // ✨ Energy Checker ✨
//   energyChecker();

//   loopCounter.current += 1;

//   /////////////////////////////////////////////////////////////////////////////////////////

//   // ✨ Final Return ✨
//   return {
//     newPopulation,
//     newPopGrowthRate,
//     newPrivateSector,
//     newGoldGathRate,
//     newConcreteGathRate,
//     newMetalsGathRate,
//     newCrystalsGathRate,
//     newDieselGathRate,
//     newGold,
//     newConcrete,
//     newMetals,
//     newCrystals,
//     newDiesel,
//   };
// };
