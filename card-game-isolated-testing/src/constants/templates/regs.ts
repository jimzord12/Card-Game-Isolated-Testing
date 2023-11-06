import { TemplateDataReg, RegTemplateId } from "../../types";

const desc = "Produces Energy";

const simpleWindTurbineTemplate: TemplateDataReg = {
  id: 201,
  name: "SimpleWindTurbine",
  type: "reg",
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

const templateDataReg: Record<RegTemplateId, TemplateDataReg> = {
  201: simpleWindTurbineTemplate,
  202: superWindTurbineTemplate,
  203: simpleSolarPaneTemplate,
  204: superSolarPanelTemplate,
};

export { templateDataReg };
