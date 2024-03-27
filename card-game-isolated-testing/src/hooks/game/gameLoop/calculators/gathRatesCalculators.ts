import { effectClass } from "../../../../classes";
import { startingStats, gameConfig } from "../../../../constants/game";
import { EffectOutput } from "../../../../types";
import { Workers } from "../../../../types/GameLoopTypes/GameLoopTypes";
import { round4Decimal } from "../../../../utils/game/roundToDecimal";
import { roundToDecimal, calcProduction } from "../utils";

export const calcPopGrowthRate = (
  population: number,
  happinessProvidedByBuildings: number,
  factoryUnhappiness: number
) => {
  const baseHappiness = round4Decimal(
    (startingStats.livingStandardsBase / population) *
      gameConfig.happinessCoefficient
  ); // 200 / pop * 0.3
  console.log("calcPopGrowthRate: baseHappiness: ", baseHappiness);
  console.log(
    "calcPopGrowthRate: happinessProvidedByBuildings: ",
    happinessProvidedByBuildings
  );
  console.log("calcPopGrowthRate: factoryUnhappiness: ", factoryUnhappiness);
  return baseHappiness + happinessProvidedByBuildings - factoryUnhappiness;
};

export const dieselGathRateCalc = (
  workers: Workers,
  //   dieselMultiplier: number,
  barrelsUsedPerHour: number,
  specialEffect: effectClass | null
) => {
  const dieselFromWorkers = roundToDecimal(
    calcProduction(workers.dieselWorkers, 1),
    4
  );
  const boostFromEffect = specialEffect
    ? specialEffect.output["dieselGathRate" as keyof EffectOutput]
    : 1;

  return dieselFromWorkers * boostFromEffect - barrelsUsedPerHour;
};

export const goldGathRateCalc = (
  privateSector: number,
  expensesPerHour: number,
  goldMultiplier: number,
  specialEffect: effectClass | null
) => {
  const goldFromPrivateSector = roundToDecimal(
    calcProduction(privateSector, goldMultiplier),
    4
  );
  const boostFromEffect = specialEffect
    ? specialEffect.output["goldGathRate" as keyof EffectOutput]
    : 1;

  return goldFromPrivateSector * boostFromEffect - expensesPerHour;
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
