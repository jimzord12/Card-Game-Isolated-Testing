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
const effectDuration = 12 * hour; //

const happinessCoefficient = 0.3;

export {
  effectDuration,
  catchUpLoopDuration,
  gamePace,
  cardsWithStats,
  happinessCoefficient,
  minute,
  hour,
  day,
};