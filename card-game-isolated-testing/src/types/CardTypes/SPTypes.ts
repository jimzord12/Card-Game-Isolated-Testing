import { CardData, CardRequirements } from "..";

export type SPOutput = { boost: number };
export type SPTemplateId = 301 | 302 | 303 | 7;
export type SPName = "WallStreet" | "LoveApp" | "SuperStrong";

export interface SPCardData
  extends Omit<CardData, "spot" | "templateId" | "level"> {
  templateId: SPTemplateId;
  disabled: boolean;
}

export interface SPCardDataForNewCard extends Omit<SPCardData, "id"> {}

export interface TemplateDataSP {
  id: SPTemplateId;
  type: "sp";
  image: string;
  name: SPName;
  baseOutput: SPOutput;
  baseRequirements: CardRequirements;
  desc: string;
}
