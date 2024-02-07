import { calcUpdatedGathValue, hoursToSecRates, roundToDecimal } from "./utils";
import { useGameVarsStore } from "../../../stores/gameVars";
import { isNotNullOrUndefined } from "../../../types/TypeGuardFns/isNullorUndefined";
import { gameConfig } from "../../../constants/game";
import {
  gathRatesCalculators,
  generalCalculators,
  resourcesCalculators,
} from "./calculators";
import useValuesChecker from "./useValuesChecker";
import { useRef } from "react";
import {
  IGameLoopWorkerInput,
  NewGameState,
} from "../../../types/GameLoopTypes/GameLoopTypes";

const useGameLoop = () => {
  const gameVars = useGameVarsStore();
  const { energyChecker, maintenanceSubtracker } = useValuesChecker();

  const loopCounter = useRef(0);

  const processGameLoop = () => {
    // 🔷 Making sure the values are not Null or undefined
    const population = isNotNullOrUndefined<number>(
      gameVars.player?.population,
      "population"
    );

    const popGrowthRate = isNotNullOrUndefined<number>(
      gameVars.popGrowthRate,
      "popGrowthRate"
    );

    const currentGold = isNotNullOrUndefined<number>(
      gameVars.player?.gold,
      "gold"
    );
    const currentConcrete = isNotNullOrUndefined<number>(
      gameVars.player?.concrete,
      "concrete"
    );
    const currentMetals = isNotNullOrUndefined<number>(
      gameVars.player?.metals,
      "metals"
    );
    const currentCrystals = isNotNullOrUndefined<number>(
      gameVars.player?.crystals,
      "crystals"
    );
    const currentDiesel = isNotNullOrUndefined<number>(
      gameVars.player?.diesel,
      "diesel"
    );

    //////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////  CALCULATIONS START HERE  ///////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////

    // 🔷 1. Population (🧪 Requires Testing)
    const newPopulation = roundToDecimal(
      calcUpdatedGathValue(
        population,
        hoursToSecRates(
          popGrowthRate,
          gameConfig.gamePace,
          gameVars.needsCatchUp
        )
      ),
      4
    );

    // 🔷 2. Population Growth Rate (🧪 Requires Testing)
    const newPopGrowthRate = gathRatesCalculators.calcPopGrowthRate(
      newPopulation,
      gameVars.popGrowthRate
    );

    // 🔷 3. Private Sector (🧪 Requires Testing)
    const newPrivateSector = generalCalculators.privateSectorCalc(
      gameVars.allWorkers,
      newPopulation
    );

    // ✨ GATHERING RATES ✨
    // 🔷 4. Gold Gather Rate (🧪 Requires Testing)
    const newGoldGathRate = gathRatesCalculators.goldGathRateCalc(
      newPrivateSector,
      gameVars.multipliers.goldMultiplier,
      gameVars.activeEffect
    );

    // 🔷 5. Concrete Gather Rate (🧪 Requires Testing)
    const newConcreteGathRate = gathRatesCalculators.concreteGathRateCalc(
      gameVars.allWorkers,
      gameVars.multipliers.concreteMultiplier,
      gameVars.activeEffect
    );

    // 🔷 6. Concrete Gather Rate (🧪 Requires Testing)
    const newMetalsGathRate = gathRatesCalculators.metalsGathRateCalc(
      gameVars.allWorkers,
      gameVars.multipliers.metalsMultiplier,
      gameVars.activeEffect
    );

    // 🔷 7. Concrete Gather Rate (🧪 Requires Testing)
    const newCrystalsGathRate = gathRatesCalculators.crystalsGathRateCalc(
      gameVars.allWorkers,
      gameVars.multipliers.crystalsMultiplier,
      gameVars.activeEffect
    );

    // 🔷 8. Concrete Gather Rate (🧪 Requires Testing)
    const newDieselGathRate = gathRatesCalculators.dieselGathRateCalc(
      gameVars.allWorkers,
      gameVars.activeEffect
    );

    // ✨ RESOURCES ✨
    // 🔷 9. Gold - Resource (🧪 Requires Testing)
    const newGold = resourcesCalculators.goldResourceCalc(
      currentGold,
      newGoldGathRate,
      gameConfig.gamePace,
      gameVars.needsCatchUp
    );

    // 🔷 10. Concrete - Resource (🧪 Requires Testing)
    const newConcrete = resourcesCalculators.concreteResourceCalc(
      currentConcrete,
      newConcreteGathRate,
      gameConfig.gamePace,
      gameVars.needsCatchUp
    );

    // 🔷 10. Concrete - Resource (🧪 Requires Testing)
    const newMetals = resourcesCalculators.metalsResourceCalc(
      currentMetals,
      newMetalsGathRate,
      gameConfig.gamePace,
      gameVars.needsCatchUp
    );

    // 🔷 10. Concrete - Resource (🧪 Requires Testing)
    const newCrystals = resourcesCalculators.crystalsResourceCalc(
      currentCrystals,
      newCrystalsGathRate,
      gameConfig.gamePace,
      gameVars.needsCatchUp
    );

    // 🔷 10. Concrete - Resource (🧪 Requires Testing)
    const newDiesel = resourcesCalculators.dieselResourceCalc(
      currentDiesel,
      newDieselGathRate,
      gameConfig.gamePace,
      gameVars.needsCatchUp
    );

    /////////////////////////////////////////////////////////////////////////////////////////

    // ✨ Maintenance Check + Resource Subtraction✨
    maintenanceSubtracker();

    // ✨ Energy Checker ✨
    energyChecker();

    loopCounter.current += 1;

    /////////////////////////////////////////////////////////////////////////////////////////

    // ✨ Final Return ✨
    return {
      newPopulation,
      newPopGrowthRate,
      newPrivateSector,
      newGoldGathRate,
      newConcreteGathRate,
      newMetalsGathRate,
      newCrystalsGathRate,
      newDieselGathRate,
      newGold,
      newConcrete,
      newMetals,
      newCrystals,
      newDiesel,
    };
  };

  const setNewGameState = ({
    newPopulation,
    newPopGrowthRate,
    newGold,
    newConcrete,
    newMetals,
    newCrystals,
    newDiesel,
  }: NewGameState) => {
    gameVars.updatePlayerData({
      population: newPopulation,
      gold: newGold,
      concrete: newConcrete,
      metals: newMetals,
      crystals: newCrystals,
      diesel: newDiesel,
    });

    gameVars.setPopGrowthRate(newPopGrowthRate);
  };

  const getGameState = (): IGameLoopWorkerInput => {
    const currentPopulation = isNotNullOrUndefined<number>(
      gameVars.player?.population,
      "population"
    );

    const currentPopGrowthRate = isNotNullOrUndefined<number>(
      gameVars.popGrowthRate,
      "popGrowthRate"
    );

    const currentGold = isNotNullOrUndefined<number>(
      gameVars.player?.gold,
      "gold"
    );
    const currentConcrete = isNotNullOrUndefined<number>(
      gameVars.player?.concrete,
      "concrete"
    );
    const currentMetals = isNotNullOrUndefined<number>(
      gameVars.player?.metals,
      "metals"
    );
    const currentCrystals = isNotNullOrUndefined<number>(
      gameVars.player?.crystals,
      "crystals"
    );
    const currentDiesel = isNotNullOrUndefined<number>(
      gameVars.player?.diesel,
      "diesel"
    );
    return {
      activeEffect: gameVars.activeEffect,
      allWorkers: gameVars.allWorkers,
      multipliers: gameVars.multipliers,
      needsCatchUp: gameVars.needsCatchUp,
      currentGold,
      currentConcrete,
      currentMetals,
      currentCrystals,
      currentDiesel,
      currentPopulation,
      currentPopGrowthRate,
    };
  };

  return { processGameLoop, setNewGameState, getGameState };
};

export default useGameLoop;
