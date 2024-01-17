import { create } from "zustand";
import { Level } from "../types";
import { IPlayerDB } from "../types/PlayerTypes/Player";

type GameVarsState = {
  player: IPlayerDB | null;
  townhallLevel: Level;
  happiness: number;
  totalPop: number;
  setPlayer: (player: IPlayerDB) => void;
  setTotalPop: (totalPop: number) => void;
  setHappiness: (fn: number | ((currentHappiness: number) => number)) => void;
  setTownhallLevel: (fn: Level | ((currentTHLevel: Level) => Level)) => void;
};

// This store manages the global game variables.
// TODO: Manage workers and resources here too.

export const useGameVarsStore = create<GameVarsState>((set /*, get */) => ({
  player: null,
  townhallLevel: 1,
  happiness: 25,
  totalPop: 100,
  setPlayer: (player: IPlayerDB) => set({ player }),
  setTotalPop: (totalPop: number) => set({ totalPop }),
  setHappiness: (fn: number | ((currentHappiness: number) => number)) =>
    set((state) => ({
      happiness: typeof fn === "function" ? fn(state.happiness) : fn,
    })),
  setTownhallLevel: (fn: Level | ((currentTHLevel: Level) => Level)) =>
    set((state) => ({
      townhallLevel: typeof fn === "function" ? fn(state.townhallLevel) : fn,
    })),
}));
