import { create } from "zustand";
import { Level } from "../types";
import { IPlayerDB } from "../types/PlayerTypes/Player";
import { effectClass } from "../classes";
import { Multipliers, Workers } from "../types/GameLoopTypes/GameLoopTypes";

export type GameVarsState = {
  player: IPlayerDB | null;
  townhallLevel: Level;
  factoryLevel: Level;
  happiness: number;
  expences: number; // In Old Code is Maintanance

  // Rates
  popGrowRate: number;
  goldGathRate: number;
  concreteGathRate: number;
  metalsGathRate: number;
  crystalsGathRate: number;
  dieselGathRate: number;

  // Multipliers (only from ToolStore)
  multipliers: Multipliers;

  // Energy
  energyProduced: number;
  energyConsumed: number;
  energyRemaining: number;

  // Workers
  allWorkers: Workers;

  // Ecomnomy
  // TODO: Add Special Effect, and create Types for it
  // To see if an Effact is active, we check if the effect's state is true
  // TODO: Create Game Initialiazation. This will be called when the Game Compoenent is mounted.
  activeEffect: effectClass | null;
  effectBoost: number | null;

  setPlayer: (player: IPlayerDB) => void;
  updatePlayerData: (playerData: Partial<IPlayerDB>) => void;
  // setTotalPop: (totalPop: number) => void;
  setHappiness: (fn: number | ((currentHappiness: number) => number)) => void;

  // Default Buildings
  setTownhallLevel: (fn: Level | ((currentTHLevel: Level) => Level)) => void;
  setFactoryLevel: (
    fn: Level | ((currentFactoryLevel: Level) => Level)
  ) => void;

  // Economy
  setExpences: (expences: number) => void;

  // Workers
  setAllWorkers: (workers: Workers) => void;

  // Multipliers
  setMultipliers: (multipliers: Multipliers) => void;

  // Energy
  setEnergyProduced: (energyProduced: number) => void;
  setEnergyConsumed: (energyConsumed: number) => void;
  setEnergyRemaining: (energy: number) => void;

  // Effects
  setActiveEffect: (effect: effectClass) => void;
  setEffectboost: (boost: number) => void;
  removeEffectBoost: () => void;
};

// This store manages the global game variables.
// TODO: Manage workers and resources here too.

export const useGameVarsStore = create<GameVarsState>((set /*, get */) => ({
  player: null,
  townhallLevel: 1,
  factoryLevel: 1,
  happiness: 25,
  expences: 0,

  // Rates
  popGrowRate: 0,
  goldGathRate: 0,
  concreteGathRate: 0,
  metalsGathRate: 0,
  crystalsGathRate: 0,
  dieselGathRate: 0,

  // Workers
  allWorkers: {
    privateSector: 0,
    concreteWorkers: 0,
    metalsWorkers: 0,
    crystalsWorkers: 0,
    dieselWorkers: 0,
    hospitalWorkers: 0,
  },

  // Multipliers
  multipliers: {
    goldMultiplier: 1,
    concreteMultiplier: 1,
    metalsMultiplier: 1,
    crystalsMultiplier: 1,
  },

  // Energy
  energyProduced: 0,
  energyConsumed: 0,
  energyRemaining: 0,

  // Effects
  activeEffect: null,
  effectBoost: null,

  // Setters
  setPlayer: (player: IPlayerDB) => set({ player }),
  updatePlayerData: (playerData: Partial<IPlayerDB>) =>
    set((state) => ({
      player: state.player ? { ...state.player, ...playerData } : null,
    })),
  setExpences: (expences: number) => set({ expences }),
  setHappiness: (fn: number | ((currentHappiness: number) => number)) =>
    set((state) => ({
      happiness: typeof fn === "function" ? fn(state.happiness) : fn,
    })),
  setTownhallLevel: (fn: Level | ((currentTHLevel: Level) => Level)) =>
    set((state) => ({
      townhallLevel: typeof fn === "function" ? fn(state.townhallLevel) : fn,
    })),
  setFactoryLevel: (fn: Level | ((currentFactoryLevel: Level) => Level)) => {
    set((state) => ({
      factoryLevel: typeof fn === "function" ? fn(state.factoryLevel) : fn,
    }));
  },

  setPopGrowRate: (rate: number) => set({ popGrowRate: rate }),
  setGoldGathRate: (rate: number) => set({ goldGathRate: rate }),
  setConcreteGathRate: (rate: number) => set({ concreteGathRate: rate }),
  setMetalsGathRate: (rate: number) => set({ metalsGathRate: rate }),
  setCrystalsGathRate: (rate: number) => set({ crystalsGathRate: rate }),
  setDieselGathRate: (rate: number) => set({ dieselGathRate: rate }),

  // Energy
  setEnergyProduced: (energyProduced: number) =>
    set((state) => ({
      energyProduced: energyProduced,
      energyRemaining: state.energyProduced - state.energyConsumed,
    })),
  setEnergyConsumed: (energyConsumed: number) =>
    set((state) => ({
      energyConsumed: energyConsumed,
      energyRemaining: state.energyProduced - state.energyConsumed,
    })),
  setEnergyRemaining: (energy: number) => set({ energyRemaining: energy }),

  // Effects
  // setActiveEffect: (effect: effectClass) => set({ activeEffect: effect }),
  setActiveEffect: (effect: effectClass) => {
    set((state) => {
      // Check if effectBoost is not null and apply it to the new effect
      if (state.effectBoost !== null) {
        // Assuming effectClass can take a third parameter for the boost
        const updatedEffect = new effectClass(
          effect.originatesFrom,
          effect.expiresAtUnix,
          state.effectBoost // Pass the existing effectBoost to the constructor
        );
        return {
          ...state,
          activeEffect: updatedEffect,
          // Optionally reset effectBoost if required, or leave it to maintain the boost value
        };
      } else {
        // If effectBoost is null, just set the effect without modification
        return {
          ...state,
          activeEffect: effect,
        };
      }
    });
  },

  setEffectboost: (boostFromBuilding: number) => {
    set((state) => {
      if (state.activeEffect !== null) {
        // Create a new effect object with the updated boost value
        // This avoids directly mutating the state
        const updatedEffect = new effectClass(
          state.activeEffect.originatesFrom,
          state.activeEffect.expiresAtUnix,
          boostFromBuilding
        );

        // Return the new state with the updated effect and effectboost
        return {
          ...state,
          activeEffect: updatedEffect,
          effectBoost: boostFromBuilding,
        };
      } else {
        // If there is no active effect, just update the effectboost
        return { ...state, effectBoost: boostFromBuilding };
      }
    });
  },

  removeEffectBoost: () =>
    set((state) => {
      // If there is an activeEffect, update it by creating a new effect instance
      // without an additional boost. This assumes the effectClass constructor
      // defaults to a base boost value if the third parameter is omitted or handles it gracefully.
      const updatedEffect = state.activeEffect
        ? new effectClass(
            state.activeEffect.originatesFrom,
            state.activeEffect.expiresAtUnix
            // No need to pass the third parameter if we're removing the boost effect
          )
        : state.activeEffect;

      // Return the updated state with effectBoost set to null
      // and activeEffect updated if it was previously set.
      return {
        ...state,
        activeEffect: updatedEffect,
        effectBoost: null,
      };
    }),

  setAllWorkers: (workers: Workers) => set({ allWorkers: workers }),
  setMultipliers: (multipliers: Multipliers) => set({ multipliers }),
}));
