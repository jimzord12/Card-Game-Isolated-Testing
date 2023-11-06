import { TemplateDataBuilding, BuildingTemplateId } from "../../types";

const toolStoreTemplate: TemplateDataBuilding = {
  id: 101,
  name: "ToolStore",
  type: "building",
  baseMaintenance: {
    energy: 30,
  },
  baseRequirements: {
    gold: 500,
    concrete: 650,
    metals: 780,
    crystals: 260,
    citizens: 0,
    dieselBarrels: 0,
  },
  baseStats: {
    gold: 0,
    concrete: 0,
    metals: 0,
    crystals: 0,
  },
  baseOutput: {
    boost: 0.25,
  },
  desc: "Enchances Gathering",
};

const amusementParkTemplate: TemplateDataBuilding = {
  id: 102,
  name: "AmusementPark",
  type: "building",
  baseMaintenance: {
    energy: 300,
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
    boost: 0.25,
  },
  desc: "Enchances Happiness",
};

const hopsitalTemplate: TemplateDataBuilding = {
  id: 103,
  name: "Hopsital",
  type: "building",
  baseMaintenance: {
    energy: 800,
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
    boost: 0.25,
  },
  desc: "Enchances Growth",
};

const radioStationTemplate: TemplateDataBuilding = {
  id: 104,
  name: "RadioStation",
  type: "building",
  baseMaintenance: {
    energy: 800,
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
    boost: 0.25,
  },
  desc: "Enchances Special Effects",
};

const templateDataBuilding: Record<BuildingTemplateId, TemplateDataBuilding> = {
  101: amusementParkTemplate,
  102: hopsitalTemplate,
  103: radioStationTemplate,
  104: toolStoreTemplate,
};

export { templateDataBuilding };
