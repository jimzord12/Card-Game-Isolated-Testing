import { BuildingSpot, BuildingTemplateId } from "..";
import BuildingCard from "../../classes/buildingClass_V2";

export function isBuildingSpot(value: number): value is BuildingSpot {
  return [0, 2, 4, 5, 6, 7, 9, 12].includes(value);
}

export function isBuildingCard(value: object): value is BuildingCard {
  return value instanceof BuildingCard;
}

export function isBuildingTemplateId(
  value: number
): value is BuildingTemplateId {
  return [101, 102, 103, 104].includes(value);
}

export function isOldBuildingTemplateId(
  value: number
): value is BuildingTemplateId {
  return [13].includes(value);
}
