import { CardRarityString } from "../../types/CardTypes/CardTypes";

export function rarityToString(rarity: number): CardRarityString {
  switch (rarity) {
    case 1:
      return "Common";
    case 2:
      return "Special";
    case 3:
      return "Rare";
    case 4:
      return "Mythic";
    case 5:
      return "Legendary";
    default:
      return "Common";
  }
}
