import { CardData, CardRequirements } from "..";
import BuildingCard from "../../classes/buildingClass_V2";

export type BuildingSpot = 0 | 2 | 4 | 5 | 6 | 7 | 9 | 12;
export type BuildingMaintenance = { energy: number };
export type BuildingOutput = { boost: number };
export type BuildingTemplateId = 101 | 102 | 103 | 104 | 13;
export type BuildingName =
  | "ToolStore"
  | "AmusementPark"
  | "Hospital"
  | "RadioStation";

export type ActiveBuildings = "ToolStore" | "Hopsital";
export type PassiveBuildings = "AmusementPark" | "RadioStation";

export interface BuildingCardData
  extends Omit<CardData, "spot" | "templateId"> {
  spot: BuildingSpot;
  templateId: BuildingTemplateId;
}

export type BuildingStats = {
  // ✨ This Type is only for the ToolStore Building Card
  gold: number;
  concrete: number;
  crystals: number;
  metals: number;
  // diesel: number;
};

export interface ToolStoreType extends BuildingCard {
  stats: BuildingStats;
}

export interface TemplateDataBuilding {
  id: BuildingTemplateId;
  name: BuildingName;
  type: "building";
  image: string;
  baseOutput: BuildingOutput;
  baseMaintenance: BuildingMaintenance;
  baseRequirements: CardRequirements;
  baseStats?: BuildingStats;
  desc: string;
}
