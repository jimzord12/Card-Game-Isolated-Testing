// src/store/index.ts
import { create } from "zustand";

interface GeneralVariablesState {
  ratesResourcesToggler: boolean;
  setRatesResourcesToggler: (value: boolean) => void;
}

// This store manages the activated cards that are displyed on the Town Map.

export const useGeneralVariablesStore = create<GeneralVariablesState>(
  (set) => ({
    ratesResourcesToggler: false,

    setRatesResourcesToggler: (value: boolean) =>
      set({ ratesResourcesToggler: value }),
  })
);

// function getSpot(card: BuildingCard | RegCard): CardSpot
