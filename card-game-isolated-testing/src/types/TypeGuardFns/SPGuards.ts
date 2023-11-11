import SPCard from "../../classes/spClass_V2";

export function isSPCard(value: object): value is SPCard {
  return value instanceof SPCard;
}
