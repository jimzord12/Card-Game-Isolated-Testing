import { effectClass } from "../../../../classes";
import { startingStats, gameConfig } from "../../../../constants/game";
import { EffectOutput } from "../../../../types";
import { Workers } from "../../../../types/GameLoopTypes/GameLoopTypes";
import { round4Decimal } from "../../../../utils/game/roundToDecimal";
import { roundToDecimal, calcProduction } from "../utils";

export const calcPopGrowthRate = (
  population: number,
  happinessProvidedByBuildings: number,
  factoryUnhappiness: number,
  activeEffect: effectClass | null
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
  const result = activeEffect
    ? (baseHappiness + happinessProvidedByBuildings - factoryUnhappiness) *
      activeEffect.output["popGrowthRate" as keyof EffectOutput]
    : baseHappiness + happinessProvidedByBuildings - factoryUnhappiness;
  return round4Decimal(result);
};

export const goldGathRateCalc = (
  privateSector: number,
  expensesPerHour: number,
  goldMultiplier: number,
  specialEffect: effectClass | null
) => {
  // console.log("🧮 goldGathRateCalc: privateSector: ", privateSector);
  // console.log("🧮 goldGathRateCalc: expensesPerHour: ", expensesPerHour);
  console.log("🧪🧮 goldGathRateCalc: goldMultiplier: ", goldMultiplier);
  // console.log("🧮 goldGathRateCalc: specialEffect: ", specialEffect);

  const goldFromPrivateSector = roundToDecimal(
    calcProduction(privateSector, goldMultiplier),
    4
  );
  console.log("🧪🧮 goldFromPrivateSector: ", goldFromPrivateSector);
  const boostFromEffect = specialEffect
    ? specialEffect.output["goldGathRate" as keyof EffectOutput]
    : 1;

  console.log("🧪🧮 boostFromEffect: ", boostFromEffect);
  console.log(
    "🧪🧮 goldGathRateCalc: ",
    goldFromPrivateSector * boostFromEffect - expensesPerHour
  );
  return round4Decimal(
    goldFromPrivateSector * boostFromEffect - expensesPerHour
  );
};

export const concreteGathRateCalc = (
  workers: Workers,
  concreteMultiplier: number,
  specialEffect: effectClass | null
) => {
  const result =
    roundToDecimal(
      calcProduction(workers.concreteWorkers, concreteMultiplier),
      4
    ) *
    (specialEffect
      ? specialEffect.output["concreteGathRate" as keyof EffectOutput]
      : 1);
  console.log("⛽ GameLoopWorker - concreteGathRateCalc: ", result);
  return round4Decimal(result);
};

export const metalsGathRateCalc = (
  workers: Workers,
  metalsMultiplier: number,
  specialEffect: effectClass | null
) => {
  const result =
    roundToDecimal(calcProduction(workers.metalsWorkers, metalsMultiplier), 4) *
    (specialEffect
      ? specialEffect.output["metalsGathRate" as keyof EffectOutput]
      : 1);
  console.log("⛽ GameLoopWorker - metalsGathRateCalc: ", result);
  return round4Decimal(result);
};

export const crystalsGathRateCalc = (
  workers: Workers,
  crystalsMultiplier: number,
  specialEffect: effectClass | null
) => {
  const result =
    roundToDecimal(
      calcProduction(workers.crystalsWorkers, crystalsMultiplier),
      4
    ) *
    (specialEffect
      ? specialEffect.output["crystalsGathRate" as keyof EffectOutput]
      : 1);
  console.log("⛽ GameLoopWorker - crystalsGathRateCalc: ", result);
  return round4Decimal(result);
};

export const dieselGathRateCalc = (
  workers: Workers,
  dieselMultiplier: number,
  barrelsUsedPerHour: number,
  specialEffect: effectClass | null
) => {
  const dieselFromWorkers = roundToDecimal(
    calcProduction(workers.dieselWorkers, dieselMultiplier),
    4
  );
  const boostFromEffect = specialEffect
    ? specialEffect.output["dieselGathRate" as keyof EffectOutput]
    : 1;

  const result = round4Decimal(
    dieselFromWorkers * boostFromEffect - barrelsUsedPerHour
  );
  console.log("⛽ GameLoopWorker - dieselGathRateCalc: ", result);

  return result;
};
