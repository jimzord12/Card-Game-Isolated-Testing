import { SPName, SPTemplateId, TemplateDataSP } from "../../types";
import {
  devModeCardUrls,
  prodModeCardUrls,
} from "../cards/cardImageUrls/noShadow";

const isProduction = import.meta.env.MODE === "production";

const goldSPTemplate: TemplateDataSP = {
  id: 301,
  name: "WallStreet",
  type: "sp",
  image: isProduction
    ? prodModeCardUrls.sps.WallStreet
    : devModeCardUrls.sps.WallStreet,
  baseOutput: { boost: 0.25 },
  baseRequirements: {
    gold: 500,
    concrete: 650,
    metals: 780,
    crystals: 260,
    population: 10,
    diesel: 0,
  },
  desc: "Enchances Gold Income",
};

const growthSPTemplate: TemplateDataSP = {
  id: 302,
  name: "LoveApp",
  type: "sp",
  image: isProduction
    ? prodModeCardUrls.sps.LoveApp
    : devModeCardUrls.sps.LoveApp,
  baseOutput: { boost: 0.25 },
  baseRequirements: {
    gold: 500,
    concrete: 650,
    metals: 780,
    crystals: 260,
    population: 10,
    diesel: 0,
  },
  desc: "Enchances Population Growth",
};

const resourcesSPTemplate: TemplateDataSP = {
  id: 303,
  name: "SuperStrong",
  type: "sp",
  image: isProduction
    ? prodModeCardUrls.sps.SuperStrong
    : devModeCardUrls.sps.SuperStrong,
  baseOutput: { boost: 0.25 },
  baseRequirements: {
    gold: 500,
    concrete: 650,
    metals: 780,
    crystals: 260,
    population: 10,
    diesel: 0,
  },
  desc: "Enchances Resource Gathering",
};

const templateIdToTemplateDataSP: Record<SPTemplateId, TemplateDataSP> = {
  301: goldSPTemplate,
  302: growthSPTemplate,
  303: resourcesSPTemplate,
};

export const spTemplateIds: number[] = [301, 302, 303];
export const spNames: string[] = ["WallStreet", "LoveApp", "SuperStrong"];

const nameToTemplateDataSP: Record<SPName, TemplateDataSP> = {
  WallStreet: goldSPTemplate,
  LoveApp: growthSPTemplate,
  SuperStrong: resourcesSPTemplate,
};

export { nameToTemplateDataSP, templateIdToTemplateDataSP };
