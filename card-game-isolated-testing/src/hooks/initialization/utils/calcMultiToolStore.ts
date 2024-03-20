import SPCard from "../../../classes/spClass_V2";
import { templateIdToTemplateDataSP } from "../../../constants/templates";
import { ToolStoreType, BuildingStats } from "../../../types";

// IMPORTANT:
// 1. Only ToolStore cards have a stats property
// 2. The stats property indicates the level of the card's Tools levels
// 3. These Tool Level are used to calculate the multipliers
// for boosting the game's resources gathering.
export const calcMultiToolStore = (card: ToolStoreType) => {
  const toolType = ["concrete", "metals", "crystals", "diesel"];
  const baseMultipliers = {
    gold: 0,
    concrete: 0,
    metals: 0,
    crystals: 0,
    diesel: 0,
  };

  for (let i = 0; i < toolType.length; i++) {
    baseMultipliers[toolType[i] as keyof BuildingStats] =
      card.stats[toolType[i] as keyof BuildingStats] * card.output.boost; // Tool Level * ToolStore Boost
  }

  console.log("🎁 Utils:calcMulti:: ", baseMultipliers);

  return baseMultipliers;
};

export const calcMultiSPCards = (card: SPCard) => {
  const baseMultipliers = {
    gold: 0,
    concrete: 0,
    metals: 0,
    crystals: 0,
    diesel: 0,
  };

  if (templateIdToTemplateDataSP[card.templateId].name === "WallStreet") {
    console.log("🎁 Utils:calcMulti::SP-Card:WallStreet: ", {
      ...baseMultipliers,
      gold: card.output.boost,
    });

    return { ...baseMultipliers, gold: card.output.boost };
  }
  if (templateIdToTemplateDataSP[card.templateId].name === "SuperStrong") {
    console.log("🎁 Utils:calcMulti::SP-Card:SuperStrong: ", {
      ...baseMultipliers,
      concrete: card.output.boost,
      metals: card.output.boost,
      crystals: card.output.boost,
      diesel: card.output.boost,
    });

    return {
      ...baseMultipliers,
      concrete: card.output.boost,
      metals: card.output.boost,
      crystals: card.output.boost,
      diesel: card.output.boost,
    };
  }
};
