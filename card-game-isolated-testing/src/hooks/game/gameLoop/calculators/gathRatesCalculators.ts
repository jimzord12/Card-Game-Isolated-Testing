import { effectClass } from "../../../../classes";
import { startingStats, gameConfig } from "../../../../constants/game";
import { EffectOutput } from "../../../../types";
import { Workers } from "../../../../types/GameLoopTypes/GameLoopTypes";
import { roundToDecimal, calcProduction } from "../utils";

export const calcPopGrowthRate = (
  population: number,
  happinessProvidedByBuildings: number
) => {
  const baseHappiness = Math.floor(
    (startingStats.livingStandardsBase / population) *
      gameConfig.happinessCoefficient
  );

  return baseHappiness + happinessProvidedByBuildings;
};

export const goldGathRateCalc = (
  privateSector: number,
  goldMultiplier: number,
  specialEffect: effectClass | null
) => {
  return (
    roundToDecimal(calcProduction(privateSector, goldMultiplier), 4) *
    (specialEffect
      ? specialEffect.output["goldGathRate" as keyof EffectOutput]
      : 1)
  );
};

export const concreteGathRateCalc = (
  workers: Workers,
  concreteMultiplier: number,
  specialEffect: effectClass | null
) => {
  return (
    roundToDecimal(
      calcProduction(workers.concreteWorkers, concreteMultiplier),
      4
    ) *
    (specialEffect
      ? specialEffect.output["concreteGathRate" as keyof EffectOutput]
      : 1)
  );
};

export const metalsGathRateCalc = (
  workers: Workers,
  metalsMultiplier: number,
  specialEffect: effectClass | null
) => {
  return (
    roundToDecimal(calcProduction(workers.metalsWorkers, metalsMultiplier), 4) *
    (specialEffect
      ? specialEffect.output["metalsGathRate" as keyof EffectOutput]
      : 1)
  );
};

export const crystalsGathRateCalc = (
  workers: Workers,
  crystalsMultiplier: number,
  specialEffect: effectClass | null
) => {
  return (
    roundToDecimal(
      calcProduction(workers.crystalsWorkers, crystalsMultiplier),
      4
    ) *
    (specialEffect
      ? specialEffect.output["crystalsGathRate" as keyof EffectOutput]
      : 1)
  );
};

export const dieselGathRateCalc = (
  workers: Workers,
  //   dieselMultiplier: number,
  specialEffect: effectClass | null
) => {
  return (
    roundToDecimal(calcProduction(workers.dieselWorkers, 1), 4) *
    (specialEffect
      ? specialEffect.output["dieselGathRate" as keyof EffectOutput]
      : 1)
  );
};
