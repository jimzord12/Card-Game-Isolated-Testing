import { CardClass, Level } from "..";
import { effectClass } from "../../classes";

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
  workers: Workers;
  popGrowthRate: number;
}

export interface Workers {
  privateSector: number;
  concreteWorkers: number;
  metalsWorkers: number;
  crystalsWorkers: number;
  dieselWorkers: number;
  hospitalWorkers: number;
}

export interface Multipliers {
  goldMultiplier: number;
  concreteMultiplier: number;
  metalsMultiplier: number;
  crystalsMultiplier: number;
}

export type alertFlagsTypes = "Insufficient Energy" | "Effect Expired";

export interface gameLoopWorkerReturnType {
  newState: {
    newPopulation: number;
    newPopGrowthRate: number;
    newGold: number;
    newConcrete: number;
    newMetals: number;
    newCrystals: number;
    newDiesel: number;
  };
  wasSuccess: boolean;
}

export interface NewGameState {
  newPopulation: number;
  newPopGrowthRate: number;
  newGold: number;
  newConcrete: number;
  newMetals: number;
  newCrystals: number;
  newDiesel: number;
}

export interface IGameLoopWorkerInput {
  currentPopulation: number;
  currentPopGrowthRate: number;
  // happinessProvidedByBuildings: number;
  allWorkers: Workers;
  multipliers: Multipliers;
  currentGold: number;
  currentConcrete: number;
  currentMetals: number;
  currentCrystals: number;
  currentDiesel: number;
  needsCatchUp: boolean;
  activeEffect: effectClass | null;
}

// export interface OldGameState {
//   oldPopulation: number;
//   oldPopGrowthRate: number;
//   oldGold: number;
//   oldConcrete: number;
//   oldMetals: number;
//   oldCrystals: number;
//   oldDiesel: number;
// }
