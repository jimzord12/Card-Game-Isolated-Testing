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
  if (e.data.loopsToRun === undefined) {
    postMessage(processGameLoopWorker(e.data));
  } else {
    const doesItNeedCatchUp = e.data.loopsToRun > 1;
    const nextState: IGameLoopWorkerInput = {
      ...e.data,
      currentConcrete: 0,
      currentCrystals: 0,
      currentDiesel: 0,
      currentGold: 0,
      currentMetals: 0,
      currentPopGrowthRate: 0,
      currentPopulation: 0,
    };

    for (let i = 0; i < e.data.loopsToRun; i++) {
      if (i === 0) {
        const firstResult = processGameLoopWorker(e.data);
        nextState.currentConcrete = firstResult.newState.newConcrete;
        nextState.currentCrystals = firstResult.newState.newCrystals;
        nextState.currentDiesel = firstResult.newState.newDiesel;
        nextState.currentGold = firstResult.newState.newGold;
        nextState.currentMetals = firstResult.newState.newMetals;
        nextState.currentPopGrowthRate = firstResult.newState.newPopGrowthRate;
        nextState.currentPopulation = firstResult.newState.newPopulation;
      } else {
        const result = processGameLoopWorker(nextState, doesItNeedCatchUp);
        nextState.currentConcrete = result.newState.newConcrete;
        nextState.currentCrystals = result.newState.newCrystals;
        nextState.currentDiesel = result.newState.newDiesel;
        nextState.currentGold = result.newState.newGold;
        nextState.currentMetals = result.newState.newMetals;
        nextState.currentPopGrowthRate = result.newState.newPopGrowthRate;
        nextState.currentPopulation = result.newState.newPopulation;
      }
    }
    const finalResult: { newState: NewGameState; wasSuccess: boolean } = {
      newState: {
        newConcrete: nextState.currentConcrete,
        newCrystals: nextState.currentCrystals,
        newDiesel: nextState.currentDiesel,
        newGold: nextState.currentGold,
        newMetals: nextState.currentMetals,
        newPopGrowthRate: nextState.currentPopGrowthRate,
        newPopulation: nextState.currentPopulation,
      },
      wasSuccess: true,
    };
    console.log("Final State: ", finalResult);
    postMessage(finalResult); // This is the message that will be sent back to the main thread
  }
};

const processGameLoopWorker = (
  {
    currentPopulation,
    currentPopGrowthRate,
    happinessProvidedByBuildings,
    allWorkers,
    multipliers,
    currentGold,
    currentConcrete,
    currentMetals,
    currentCrystals,
    currentDiesel,
    activeEffect,
    maxAllowedPopulation,
  }: IGameLoopWorkerInput,
  needsCatchUp: boolean = false
) => {
  let wasSuccess = false;
  let newPopulation = maxAllowedPopulation;
  let newPopGrowthRate = 0;
  // 🔷 1. Population (🧪 Requires Testing)
  if (currentPopulation < maxAllowedPopulation) {
    newPopulation = roundToDecimal(
      calcUpdatedGathValue(
        currentPopulation,
        hoursToSecRates(currentPopGrowthRate, gameConfig.gamePace, needsCatchUp)
      ),
      4
    );

    // 🔷 2. Population Growth Rate (🧪 Requires Testing)
    newPopGrowthRate = gathRatesCalculators.calcPopGrowthRate(
      newPopulation,
      happinessProvidedByBuildings
    );
  }

  // console.log(
  //   "✌️ [gameLoopWorker] newPopulation: ",
  //   hoursToSecRates(currentPopGrowthRate, gameConfig.gamePace, needsCatchUp)
  // );

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
  // console.log("✌️ [gameLoopWorker] newGold: ", newGold);

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
