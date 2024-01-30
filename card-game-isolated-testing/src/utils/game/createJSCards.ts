import BuildingCard from "../../classes/buildingClass_V2";
import RegCard from "../../classes/regClass_V2";
import SPCard from "../../classes/spClass_V2";
import {
  BuildingCardData,
  CardClass,
  ICardDB,
  RegCardData,
  SPCardData,
} from "../../types";
import {
  isBuildingTemplateId,
  isOldBuildingTemplateId,
} from "../../types/TypeGuardFns/BuildingGuards";
import {
  isOldRegTemplateId,
  isRegTemplateId,
} from "../../types/TypeGuardFns/RegGuards";
import {
  isOldSPTemplateId,
  isSPTemplateId,
} from "../../types/TypeGuardFns/SPGuards";

export const createJSCards = (cardsFromDB: ICardDB[]): CardClass[] => {
  const cardList: CardClass[] = [];

  for (let i = 0; i < cardsFromDB.length; i++) {
    // SPs
    if (
      isSPTemplateId(cardsFromDB[i].templateId) &&
      isOldSPTemplateId(cardsFromDB[i].templateId)
    ) {
      cardList.push(
        SPCard.fromDb({
          ...cardsFromDB[i],
          disabled: Boolean(cardsFromDB[i].disabled),
        } as SPCardData)
      );
      continue;
    }

    // Buildings
    else if (
      isBuildingTemplateId(cardsFromDB[i].templateId) ||
      isOldBuildingTemplateId(cardsFromDB[i].templateId)
    ) {
      if (cardsFromDB[i].on_map_spot === undefined)
        throw new Error(
          "⛔ utils/game/createJSCards: Building Spot is undefined"
        );

      //   if (!isBuildingSpot(cardsFromDB[i].on_map_spot as number))
      //     throw new Error("⛔ utils/game/createJSCards: Invalid Building Spot");

      cardList.push(
        BuildingCard.fromDb({
          ...cardsFromDB[i],
          spot: cardsFromDB[i].on_map_spot,
        } as BuildingCardData)
      );
      continue;
    }

    // REGs
    else if (
      isRegTemplateId(cardsFromDB[i].templateId) ||
      isOldRegTemplateId(cardsFromDB[i].templateId)
    ) {
      if (cardsFromDB[i].on_map_spot === undefined)
        throw new Error("⛔ utils/game/createJSCards: REG Spot is undefined");

      //   if (!isRegSpot(cardsFromDB[i].on_map_spot as number))
      //     throw new Error("⛔ utils/game/createJSCards: Invalid REG Spot");

      cardList.push(
        RegCard.fromDb({
          ...cardsFromDB[i],
          spot: cardsFromDB[i].on_map_spot,
        } as RegCardData)
      );
      continue;
    } else {
      console.error(
        "⛔ CraftCardModal: utils: cardInit: Invalid REG Template ID"
      );
    }
  }
  return cardList;
};
