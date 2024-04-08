import { DefaultBuildingName } from "../../types/CardTypes/DefaultBuildingTypes";

export const defaultBuildings: DefaultBuildingName[] = ["factory", "townhall"];

const cardsWithStats = [13, 101]; // Template ID. 13 is for old DB records

// ⏰ Time related constants ⏰
const day = 1 * 24 * 60 * 60 * 1000;
const hour = 60 * 60 * 1000;
const minute = 60 * 1000;

// Game Loop
const gamePace = 5; // Game Loop's Timer in Seconds
const catchUpLoopDuration = 10 * minute; // 10 minutes

const happinessCoefficient = 0.3;

const effectDuration = 1 * day;
// const effectDuration = 15 * minute; // ✨ For Testing

const defaultRatesMultipliers = {
  goldMultiplier: 2,
  dieselMultiplier: 2.5,
  concreteMultiplier: 1.5,
  metalsMultiplier: 1.25,
  crystalsMultiplier: 1,
};

const defaultRates = {
  popGrowthRate: 0,
  goldGathRate: 0,
  dieselGathRate: 0,
  concreteGathRate: 0,
  metalsGathRate: 0,
  crystalsGathRate: 0,
};

const defaultQuarryLevels = {
  concrete: 1,
  metals: 1,
  crystals: 1,
  diesel: 1,
};

const defaultWorkers = {
  privateSector: 0,
  concreteWorkers: 0,
  metalsWorkers: 0,
  crystalsWorkers: 0,
  dieselWorkers: 0,
  hospitalWorkers: 0,
};

export {
  catchUpLoopDuration,
  gamePace,
  cardsWithStats,
  happinessCoefficient,
  minute,
  hour,
  day,
  effectDuration,
  defaultRatesMultipliers,
  defaultRates,
  defaultQuarryLevels,
  defaultWorkers,
};
