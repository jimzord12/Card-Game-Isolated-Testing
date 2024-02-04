import { CardClass, Level } from "..";

export interface valueCheckerParams {
  population: number;
  activeCards: CardClass[];
  EffectRef: unknown; // TODO: Replace 'unknown' with a more specific type when you create Effect Class
  townhallLevel: Level;
  popGrowthRate: number;
  workers: {
    privateSector: number;
    concreteWorkers: number;
    metalsWorkers: number;
    crystalsWorkers: number;
  };
  energyRemaining: number;
}

export interface valueCheckerReturnType {
  population: number;
  activeCards: CardClass[];
  // Effect
  workers: {
    privateSector: number;
    concreteWorkers: number;
    metalsWorkers: number;
    crystalsWorkers: number;
  };
  popGrowthRate: number;

}

export type alertFlagsTypes = "Insufficient Energy" | "Effect Expired"
