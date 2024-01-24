import { defaultBuildings } from "../../constants/game/gameConfig";
import { DefaultBuildingName } from "../CardTypes/DefaultBuildingTypes";

export function isDefaultBuildingName(
  buildingName: string
): buildingName is DefaultBuildingName {
  return defaultBuildings.includes(buildingName as DefaultBuildingName);
}
