import { CardData, CardRequirements } from ".";

export type SPOutput = { boost: number };
export type SPTemplateId = 301 | 302 | 303;
export type SPName = "WallStreet" | "LoveApp" | "SuperStrong";

export interface SPCardData
  extends Omit<CardData, "spot" | "templateId" | "level"> {
  templateId: SPTemplateId;
}

export interface TemplateDataSP {
  id: SPTemplateId;
  type: "sp";
  name: SPName;
  baseOutput: SPOutput;
  baseRequirements: CardRequirements;
  desc: string;
}
