// src/store/index.ts
import { create } from "zustand";
import { CardClass } from "../types";

interface GeneralVariablesState {
  isNewPlayer: boolean;
  shouldRefecthInvCards: boolean;
  ratesResourcesToggler: boolean;
  freshlyCraftedCard: CardClass | null;
  isMusicPaused: boolean;
  setIsNewPlayer: (value: boolean) => void;
  setRatesResourcesToggler: (value: boolean) => void;
  setShouldRefecthInvCards: (value: boolean) => void;
  setFreshlyCraftedCard: (value: CardClass) => void;
  setIsMusicPaused: (value: boolean) => void;
}

// This store manages the activated cards that are displyed on the Town Map.

export const useGeneralVariablesStore = create<GeneralVariablesState>(
  (set) => ({
    isNewPlayer: false,
    shouldRefecthInvCards: false,
    ratesResourcesToggler: false,
    freshlyCraftedCard: null,
    isMusicPaused: false,

    setIsNewPlayer: (value: boolean) => set({ isNewPlayer: value }),
    setIsMusicPaused: (value: boolean) => set({ isMusicPaused: value }),
    setRatesResourcesToggler: (value: boolean) =>
      set({ ratesResourcesToggler: value }),
    setShouldRefecthInvCards: (value: boolean) =>
      set({ shouldRefecthInvCards: value }),
    setFreshlyCraftedCard: (value: CardClass) =>
      set({ freshlyCraftedCard: value }),
  })
);

// function getSpot(card: BuildingCard | RegCard): CardSpot
