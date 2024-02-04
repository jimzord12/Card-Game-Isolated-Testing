import { create } from "zustand";
import { Level } from "../types";
import { IPlayerDB } from "../types/PlayerTypes/Player";
import { effectClass } from "../classes";

type GameVarsState = {
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

  // Energy
  energyProduced: number;
  energyConsumed: number;
  energyRemaining: number;

  // Ecomnomy
  // TODO: Add Special Effect, and create Types for it
  // To see if an Effact is active, we check if the effect's state is true
  // TODO: Create Game Initialiazation. This will be called when the Game Compoenent is mounted.
  activeEffect: effectClass | null;

  setPlayer: (player: IPlayerDB) => void;
  updatePlayerData: (playerData: Partial<IPlayerDB>) => void;
  // setTotalPop: (totalPop: number) => void;
  setHappiness: (fn: number | ((currentHappiness: number) => number)) => void;
  setTownhallLevel: (fn: Level | ((currentTHLevel: Level) => Level)) => void;
  setFactoryLevel: (
    fn: Level | ((currentFactoryLevel: Level) => Level)
  ) => void;
  setActiveEffect: (effect: effectClass) => void;
  setExpences: (expences: number) => void;
  setEnergyProduced: (energyProduced: number) => void;
  setEnergyConsumed: (energyConsumed: number) => void;
  setEnergyRemaining: (energy: number) => void;
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

  // Energy
  energyProduced: 0,
  energyConsumed: 0,
  energyRemaining: 0,

  activeEffect: null,

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
  setActiveEffect: (effect: effectClass) => set({ activeEffect: effect }),

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
}));
