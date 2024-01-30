import { RegSpot, RegTemplateId } from "..";
import RegCard from "../../classes/regClass_V2";

export function isRegSpot(value: number): value is RegSpot {
  return [0, 1, 3, 8, 10, 11, 13].includes(value);
}

export function isRegCard(value: object): value is RegCard {
  return value instanceof RegCard;
}

export function isRegTemplateId(value: number): value is RegTemplateId {
  return [201, 202, 203, 204].includes(value);
}

export function isOldRegTemplateId(value: number): value is RegTemplateId {
  return [1].includes(value);
}
