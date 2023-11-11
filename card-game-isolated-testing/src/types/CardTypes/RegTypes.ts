import { CardData, CardRequirements } from "..";

export type RegSpot = 0 | 1 | 3 | 8 | 10 | 11 | 13;
export type RegTemplateId = 201 | 202 | 203 | 204;
export type RegMaintenance = { gold: number };
export type RegOutput = { energy: number };
export type RegName =
  | "SimpleWindTurbine"
  | "SimpleSolarPanel"
  | "SuperWindTurbine"
  | "SuperSolarPanel";

export interface RegCardData extends Omit<CardData, "spot" | "templateId"> {
  spot: RegSpot;
  templateId: RegTemplateId;
}

export interface TemplateDataReg {
  id: RegTemplateId;
  type: "reg";
  image: string;
  name: RegName;
  baseOutput: RegOutput;
  baseMaintenance: RegMaintenance;
  baseRequirements: CardRequirements;
  desc: string;
}
