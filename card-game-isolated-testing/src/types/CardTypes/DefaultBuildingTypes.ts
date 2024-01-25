import { OneToFive } from "../index";

export type DefaultBuildingName = "townhall" | "factory";
export type DefaultBuildingLevel = OneToFive;

export interface DefaultBuildings {
  name: DefaultBuildingName;
  level: DefaultBuildingLevel;
}
