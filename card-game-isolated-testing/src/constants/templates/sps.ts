import { TemplateDataSP, SPTemplateId } from "../../types";

const goldSPTemplate: TemplateDataSP = {
  id: 301,
  name: "WallStreet",
  type: "sp",
  baseOutput: { boost: 0.25 },
  baseRequirements: {
    gold: 500,
    concrete: 650,
    metals: 780,
    crystals: 260,
    citizens: 10,
    dieselBarrels: 0,
  },
  desc: "Enchances Gold Income",
};

const growthSPTemplate: TemplateDataSP = {
  id: 302,
  name: "LoveApp",
  type: "sp",
  baseOutput: { boost: 0.25 },
  baseRequirements: {
    gold: 500,
    concrete: 650,
    metals: 780,
    crystals: 260,
    citizens: 10,
    dieselBarrels: 0,
  },
  desc: "Enchances Gold Income",
};

const resourcesSPTemplate: TemplateDataSP = {
  id: 303,
  name: "SuperStrong",
  type: "sp",
  baseOutput: { boost: 0.25 },
  baseRequirements: {
    gold: 500,
    concrete: 650,
    metals: 780,
    crystals: 260,
    citizens: 10,
    dieselBarrels: 0,
  },
  desc: "Enchances Gold Income",
};

const templateDataSP: Record<SPTemplateId, TemplateDataSP> = {
  301: goldSPTemplate,
  302: growthSPTemplate,
  303: resourcesSPTemplate,
};

export { templateDataSP };
