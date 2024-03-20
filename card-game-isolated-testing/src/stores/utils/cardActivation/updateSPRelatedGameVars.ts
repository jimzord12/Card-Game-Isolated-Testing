import { GameVarsState } from "../../gameVars";
import { nameToTemplateDataSP } from "../../../constants/templates";
import { calcMultiSPCards } from "../../../hooks/initialization/utils/calcMultiToolStore";
import { round2Decimal } from "../../../utils/game/roundToDecimal";
import SPCard from "../../../classes/spClass_V2";

export const updateSPRelatedGameVars = (
  card: SPCard,
  gameVars: GameVarsState
) => {
  const { output } = card;

  // ✨ WallStreet
  console.log("updateSPRelatedGameVars: CARD: ", card);
  if (card.name === nameToTemplateDataSP.WallStreet.name) {
    const currentMultipliers = gameVars.multipliers;
    const CardMultipliers = calcMultiSPCards(card);

    if (CardMultipliers === undefined)
      throw new Error(
        "⛔ updateSPRelatedGameVars.ts: CardMultipliers is undefined"
      );

    const newGoldMultiplier = round2Decimal(
      currentMultipliers.goldMultiplier + CardMultipliers.gold
    );
    const newConcreteMultiplier = round2Decimal(
      currentMultipliers.concreteMultiplier + CardMultipliers.concrete
    );
    const newMetalsMultiplier = round2Decimal(
      currentMultipliers.metalsMultiplier + CardMultipliers.metals
    );
    const newCrystalsMultiplier = round2Decimal(
      currentMultipliers.crystalsMultiplier + CardMultipliers.crystals
    );
    const newDieselMultiplier = round2Decimal(
      currentMultipliers.dieselMultiplier + CardMultipliers.diesel
    );

    gameVars.setMultipliers({
      ...gameVars.multipliers,
      goldMultiplier: newGoldMultiplier,
      concreteMultiplier: newConcreteMultiplier,
      metalsMultiplier: newMetalsMultiplier,
      crystalsMultiplier: newCrystalsMultiplier,
      dieselMultiplier: newDieselMultiplier,
    });

    gameVars.setGoldGathRate(gameVars.goldGathRate * newGoldMultiplier);

    return;
  }

  // ✨ SuperStrong
  if (card.name === nameToTemplateDataSP.SuperStrong.name) {
    const currentMultipliers = gameVars.multipliers;
    const CardMultipliers = calcMultiSPCards(card);

    if (CardMultipliers === undefined)
      throw new Error(
        "⛔ updateSPRelatedGameVars.ts: CardMultipliers is undefined"
      );

    const newGoldMultiplier = round2Decimal(
      currentMultipliers.goldMultiplier + CardMultipliers.gold
    );
    const newConcreteMultiplier = round2Decimal(
      currentMultipliers.concreteMultiplier + CardMultipliers.concrete
    );
    const newMetalsMultiplier = round2Decimal(
      currentMultipliers.metalsMultiplier + CardMultipliers.metals
    );
    const newCrystalsMultiplier = round2Decimal(
      currentMultipliers.crystalsMultiplier + CardMultipliers.crystals
    );
    const newDieselMultiplier = round2Decimal(
      currentMultipliers.dieselMultiplier + CardMultipliers.diesel
    );

    gameVars.setMultipliers({
      ...gameVars.multipliers,
      goldMultiplier: newGoldMultiplier,
      concreteMultiplier: newConcreteMultiplier,
      metalsMultiplier: newMetalsMultiplier,
      crystalsMultiplier: newCrystalsMultiplier,
      dieselMultiplier: newDieselMultiplier,
    });

    gameVars.setConcreteGathRate(
      gameVars.concreteGathRate * newConcreteMultiplier
    );
    gameVars.setMetalsGathRate(gameVars.metalsGathRate * newMetalsMultiplier);
    gameVars.setCrystalsGathRate(
      gameVars.crystalsGathRate * newCrystalsMultiplier
    );
    gameVars.setDieselGathRate(gameVars.dieselGathRate * newDieselMultiplier);

    return;
  }

  if (card.name === nameToTemplateDataSP.LoveApp.name) {
    const currentPopGrowthRate = gameVars.popGrowthRate;
    const currentHappinessFromBuildings = gameVars.happinessFromBuildings;

    gameVars.setPopGrowthRate(currentPopGrowthRate + output.boost);
    gameVars.setHappinessFromBuildings(
      currentHappinessFromBuildings + output.boost
    );
  }
};
