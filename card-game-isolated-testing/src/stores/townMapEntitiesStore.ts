// src/store/index.ts
import { create } from "zustand";
import BuildingCard from "../classes/buildingClass_V2";
import RegCard from "../classes/regClass_V2";
import { BuildingSpot, RegSpot, TownMapEntitiesData } from "../types";

interface TownMapState {
  mapEntities: TownMapEntitiesData;
  addEntity: (card: BuildingCard | RegCard) => void;
  removeEntity: (card: BuildingCard | RegCard) => void;
  removeAllEntities: () => void;
  removeAllBuildings: () => void;
  removeAllREGs: () => void;
}

// This store manages the activated cards that are displyed on the Town Map.

export const useTownMapStore = create<TownMapState>((set) => ({
  mapEntities: {
    0: null, // BuildingSpot
    1: null, // RegSpot
    2: null, // BuildingSpot
    3: null, // RegSpot
    4: null, // BuildingSpot
    5: null, // BuildingSpot
    6: null, // BuildingSpot
    7: null, // BuildingSpot
    8: null, // RegSpot
    9: null, // BuildingSpot
    10: null, // RegSpot
    11: null, // RegSpot
    12: null, // BuildingSpot
    13: null, // RegSpot
  }, // ✨ The Initial State comes from the Server/DB

  addEntity: (card: BuildingCard | RegCard) =>
    set((state) => ({
      ...state,
      mapEntities: {
        ...state.mapEntities,
        [card.spot as BuildingSpot | RegSpot]: card,
      },
    })),
  removeEntity: (card: BuildingCard | RegCard) => {
    console.log(`Removing ${card} from Spot: ${card.spot}`);
    return set((state) => ({
      ...state,
      mapEntities: {
        ...state.mapEntities,
        [card.spot as BuildingSpot | RegSpot]: null,
      },
    }));
  },
  removeAllBuildings: () =>
    set((state) => ({
      ...state,
      mapEntities: {
        ...state.mapEntities,
        0: null,
        2: null,
        4: null,
        5: null,
        6: null,
        7: null,
        9: null,
        12: null,
      },
    })),
  removeAllREGs: () =>
    set((state) => ({
      ...state,
      mapEntities: {
        ...state.mapEntities,
        1: null,
        3: null,
        8: null,
        10: null,
        11: null,
        13: null,
      },
    })),
  removeAllEntities: () =>
    set((state) => ({
      ...state,
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
      },
    })),
}));

// function getSpot(card: BuildingCard | RegCard): CardSpot {
//   return card.spot;
// }
