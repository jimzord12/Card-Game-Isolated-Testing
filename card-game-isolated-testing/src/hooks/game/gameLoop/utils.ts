import BuildingCard from "../../../classes/buildingClass_V2";
import EffectClass from "../../../classes/effectClass";
import {
  BuildingStats,
  CardClass,
  CardSpot,
  CardTemplateId,
  CardType,
  Level,
} from "../../../types";
import {
  isBuildingCard,
  isBuildingSpot,
} from "../../../types/TypeGuardFns/BuildingGuards";
import { isRegCard, isRegSpot } from "../../../types/TypeGuardFns/RegGuards";
import { isSPCard } from "../../../types/TypeGuardFns/SPGuards";

// Game Mechanics - Calculators
function calcLivingStandards(
  base: number,
  population: number,
  bonus: number,
  housing: number
) {
  // Possible Outcomes:
  //  1. Available Houses and positive happiness => result (pop increasing)
  //  2. Available Houses and negative happiness => result (pop decreasing)
  //  3. NO Available Houses and positive happiness => 0 (pop can't increase)
  //  4. NO Available Houses and negative happiness => result (pop decreasing)
  const availableHouses = housing - population;
  const happiness = bonus + base - population;
  if (availableHouses <= 0 && happiness >= 0) return 0;
  return happiness;
}

function calcIncome(
  _availWorkers: number,
  multiplier: number,
  activeEffect?: EffectClass | null
) {
  const effectBoost = activeEffect?.output.goldGathRate ?? 1;
  console.log("calcIncome: effectBoost: ", effectBoost);
  console.log("calcIncome: _availWorkers: ", _availWorkers);
  console.log("calcIncome: multiplier: ", multiplier);
  return _availWorkers * multiplier * effectBoost;
}

function calcPercentage(a: number, b: number) {
  return (b / a) * 100;
}

function calcPrivSector(
  totalC: number,
  concreteW: number,
  metalsW: number,
  crystalsW: number
) {
  const result = totalC - concreteW - crystalsW - metalsW;
  return result <= 0 ? 0 : result;
}

function calcRank(totalPopulation: number, totalEnergy: number) {
  // Set the weights for population and energy
  const populationWeight = 0.7;
  const energyWeight = 0.3;

  // Calculate the weighted average of population and energy
  const weightedAverage =
    populationWeight * totalPopulation + energyWeight * totalEnergy;

  // Determine the maximum possible score based on the number of digits
  const maxScore = 999999;

  // Determine the maximum possible value of the weighted average
  const maxWeightedAverage =
    (maxScore / (populationWeight * Number.MAX_SAFE_INTEGER)) *
    (energyWeight * Number.MAX_SAFE_INTEGER);

  // Calculate the scaling factor to map the weighted average to the score range
  const scalingFactor = maxScore / maxWeightedAverage;

  // Scale the weighted average to a score between 1 and maxScore
  const score = Math.floor(weightedAverage * scalingFactor);

  return score;
}

// Used to calculate the Spacing (Housing, Buildings, Generators)
// lvl1 => 50%, lvl2 => 75%
function calcSpacing(level: number | Level, type = "housing") {
  const startingHousingSpace = 60; // Max Population Limit
  //   const startingBuildingsSpace = 4; // Max Buildings Limit
  //   const startingGeneratorsSpace = 2; // Max Generators Limit
  let result = 0;
  if (type.toLowerCase() === "housing")
    if (level === 1) {
      result = startingHousingSpace;
    } else {
      result = startingHousingSpace * Math.pow(1 + Number(level) / 4, 2);
    }
  //   if (type.toLowerCase() === "buildings")
  //     result = startingBuildingsSpace + level - 1;
  //   if (type.toLowerCase() === "generators")
  //     result = startingGeneratorsSpace + level - 1;

  return Math.round(result);
}

function calcSum(arrayOfCards: CardClass[], ...propKeys: string[]) {
  if (arrayOfCards.length === 0 || arrayOfCards === undefined)
    throw new Error("⛔ GameLoop: Utils: calcSum: Array is empty");
  let sum = 0;

  if (propKeys.length === 1 && propKeys[0] !== null) {
    arrayOfCards.forEach((currentCard) => {
      const cardProperty = currentCard[propKeys[0] as keyof CardClass];
      if (cardProperty === null)
        throw new Error("⛔ GameLoop: Utils: calcSum: cardProperty is null #1");
      sum += cardProperty as unknown as number;
    });
    return sum;
  }

  if (propKeys.length === 2) {
    arrayOfCards.forEach((currentCard) => {
      const firstCardProperty = currentCard[propKeys[0] as keyof CardClass];
      if (firstCardProperty === null)
        throw new Error(
          "⛔ GameLoop: Utils: calcSum: firstCardProperty is null #2.1"
        );

      const nestedCardProperty =
        firstCardProperty[propKeys[1] as keyof typeof firstCardProperty];
      if (nestedCardProperty === null || nestedCardProperty === undefined)
        throw new Error(
          "⛔ GameLoop: Utils: calcSum: nestedCardProperty is null or undefined #2.2"
        );

      sum += nestedCardProperty as unknown as number;
    });
    return sum;
  }
  if (propKeys.length === 3) {
    arrayOfCards.forEach((currentCard) => {
      const firstCardProperty = currentCard[propKeys[0] as keyof CardClass];
      if (firstCardProperty === null)
        throw new Error(
          "⛔ GameLoop: Utils: calcSum: firstCardProperty is null #3.1"
        );

      const nestedCardProperty =
        firstCardProperty[propKeys[1] as keyof typeof firstCardProperty];
      if (nestedCardProperty === null || nestedCardProperty === undefined)
        throw new Error(
          "⛔ GameLoop: Utils: calcSum: nestedCardProperty is null or undefined #3.2"
        );

      const evenNestierCardProperty =
        nestedCardProperty[propKeys[2] as keyof typeof nestedCardProperty];
      if (
        evenNestierCardProperty === null ||
        evenNestierCardProperty === undefined
      )
        throw new Error(
          "⛔ GameLoop: Utils: calcSum: evenNestierCardProperty is null or undefined #3.3"
        );

      sum += evenNestierCardProperty as unknown as number;
    });
    return sum;
  }
}

function calcMultiplier(
  techstoreCards: BuildingCard[],
  type: keyof BuildingStats,
  base: number
) {
  if (techstoreCards === undefined || techstoreCards.length === 0) return base;

  const result = techstoreCards.reduce((acc, techstoreCard) => {
    if (techstoreCard.stats === undefined) return base;
    const boost = techstoreCard.output.boost;
    return Number(techstoreCard.stats[`${type}`]) * boost + acc;
  }, 0);

  return (Number(result) + 1) * base;
}

function calcProduction(_assignedWorkers: number, multiplier: number) {
  return _assignedWorkers * multiplier;
}

function filterCardCategory(arrayOfCards: CardClass[], catType: CardType) {
  return arrayOfCards.filter(
    (card) => card.type.toLowerCase() === catType.toLowerCase()
  );
}

function findCardByTempId(
  arrayOfCards: CardClass[],
  templateId: CardTemplateId
) {
  return arrayOfCards.find((card) => card.templateId === templateId);
}

function findCardById(arrayOfCards: CardClass[], id: number) {
  return arrayOfCards.find((card) => card.id === id);
}

function calcUpdatedGathValue(oldValue: number, rate: number) {
  return oldValue + rate;
}

type serverCbProps = { id: number; state: boolean; disabled?: boolean };

function cardsStateManager(
  arrayOfCards: CardClass[],
  action: "activate" | "deactivate",
  serverCb: ({ id, state, disabled }: serverCbProps) => void,
  cardSpot?: CardSpot
) {
  arrayOfCards.forEach((card, index) => {
    const oldCardState = card.state;
    console.log(
      "HelperFunctions::cardsStateManager: (",
      index,
      ") Old State: ",
      oldCardState
    );
    if (action === "activate") {
      if (cardSpot === undefined || cardSpot === null)
        throw new Error(
          "⛔ GameLoop: Utils: cardsStateManager: cardSpot is null or undefined #1.1"
        );
      if (
        isBuildingCard(card) &&
        isBuildingSpot(cardSpot) &&
        card.spot !== null &&
        card.spot !== undefined
      ) {
        card.activate(cardSpot);
      } else if (
        isRegCard(card) &&
        isRegSpot(cardSpot) &&
        card.spot !== null &&
        card.spot !== undefined
      ) {
        card.activate(cardSpot);
      }
    } else if (action === "deactivate") {
      if (isSPCard(card)) {
        card.disable();
      } else {
        card.deactivate();
      }
    }

    // Updating/Syncing the Server/Database State
    if (isSPCard(card)) {
      const { id, state, disabled } = card;
      if (id === null || state === null || disabled === null)
        throw new Error(
          "⛔ GameLoop: Utils: cardsStateManager: id, state, or disabled is null"
        );
      serverCb({ id, state, disabled });
    } else {
      const { id, state } = card;
      if (id === null || state === null)
        throw new Error(
          "⛔ GameLoop: Utils: cardsStateManager: id or state is null"
        );
      serverCb({ id, state });
    }
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to store data in localStorage
// export const setLSItem = (key, value) => {
//   try {
//     localStorage.setItem(key, JSON.stringify(value));
//   } catch (error) {
//     console.error(`Error setting localStorage key "${key}": ${error}`);
//   }
// };

// // Function to retrieve data from localStorage
// export const getLSItem = (key) => {
//   try {
//     const value = localStorage.getItem(key);
//     return value ? JSON.parse(value) : false;
//   } catch (error) {
//     console.error(`Error getting localStorage key "${key}": ${error}`);
//     return false;
//   }
// };

// export function randNumber4Testing() {
//   return Math.floor(Math.random() * 3000) + 2;
// }

function removeObjectWithId(cardsArr: CardClass[], id: number) {
  return cardsArr.filter((card) => card.id !== id);
}

function roundToDecimal(number: number, decimalPlaces: number) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
}

function hoursToSecRates(
  gatheringRate: number,
  secondsTick: number,
  needCatchUp = false
) {
  //@Docs:
  // The game loop runs every (5 seconds), but the gathering rates represent
  // production per hour. So we need to find out how much production has happened in 5 secs.
  // Now, when a Non-New player logs in, we have to calculate the amount of resources that were produced during his/her absence.
  // To do this, we will simulate the number of loops that would have taken place if the player did not leave the game. However, to increase performance, we will change the time precision of the calculations. From 5 seconds to 10 minutes.
  // This obviously, results in less precision because the gap of time we check is bigger than before, but the gains are that we need to run 6 loops per hour that has passed, rather than 720 loops. If 7 days have passed, we will have to run around 1000 loops using the 10min precision, whereas using the 5sec one 120,960.
  if (needCatchUp) {
    const catchUpTimeUnit = 60 / 10; // 10 minutes per hour
    return Number(gatheringRate) / catchUpTimeUnit;
  }
  const mathCalc = Number(gatheringRate) / (60 * (60 / secondsTick));
  return roundToDecimal(mathCalc, 4);
}

function datesDelta(expirationTimestamp: number) {
  const currentDate = Date.now();
  // Subtract the time values of the two dates to get the difference in milliseconds
  const diff = expirationTimestamp - currentDate;
  console.log("datesDelta::expirationTimestamp: ", expirationTimestamp);
  console.log("datesDelta::currentDate: ", currentDate);
  console.log("1 - diff: ", diff);
  console.log("2 - diff: ", convertTimestamp2(diff));

  // Check if the difference is less than or equal to zero
  if (diff <= 0) {
    return true;
  }
  // Returns true if the effect has still remaining time...
  return false;
}

//@Important: "precision" must be in milliseconds!
function calcTimeUnits(
  previousDate: string,
  currentDate: number,
  precision: number
) {
  const convertedPrevDate = mysqlDatetimeToUnixTimestamp(previousDate) / 1000;
  const diff = Math.abs(currentDate - convertedPrevDate);
  console.log("1 - Utils::calcTimeUnits: Diff => ", diff);
  console.log(
    "2 - Utils::calcTimeUnits: Diff => ",
    Math.trunc(diff / precision)
  );
  // if the difference is greater than 7 Days...
  if (diff > 604800000) {
    throw new Error("AFK");
  }
  return Math.trunc(diff / precision);
}

function convertToMySQLDatetime(timestamp: number) {
  const date = new Date(timestamp);

  const pad = (num: number) => (num < 10 ? "0" + num : num);

  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1); // Months are zero-based
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mi = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

function removeTimezoneInfo(datetimeStr: string) {
  // Check if the string ends with 'Z' and remove it
  if (datetimeStr.endsWith("Z")) {
    return datetimeStr.slice(0, -1);
  }
  // Return the original string if 'Z' is not present
  return datetimeStr;
}

function mysqlDatetimeToUnixTimestamp(mysqlDatetime: string) {
  console.log("mysqlDatetimeToUnixTimestamp::Input => ", mysqlDatetime);
  const dateWithoutTimeZone = removeTimezoneInfo(mysqlDatetime);
  console.log(
    "mysqlDatetimeToUnixTimestamp::Removed TimeZone Info => ",
    dateWithoutTimeZone
  );
  // const localDatetime = mysqlDatetime.slice(0, 19);
  // const date = new Date(localDatetime + "Z"); // Ensure UTC by appending 'Z'
  const date = new Date(dateWithoutTimeZone);
  // console.log("MySQL Date String => Timestamp: ", date.getTime() / 1000);
  return date.getTime() / 1000; // Corrected to divide by 1000
}

// function needCatchUp(previousDate: string | null, currentDate: number) {
//   // If New Player, no need to catch up
//   if (previousDate === null) return false;

//   const convertedPrevDate = mysqlDatetimeToUnixTimestamp(previousDate);
//   const diff = Math.abs(currentDate - convertedPrevDate);
//   console.log("Player Last Known Login Timestamp: ", convertedPrevDate);
//   console.log("Current Date (Now): ", currentDate);
//   console.log("Their Difference: ", diff);

//   if (diff > 900000) {
//     // 15 mins
//     console.log("Catch Up is required!");
//     return true;
//   }
//   console.log("There is no need to catch up the progress of your account");
//   return false;
// }

function convertTimestamp(timestamp: number) {
  const seconds = Math.floor(timestamp);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    days: days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
}

function convertTimestamp2(timestamp: number) {
  // Convert milliseconds to seconds
  const totalSeconds = Math.floor(timestamp / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

export {
  calcLivingStandards,
  calcIncome,
  calcPercentage,
  calcPrivSector,
  calcProduction,
  calcRank,
  calcSpacing,
  calcSum,
  calcMultiplier,
  filterCardCategory,
  findCardByTempId,
  findCardById,
  calcUpdatedGathValue,
  cardsStateManager,
  removeObjectWithId,
  roundToDecimal,
  hoursToSecRates,
  datesDelta,
  calcTimeUnits,
  convertToMySQLDatetime,
  mysqlDatetimeToUnixTimestamp,
  convertTimestamp,
  convertTimestamp2,
  // needCatchUp,
};
