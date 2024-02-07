import { gameConfig } from "../constants/game";
import {
  gathRatesCalculators,
  generalCalculators,
  resourcesCalculators,
} from "../hooks/game/gameLoop/calculators";
import {
  calcUpdatedGathValue,
  hoursToSecRates,
} from "../hooks/game/gameLoop/utils";
import {
  IGameLoopWorkerInput,
  NewGameState,
} from "../types/GameLoopTypes/GameLoopTypes";
import { roundToDecimal } from "../utils";

onmessage = (e: MessageEvent<IGameLoopWorkerInput>) => {
  const result = processGameLoopWorker(e.data);
  postMessage(result); // This is the message that will be sent back to the main thread
};

const processGameLoopWorker = ({
  currentPopulation,
  currentPopGrowthRate,
  //   happinessProvidedByBuildings,
  allWorkers,
  multipliers,
  currentGold,
  currentConcrete,
  currentMetals,
  currentCrystals,
  currentDiesel,
  needsCatchUp,
  activeEffect,
}: IGameLoopWorkerInput) => {
  let wasSuccess = false;
  // 🔷 1. Population (🧪 Requires Testing)
  const newPopulation = roundToDecimal(
    calcUpdatedGathValue(
      currentPopulation,
      hoursToSecRates(currentPopGrowthRate, gameConfig.gamePace, needsCatchUp)
    ),
    4
  );

  // 🔷 2. Population Growth Rate (🧪 Requires Testing)
  const newPopGrowthRate = gathRatesCalculators.calcPopGrowthRate(
    newPopulation,
    currentPopGrowthRate
  );

  // 🔷 3. Private Sector (🧪 Requires Testing)
  const newPrivateSector = generalCalculators.privateSectorCalc(
    allWorkers,
    newPopulation
  );

  // ✨ GATHERING RATES ✨
  // 🔷 4. Gold Gather Rate (🧪 Requires Testing)
  const newGoldGathRate = gathRatesCalculators.goldGathRateCalc(
    newPrivateSector,
    multipliers.goldMultiplier,
    activeEffect
  );

  // 🔷 5. Concrete Gather Rate (🧪 Requires Testing)
  const newConcreteGathRate = gathRatesCalculators.concreteGathRateCalc(
    allWorkers,
    multipliers.concreteMultiplier,
    activeEffect
  );

  // 🔷 6. Concrete Gather Rate (🧪 Requires Testing)
  const newMetalsGathRate = gathRatesCalculators.metalsGathRateCalc(
    allWorkers,
    multipliers.metalsMultiplier,
    activeEffect
  );

  // 🔷 7. Concrete Gather Rate (🧪 Requires Testing)
  const newCrystalsGathRate = gathRatesCalculators.crystalsGathRateCalc(
    allWorkers,
    multipliers.crystalsMultiplier,
    activeEffect
  );

  // 🔷 8. Concrete Gather Rate (🧪 Requires Testing)
  const newDieselGathRate = gathRatesCalculators.dieselGathRateCalc(
    allWorkers,
    activeEffect
  );

  // ✨ RESOURCES ✨
  // 🔷 9. Gold - Resource (🧪 Requires Testing)
  const newGold = resourcesCalculators.goldResourceCalc(
    currentGold,
    newGoldGathRate,
    gameConfig.gamePace,
    needsCatchUp
  );

  // 🔷 10. Concrete - Resource (🧪 Requires Testing)
  const newConcrete = resourcesCalculators.concreteResourceCalc(
    currentConcrete,
    newConcreteGathRate,
    gameConfig.gamePace,
    needsCatchUp
  );

  // 🔷 10. Concrete - Resource (🧪 Requires Testing)
  const newMetals = resourcesCalculators.metalsResourceCalc(
    currentMetals,
    newMetalsGathRate,
    gameConfig.gamePace,
    needsCatchUp
  );

  // 🔷 10. Concrete - Resource (🧪 Requires Testing)
  const newCrystals = resourcesCalculators.crystalsResourceCalc(
    currentCrystals,
    newCrystalsGathRate,
    gameConfig.gamePace,
    needsCatchUp
  );

  // 🔷 10. Concrete - Resource (🧪 Requires Testing)
  const newDiesel = resourcesCalculators.dieselResourceCalc(
    currentDiesel,
    newDieselGathRate,
    gameConfig.gamePace,
    needsCatchUp
  );

  wasSuccess = true;
  const newState: NewGameState = {
    newConcrete,
    newCrystals,
    newDiesel,
    newGold,
    newMetals,
    newPopGrowthRate,
    newPopulation,
  };

  // ✨ Final Return ✨
  return {
    newState,
    wasSuccess,
  };
};
