import { create } from "zustand";
import { Level } from "../types";
import { IPlayerDB } from "../types/PlayerTypes/Player";

type GameVarsState = {
  player: IPlayerDB | null;
  townhallLevel: Level;
  factoryLevel: Level;
  happiness: number;
  // totalPop: number;
  energyProduced: number;
  energyConsumed: number;
  energy: number;
  expences: number; // In Old Code is Maintanance
  // TODO: Add Special Effect, and create Types for it
  // To see if an Effact is active, we check if the effect's state is true
  // TODO: Create Game Initialiazation. This will be called when the Game Compoenent is mounted.
  setPlayer: (player: IPlayerDB) => void;
  updatePlayerData: (playerData: Partial<IPlayerDB>) => void;
  // setTotalPop: (totalPop: number) => void;
  setHappiness: (fn: number | ((currentHappiness: number) => number)) => void;
  setTownhallLevel: (fn: Level | ((currentTHLevel: Level) => Level)) => void;
  setFactoryLevel: (
    fn: Level | ((currentFactoryLevel: Level) => Level)
  ) => void;
};

// This store manages the global game variables.
// TODO: Manage workers and resources here too.

export const useGameVarsStore = create<GameVarsState>((set /*, get */) => ({
  player: null,
  townhallLevel: 1,
  factoryLevel: 1,
  happiness: 25,
  // totalPop: 100,
  energyProduced: 0,
  energyConsumed: 0,
  energy: 0,
  expences: 0,
  setPlayer: (player: IPlayerDB) => set({ player }),
  updatePlayerData: (playerData: Partial<IPlayerDB>) =>
    set((state) => ({
      player: state.player ? { ...state.player, ...playerData } : null,
    })),
  // setTotalPop: (totalPop: number) => set({ totalPop }),
  setEnergyProduced: (energyProduced: number) =>
    set((state) => ({
      energyProduced: energyProduced,
      energy: state.energyProduced - state.energyConsumed,
    })),
  setEnergyConsumed: (energyConsumed: number) =>
    set((state) => ({
      energyProduced: energyConsumed,
      energy: state.energyProduced - state.energyConsumed,
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
}));
