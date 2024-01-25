import { BuildingStats, OneToFive } from "..";

export type CardSpot =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13;
export type CardType = "building" | "reg" | "sp";
export type CardLevel = OneToFive;
export type CardRarity = OneToFive;
export type CardRarityString =
  | "Common"
  | "Special"
  | "Rare"
  | "Mythic"
  | "Legendary";
export type MySQLBoolean = boolean | 0 | 1;
export type CardRequirements = {
  gold: number;
  concrete: number;
  crystals: number;
  metals: number;
  dieselBarrels: number;
  citizens: number;
};

export interface CardData {
  id: number;
  templateId: number;
  spot: CardSpot;
  level: CardLevel;
  ownerId: number;
  in_mp: MySQLBoolean;
  state: MySQLBoolean;
  priceTag: number | null;
  rarity: CardRarity;
  creationTime: string;
  creator: string;
  endDate?: string;
  // usedFrom?: any; // Replace 'any' with a more specific type if possible
  stats?: BuildingStats; // ✨ This is only for the ToolStore Building Card
}

export interface CardNoShadowUrl {
  buildings: {
    AmusementPark: string;
    ToolStore: string;
    Hospital: string;
    RadioStation: string;
  };
  reg: {
    SimpleWindTurbine: string;
    SimpleSolarPanel: string;
    SuperWindTurbine: string;
    SuperSolarPanel: string;
  };
  sps: {
    WallStreet: string;
    LoveApp: string;
    SuperStrong: string;
  };
}

export interface CardWithShadowUrl {
  buildings: {
    AmusementPark: string;
    ToolStore: string;
    Hospital: string;
    RadioStation: string;
  };
  reg: {
    SimpleWindTurbine: string;
    SimpleSolarPanel: string;
    SuperWindTurbine: string;
    SuperSolarPanel: string;
  };
}

export interface ICardDB {
  id: number;
  templateId: number;
  level: number;
  ownerId: number;
  in_mp: null | number; // Replace 'any' with the actual type if known
  priceTag: null | number; // Replace 'any' with the actual type if known
  state: null | number;
  locked: null | number;
  town_id: null | number; // Replace 'any' with the actual type if known
  rarity: null | number;
  disabled: null | number; // Replace 'any' with the actual type if known
  creationTime: string;
  creator: string;
  endDate: null | string;
  stats?: ICardStatsDB;
  on_map_spot?: null | number;
}

export interface ICardStatsDB {
  id: number;
  cardId: number;
  gold: number | null;
  concrete: number | null;
  metals: number | null;
  crystals: number | null;
  population: number | null;
  energy: number | null;
  rank: number | null;
  expenses: number | null;
  endDate: string | null;
}
