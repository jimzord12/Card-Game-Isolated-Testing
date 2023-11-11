import { RegName, RegTemplateId, TemplateDataReg } from "../../types";
import { devModeCardUrls, prodModeCardUrls } from "../cards/cardImageUrls";

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
    citizens: 0,
    dieselBarrels: 0,
  },
  baseOutput: {
    energy: 0.1,
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
    citizens: 0,
    dieselBarrels: 0,
  },
  baseOutput: {
    energy: 0.25,
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
    citizens: 0,
    dieselBarrels: 0,
  },
  baseOutput: {
    energy: 0.25,
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
    citizens: 0,
    dieselBarrels: 0,
  },
  baseOutput: {
    energy: 0.25,
  },
  desc,
};

const templateIdToTemplateDataREG: Record<RegTemplateId, TemplateDataReg> = {
  201: simpleWindTurbineTemplate,
  202: superWindTurbineTemplate,
  203: simpleSolarPaneTemplate,
  204: superSolarPanelTemplate,
};

const nameToTemplateDataREG: Record<RegName, TemplateDataReg> = {
  SimpleWindTurbine: simpleWindTurbineTemplate,
  SuperWindTurbine: superWindTurbineTemplate,
  SimpleSolarPanel: simpleSolarPaneTemplate,
  SuperSolarPanel: superSolarPanelTemplate,
};

export { nameToTemplateDataREG, templateIdToTemplateDataREG };
