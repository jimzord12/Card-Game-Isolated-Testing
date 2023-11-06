import { CardData, CardRequirements } from ".";

export type BuildingSpot = 0 | 2 | 4 | 5 | 6 | 7 | 9 | 12;
export type BuildingMaintenance = { energy: number };
export type BuildingOutput = { boost: number };
export type BuildingTemplateId = 101 | 102 | 103 | 104;
export type BuildingName =
  | "ToolStore"
  | "AmusementPark"
  | "Hopsital"
  | "RadioStation";

export interface BuildingCardData
  extends Omit<CardData, "spot" | "templateId"> {
  spot: BuildingSpot;
  templateId: BuildingTemplateId;
}

export type BuildingStats = {
  // This is only for the ToolStore Building Card
  gold: number;
  concrete: number;
  crystals: number;
  metals: number;
};

export interface TemplateDataBuilding {
  id: BuildingTemplateId;
  type: "building";
  name: BuildingName;
  baseOutput: BuildingOutput;
  baseMaintenance: BuildingMaintenance;
  baseRequirements: CardRequirements;
  baseStats?: BuildingStats;
  desc: string;
}
