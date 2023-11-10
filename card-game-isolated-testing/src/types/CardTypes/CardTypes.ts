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
