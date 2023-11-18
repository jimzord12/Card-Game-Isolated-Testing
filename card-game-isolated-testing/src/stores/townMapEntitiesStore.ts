// src/store/index.ts
import { create } from "zustand";
import BuildingCard from "../classes/buildingClass_V2";
import RegCard from "../classes/regClass_V2";
import { TownMapEntitiesData } from "../types";

interface TownMapState {
  mapEntities: TownMapEntitiesData;
  addEntity: (card: BuildingCard | RegCard) => void;
  removeEntity: (card: BuildingCard | RegCard) => void;
}

export const useTownMapStore = create<TownMapState>((set) => ({
  mapEntities: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
    13: null,
  }, // ✨ The Initial State comes from the Server/DB

  addEntity: (card: BuildingCard | RegCard) =>
    set((state) => ({
      ...state,
      mapEntities: {
        ...state.mapEntities,
        [card.spot]: card,
      },
    })),
  removeEntity: (card: BuildingCard | RegCard) =>
    set((state) => ({
      ...state,
      mapEntities: {
        ...state.mapEntities,
        [card.spot]: null,
      },
    })),
}));

// function getSpot(card: BuildingCard | RegCard): CardSpot {
//   return card.spot;
// }
