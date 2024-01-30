import { SPTemplateId } from "..";
import SPCard from "../../classes/spClass_V2";

export function isSPCard(value: object): value is SPCard {
  return value instanceof SPCard;
}

export function isSPTemplateId(value: number): value is SPTemplateId {
  return [301, 302, 303].includes(value);
}

export function isOldSPTemplateId(value: number): value is SPTemplateId {
  return [7].includes(value);
}
