import { GameVarsState } from "../../gameVars";
import { nameToTemplateDataSP } from "../../../constants/templates";
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
    // const CardMultipliers = calcMultiSPCards(card);

    // if (CardMultipliers === undefined)
    //   throw new Error(
    //     "⛔ updateSPRelatedGameVars.ts: CardMultipliers is undefined"
    //   );

    const currentGoldMultiplier = round2Decimal(
      currentMultipliers.goldMultiplier
    );
    // const newConcreteMultiplier = round2Decimal(
    //   currentMultipliers.concreteMultiplier + CardMultipliers.concrete
    // );
    // const newMetalsMultiplier = round2Decimal(
    //   currentMultipliers.metalsMultiplier + CardMultipliers.metals
    // );
    // const newCrystalsMultiplier = round2Decimal(
    //   currentMultipliers.crystalsMultiplier + CardMultipliers.crystals
    // );
    // const newDieselMultiplier = round2Decimal(
    //   currentMultipliers.dieselMultiplier + CardMultipliers.diesel
    // );

    // gameVars.setMultipliers({
    //   ...gameVars.multipliers,
    //   goldMultiplier: newGoldMultiplier,
    //   concreteMultiplier: newConcreteMultiplier,
    //   metalsMultiplier: newMetalsMultiplier,
    //   crystalsMultiplier: newCrystalsMultiplier,
    //   dieselMultiplier: newDieselMultiplier,
    // });

    gameVars.setGoldGathRate(
      gameVars.goldGathRate * currentGoldMultiplier * output.boost
    );

    return;
  }

  // ✨ SuperStrong
  if (card.name === nameToTemplateDataSP.SuperStrong.name) {
    // const currentMultipliers = gameVars.multipliers;
    // // const CardMultipliers = calcMultiSPCards(card);
    // // if (CardMultipliers === undefined)
    // //   throw new Error(
    // //     "⛔ updateSPRelatedGameVars.ts: CardMultipliers is undefined"
    // //   );
    // // const newGoldMultiplier = round2Decimal(
    // //   currentMultipliers.goldMultiplier + CardMultipliers.gold
    // // );
    // // const newConcreteMultiplier = round2Decimal(
    // //   currentMultipliers.concreteMultiplier + CardMultipliers.concrete
    // // );
    // // const newMetalsMultiplier = round2Decimal(
    // //   currentMultipliers.metalsMultiplier + CardMultipliers.metals
    // // );
    // // const newCrystalsMultiplier = round2Decimal(
    // //   currentMultipliers.crystalsMultiplier + CardMultipliers.crystals
    // // );
    // // const newDieselMultiplier = round2Decimal(
    // //   currentMultipliers.dieselMultiplier + CardMultipliers.diesel
    // // );
    // // gameVars.setMultipliers({
    // //   ...gameVars.multipliers,
    // //   goldMultiplier: newGoldMultiplier,
    // //   concreteMultiplier: newConcreteMultiplier,
    // //   metalsMultiplier: newMetalsMultiplier,
    // //   crystalsMultiplier: newCrystalsMultiplier,
    // //   dieselMultiplier: newDieselMultiplier,
    // // });
    // console.log(
    //   "1 - SuperStrong Activation | CurrentMultis: ",
    //   currentMultipliers
    // );
    // console.log("2 - SuperStrong Activation | Output Boost: ", output.boost);
    // console.log("3 - SuperStrong Activation | Card: ", card);
    // const modifiedOutputBoost = output.boost + 1;
    // gameVars.setConcreteGathRate(
    //   gameVars.concreteGathRate *
    //     // currentMultipliers.concreteMultiplier *
    //     modifiedOutputBoost
    // );
    // gameVars.setMetalsGathRate(
    //   gameVars.metalsGathRate *
    //     // currentMultipliers.metalsMultiplier *
    //     modifiedOutputBoost
    // );
    // gameVars.setCrystalsGathRate(
    //   gameVars.crystalsGathRate *
    //     // currentMultipliers.crystalsMultiplier *
    //     modifiedOutputBoost
    // );
    // gameVars.setDieselGathRate(
    //   gameVars.dieselGathRate *
    //     // currentMultipliers.dieselMultiplier *
    //     modifiedOutputBoost
    // );
    // return;
  }

  if (card.name === nameToTemplateDataSP.LoveApp.name) {
    const currentPopGrowthRate = gameVars.popGrowthRate;
    // const currentHappinessFromBuildings = gameVars.happinessFromBuildings;
    console.log(
      "firstasdasda: ",
      currentPopGrowthRate,
      // currentHappinessFromBuildings,
      output.boost + 1,
      currentPopGrowthRate * (output.boost + 1)
    );
    gameVars.setPopGrowthRate(currentPopGrowthRate * (output.boost + 1));
    // gameVars.setHappinessFromBuildings(
    //   currentHappinessFromBuildings + output.boost
    // );
  }
};
