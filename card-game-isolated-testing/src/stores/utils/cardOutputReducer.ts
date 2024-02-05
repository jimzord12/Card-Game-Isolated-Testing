import BuildingCard from "../../classes/buildingClass_V2";
import RegCard from "../../classes/regClass_V2";
import { CardType } from "../../types";
import { isBuildingCard } from "../../types/TypeGuardFns/BuildingGuards";
import { isRegCard } from "../../types/TypeGuardFns/RegGuards";

const getSingleCardOutput = (
  card: RegCard | BuildingCard,
  type: Exclude<CardType, "sp">
) => {
  if (type === "reg" && isRegCard(card)) {
    return card.output.energy;
  } else if (type === "building" && isBuildingCard(card)) {
    return card.output.boost;
  } else {
    throw new Error("⛔ Stores: Utils: getSingleCardOutput: Invalid card type");
  }
};

export const getCardsOutput = (
  cards: (RegCard | BuildingCard)[],
  type: Exclude<CardType, "sp">
) => {
  if (cards.length === 0) {
    return 0;
  }

  if (type === "reg") {
    return cards.reduce((acc, card) => {
      const singleCardOutput = getSingleCardOutput(card, type);
      return acc + singleCardOutput;
    }, 0);
  } else if (type === "building") {
    return cards.reduce((acc, card) => {
      const singleCardOutput = getSingleCardOutput(card, type);
      return acc + singleCardOutput;
    }, 0);
  } else {
    throw new Error("⛔ Stores: Utils: getCardsOutput: Invalid card type");
  }
};
