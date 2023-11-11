import {
  BuildingName,
  BuildingTemplateId,
  TemplateDataBuilding,
} from "../../types";
import {
  devModeCardUrls,
  prodModeCardUrls,
} from "../cards/cardImageUrls/noShadow";

const isProduction = import.meta.env.MODE === "production";

const toolStoreTemplate: TemplateDataBuilding = {
  id: 101,
  name: "ToolStore",
  type: "building",

  image: isProduction
    ? prodModeCardUrls.buildings.ToolStore
    : devModeCardUrls.buildings.ToolStore,
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
  image: isProduction
    ? prodModeCardUrls.buildings.AmusementPark
    : devModeCardUrls.buildings.AmusementPark,
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
  name: "Hospital",
  type: "building",
  image: isProduction
    ? prodModeCardUrls.buildings.Hospital
    : devModeCardUrls.buildings.Hospital,
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
  image: isProduction
    ? prodModeCardUrls.buildings.RadioStation
    : devModeCardUrls.buildings.RadioStation,
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

const templateIdToTemplateDataBuilding: Record<
  BuildingTemplateId,
  TemplateDataBuilding
> = {
  101: amusementParkTemplate,
  102: hopsitalTemplate,
  103: radioStationTemplate,
  104: toolStoreTemplate,
};

const nameToTemplateDataBuilding: Record<BuildingName, TemplateDataBuilding> = {
  AmusementPark: amusementParkTemplate,
  Hospital: hopsitalTemplate,
  RadioStation: radioStationTemplate,
  ToolStore: toolStoreTemplate,
};

export { nameToTemplateDataBuilding, templateIdToTemplateDataBuilding };
