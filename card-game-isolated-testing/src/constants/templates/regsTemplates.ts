import { RegName, RegSpot, RegTemplateId, TemplateDataReg } from "../../types";
import {
  devModeCardUrls,
  prodModeCardUrls,
} from "../cards/cardImageUrls/noShadow";

const isProduction = import.meta.env.MODE === "production";

const desc = "Produces Energy";

const simpleWindTurbineTemplate: TemplateDataReg = {
  id: 201,
  name: "SimpleWindTurbine",
  type: "reg",
  image: isProduction
    ? prodModeCardUrls.reg.SimpleWindTurbine
    : devModeCardUrls.reg.SimpleWindTurbine,
  baseMaintenance: {
    gold: 30,
  },
  baseRequirements: {
    gold: 500,
    concrete: 650,
    metals: 780,
    crystals: 260,
    population: 0,
    diesel: 0,
  },
  baseOutput: {
    energy: 400,
  },
  desc,
};

const superWindTurbineTemplate: TemplateDataReg = {
  id: 202,
  name: "SuperWindTurbine",
  type: "reg",
  image: isProduction
    ? prodModeCardUrls.reg.SuperWindTurbine
    : devModeCardUrls.reg.SuperWindTurbine,
  baseMaintenance: {
    gold: 300,
  },
  baseRequirements: {
    gold: 500,
    concrete: 650,
    metals: 780,
    crystals: 260,
    population: 0,
    diesel: 0,
  },
  baseOutput: {
    energy: 600,
  },
  desc,
};

const simpleSolarPaneTemplate: TemplateDataReg = {
  id: 203,
  name: "SimpleSolarPanel",
  type: "reg",
  image: isProduction
    ? prodModeCardUrls.reg.SimpleSolarPanel
    : devModeCardUrls.reg.SimpleSolarPanel,
  baseMaintenance: {
    gold: 800,
  },
  baseRequirements: {
    gold: 500,
    concrete: 650,
    metals: 780,
    crystals: 260,
    population: 0,
    diesel: 0,
  },
  baseOutput: {
    energy: 500,
  },
  desc,
};

const superSolarPanelTemplate: TemplateDataReg = {
  id: 204,
  name: "SuperSolarPanel",
  type: "reg",
  image: isProduction
    ? prodModeCardUrls.reg.SuperSolarPanel
    : devModeCardUrls.reg.SuperSolarPanel,
  baseMaintenance: {
    gold: 800,
  },
  baseRequirements: {
    gold: 500,
    concrete: 650,
    metals: 780,
    crystals: 260,
    population: 0,
    diesel: 0,
  },
  baseOutput: {
    energy: 700,
  },
  desc,
};

export const regSpots: RegSpot[] = [0, 1, 3, 8, 10, 11, 13];
export const regTemplateIds: number[] = [201, 202, 203, 204];
export const regNames: string[] = [
  "SuperWindTurbine",
  "SimpleWindTurbine",
  "SimpleSolarPanel",
  "SuperSolarPanel",
];

const templateIdToTemplateDataREG: Record<RegTemplateId, TemplateDataReg> = {
  201: simpleWindTurbineTemplate,
  202: superWindTurbineTemplate,
  203: simpleSolarPaneTemplate,
  204: superSolarPanelTemplate,
  1: simpleWindTurbineTemplate,
};

const nameToTemplateDataREG: Record<RegName, TemplateDataReg> = {
  SimpleWindTurbine: simpleWindTurbineTemplate,
  SuperWindTurbine: superWindTurbineTemplate,
  SimpleSolarPanel: simpleSolarPaneTemplate,
  SuperSolarPanel: superSolarPanelTemplate,
};

export { nameToTemplateDataREG, templateIdToTemplateDataREG };
