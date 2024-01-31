import {
  BuildingTemplateId,
  CardClass,
  CardType,
  RegTemplateId,
  SPTemplateId,
} from "../../../../types";
import {
  spTemplateIds,
  buildingTemplateIds,
  regTemplateIds,
} from "../../../../constants/templates";
import BuildingCard from "../../../../classes/buildingClass_V2";
import { isBuildingTemplateId } from "../../../../types/TypeGuardFns/BuildingGuards";
import { isRegTemplateId } from "../../../../types/TypeGuardFns/RegGuards";
import RegCard from "../../../../classes/regClass_V2";
import { isSPTemplateId } from "../../../../types/TypeGuardFns/SPGuards";
import SPCard from "../../../../classes/spClass_V2";

export function cardsInit(): CardClass[] {
  const cardList: CardClass[] = [];

  const allTemplateIds = [
    ...spTemplateIds,
    ...buildingTemplateIds,
    ...regTemplateIds,
  ];

  for (let i = 0; i < allTemplateIds.length; i++) {
    // SPs
    if (allTemplateIds[i].toString().startsWith("3")) {

      if (isSPTemplateId(allTemplateIds[i])) {
        cardList.push(
          SPCard.createNew({
            templateId: allTemplateIds[i] as SPTemplateId,
            ownerId: allTemplateIds[i],
            playerName: "SP-Crafting",
          })
        );
        continue;
      } else {
        console.error(
          "⛔ CraftCardModal: utils: cardInit: Invalid SP Template ID: ",
          allTemplateIds[i]
        );
      }
    }

    // Buildings
    if (allTemplateIds[i].toString().startsWith("1")) {
      if (isBuildingTemplateId(allTemplateIds[i])) {
        cardList.push(
          BuildingCard.createNew({
            templateId: allTemplateIds[i] as BuildingTemplateId,
            ownerId: allTemplateIds[i],
            playerName: "Building-Crafting",
          })
        );
        continue;
      } else {
        console.error(
          "⛔ CraftCardModal: utils: cardInit: Invalid Building Template ID"
        );
      }
    }

    // REGs
    if (allTemplateIds[i].toString().startsWith("2")) {
      if (isRegTemplateId(allTemplateIds[i])) {
        cardList.push(
          RegCard.createNew({
            templateId: allTemplateIds[i] as RegTemplateId,
            ownerId: allTemplateIds[i],
            playerName: "REG-Crafting",
          })
        );
        continue;
      } else {
        console.error(
          "⛔ CraftCardModal: utils: cardInit: Invalid REG Template ID"
        );
      }
    }
  }
  return cardList;
}

export function typeFinder(type: CardType) {
  if (type === "reg") return "Renewable Energy Generators";
  if (type === "building") return "Buildings Cards";
  if (type === "sp") return "Special Effect Cards";
}
