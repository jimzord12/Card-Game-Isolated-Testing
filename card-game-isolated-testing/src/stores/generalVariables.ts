// src/store/index.ts
import { create } from "zustand";

interface GeneralVariablesState {
  isNewPlayer: boolean;
  shouldRefecthInvCards: boolean;
  ratesResourcesToggler: boolean;
  setIsNewPlayer: (value: boolean) => void;
  setRatesResourcesToggler: (value: boolean) => void;
  setShouldRefecthInvCards: (value: boolean) => void;
}

// This store manages the activated cards that are displyed on the Town Map.

export const useGeneralVariablesStore = create<GeneralVariablesState>(
  (set) => ({
    isNewPlayer: false,
    shouldRefecthInvCards: false,
    ratesResourcesToggler: false,

    setIsNewPlayer: (value: boolean) => set({ isNewPlayer: value }),
    setRatesResourcesToggler: (value: boolean) =>
      set({ ratesResourcesToggler: value }),
    setShouldRefecthInvCards: (value: boolean) =>
      set({ shouldRefecthInvCards: value }),
  })
);

// function getSpot(card: BuildingCard | RegCard): CardSpot
