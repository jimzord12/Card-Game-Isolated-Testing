import { create } from "zustand";
import { Level } from "../types";

type GameVarsState = {
  townhallLevel: Level;
  happiness: number;
  totalPop: number;
  setTotalPop: (totalPop: number) => void;
  setHappiness: (fn: number | ((currentHappiness: number) => number)) => void;
  setTownhallLevel: (fn: Level | ((currentTHLevel: Level) => Level)) => void;
};

export const useGameVarsStore = create<GameVarsState>((set /*, get */) => ({
  townhallLevel: 1,
  happiness: 25,
  totalPop: 100,
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
