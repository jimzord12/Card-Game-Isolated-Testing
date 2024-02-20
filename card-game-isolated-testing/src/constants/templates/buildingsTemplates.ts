import {
  BuildingName,
  BuildingSpot,
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
    energy: 500,
  },
  baseRequirements: {
    gold: 500,
    concrete: 650,
    metals: 780,
    crystals: 260,
    population: 0,
    diesel: 0,
  },
  baseStats: {
    gold: 0,
    concrete: 0,
    metals: 0,
    crystals: 0,
    // diesel: 0,
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
    energy: 400,
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
    energy: 600,
  },
  baseRequirements: {
    gold: 1500,
    concrete: 1650,
    metals: 1780,
    crystals: 1260,
    population: 0,
    diesel: 0,
  },
  baseOutput: {
    boost: 0.15,
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
    energy: 300,
  },
  baseRequirements: {
    gold: 750,
    concrete: 300,
    metals: 540,
    crystals: 380,
    population: 0,
    diesel: 0,
  },
  baseOutput: {
    boost: 0.23,
  },
  desc: "Enchances Special Effects",
};

const templateIdToTemplateDataBuilding: Record<
  BuildingTemplateId,
  TemplateDataBuilding
> = {
  101: toolStoreTemplate,
  102: amusementParkTemplate,
  103: hopsitalTemplate,
  104: radioStationTemplate,
  13: toolStoreTemplate,
};

export const buildingSpots: BuildingSpot[] = [0, 2, 4, 5, 6, 7, 9, 12];
export const buildingTemplateIds: number[] = [101, 102, 103, 104];
export const buildingNames: string[] = [
  "AmusementPark",
  "ToolStore",
  "Hospital",
  "RadioStation",
];

const nameToTemplateDataBuilding: Record<BuildingName, TemplateDataBuilding> = {
  AmusementPark: amusementParkTemplate,
  Hospital: hopsitalTemplate,
  RadioStation: radioStationTemplate,
  ToolStore: toolStoreTemplate,
};

export { nameToTemplateDataBuilding, templateIdToTemplateDataBuilding };
