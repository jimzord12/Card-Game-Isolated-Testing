import {
  roundToDecimal,
  calcUpdatedGathValue,
  hoursToSecRates,
} from "../utils";

export const goldResourceCalc = (
  currentGold: number,
  goldGathRate: number,
  gamePace: number,
  needsCatchUp: boolean
) => {
  console.log("🧮 goldResourceCalc: currentGold: ", currentGold);
  console.log("🧮 goldResourceCalc: goldGathRate: ", goldGathRate);
  console.log("🧮 goldResourceCalc: gamePace: ", gamePace);
  console.log("🧮 goldResourceCalc: needsCatchUp: ", needsCatchUp);

  console.log(
    "🧮 goldResourceCalc: result: ",
    roundToDecimal(
      calcUpdatedGathValue(
        currentGold,
        hoursToSecRates(goldGathRate, gamePace, needsCatchUp)
      ),
      4
    )
  );
  return roundToDecimal(
    calcUpdatedGathValue(
      currentGold,
      hoursToSecRates(goldGathRate, gamePace, needsCatchUp)
    ),
    4
  );
};

export const concreteResourceCalc = (
  currentConcrete: number,
  concreteGathRate: number,
  gamePace: number,
  needsCatchUp: boolean
) => {
  return roundToDecimal(
    calcUpdatedGathValue(
      currentConcrete,
      hoursToSecRates(concreteGathRate, gamePace, needsCatchUp)
    ),
    4
  );
};

export const metalsResourceCalc = (
  currentMetals: number,
  metalsGathRate: number,
  gamePace: number,
  needsCatchUp: boolean
) => {
  return roundToDecimal(
    calcUpdatedGathValue(
      currentMetals,
      hoursToSecRates(metalsGathRate, gamePace, needsCatchUp)
    ),
    4
  );
};

export const crystalsResourceCalc = (
  currentCrystals: number,
  crystalsGathRate: number,
  gamePace: number,
  needsCatchUp: boolean
) => {
  return roundToDecimal(
    calcUpdatedGathValue(
      currentCrystals,
      hoursToSecRates(crystalsGathRate, gamePace, needsCatchUp)
    ),
    4
  );
};

export const dieselResourceCalc = (
  currentDiesel: number,
  dieselGathRate: number,
  gamePace: number,
  needsCatchUp: boolean
) => {
  return roundToDecimal(
    calcUpdatedGathValue(
      currentDiesel,
      hoursToSecRates(dieselGathRate, gamePace, needsCatchUp)
    ),
    4
  );
};
