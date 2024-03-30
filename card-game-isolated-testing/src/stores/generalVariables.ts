// src/store/index.ts
import { create } from "zustand";

interface GeneralVariablesState {
  shouldRefecthInvCards: boolean;
  ratesResourcesToggler: boolean;
  setRatesResourcesToggler: (value: boolean) => void;
  setShouldRefecthInvCards: (value: boolean) => void;
}

// This store manages the activated cards that are displyed on the Town Map.

export const useGeneralVariablesStore = create<GeneralVariablesState>(
  (set) => ({
    shouldRefecthInvCards: false,
    ratesResourcesToggler: false,

    setRatesResourcesToggler: (value: boolean) =>
      set({ ratesResourcesToggler: value }),
    setShouldRefecthInvCards: (value: boolean) =>
      set({ shouldRefecthInvCards: value }),
  })
);

// function getSpot(card: BuildingCard | RegCard): CardSpot
