import { OneToFive } from ".";

export type DefaultBuildingName = "TownHall" | "DieselFactory";
export type DefaultBuildingLevel = OneToFive;

export interface DefaultBuildings {
  name: DefaultBuildingName;
  level: DefaultBuildingLevel;
}
