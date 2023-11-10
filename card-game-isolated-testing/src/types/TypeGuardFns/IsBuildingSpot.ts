import { BuildingSpot } from "..";

export function isBuildingSpot(value: number): value is BuildingSpot {
  return [0, 2, 4, 5, 6, 7, 9, 12].includes(value);
}
