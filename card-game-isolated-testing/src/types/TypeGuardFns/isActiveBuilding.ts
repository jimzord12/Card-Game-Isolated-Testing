import { ActiveBuildings } from "../CardTypes/BuildingTypes";

export function isActiveBuilding(building: string): building is ActiveBuildings {
    return building === "ToolStore" || building === "Hospital";
}