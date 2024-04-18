import SPCard from "../../../classes/spClass_V2";
import { nameToTemplateDataSP } from "../../../constants/templates";
// import { calcMultiSPCards } from "../../../hooks/initialization/utils/calcMultiToolStore";
// import { round2Decimal } from "../../../utils/game/roundToDecimal";
import { GameVarsState } from "../../gameVars";

export const update_SP_GameVars_Removal = (
  card: SPCard,
  gameVars: GameVarsState
) => {
  // const { output } = card;

  // ✨ WallStreet
  console.log("updateSPRelatedGameVars: CARD: ", card);
  if (card.name === nameToTemplateDataSP.WallStreet.name) {
    // const currentMultipliers = gameVars.multipliers;
    // const CardMultipliers = calcMultiSPCards(card);

    // if (CardMultipliers === undefined)
    //   throw new Error(
    //     "⛔ updateSPRelatedGameVars.ts: CardMultipliers is undefined"
    //   );

    // gameVars.setMultipliers({
    //   ...gameVars.multipliers,
    //   goldMultiplier: round2Decimal(
    //     currentMultipliers.goldMultiplier - CardMultipliers.gold
    //   ),
    //   concreteMultiplier: round2Decimal(
    //     currentMultipliers.concreteMultiplier - CardMultipliers.concrete
    //   ),
    //   metalsMultiplier: round2Decimal(
    //     currentMultipliers.metalsMultiplier - CardMultipliers.metals
    //   ),
    //   crystalsMultiplier: round2Decimal(
    //     currentMultipliers.crystalsMultiplier - CardMultipliers.crystals
    //   ),
    //   dieselMultiplier: round2Decimal(
    //     currentMultipliers.dieselMultiplier - CardMultipliers.diesel
    //   ),
    // });
    // return;
    gameVars.setActiveEffect(null);
  }

  // ✨ SuperStrong
  if (card.name === nameToTemplateDataSP.SuperStrong.name) {
    // const currentMultipliers = gameVars.multipliers;
    // const CardMultipliers = calcMultiSPCards(card);

    // if (CardMultipliers === undefined)
    //   throw new Error(
    //     "⛔ updateSPRelatedGameVars.ts: CardMultipliers is undefined"
    //   );

    // gameVars.setMultipliers({
    //   ...gameVars.multipliers,
    //   goldMultiplier: round2Decimal(
    //     currentMultipliers.goldMultiplier - CardMultipliers.gold
    //   ),
    //   concreteMultiplier: round2Decimal(
    //     currentMultipliers.concreteMultiplier - CardMultipliers.concrete
    //   ),
    //   metalsMultiplier: round2Decimal(
    //     currentMultipliers.metalsMultiplier - CardMultipliers.metals
    //   ),
    //   crystalsMultiplier: round2Decimal(
    //     currentMultipliers.crystalsMultiplier - CardMultipliers.crystals
    //   ),
    //   dieselMultiplier: round2Decimal(
    //     currentMultipliers.dieselMultiplier - CardMultipliers.diesel
    //   ),
    // });
    // return;
    gameVars.setActiveEffect(null);
  }

  if (card.name === nameToTemplateDataSP.LoveApp.name) {
    // const currentPopGrowthRate = gameVars.popGrowthRate;
    // const currentHappinessFromBuildings = gameVars.happinessFromBuildings;

    // gameVars.setPopGrowthRate(currentPopGrowthRate - output.boost);
    // gameVars.setHappinessFromBuildings(
    //   currentHappinessFromBuildings - output.boost
    // );
    gameVars.setActiveEffect(null);
  }
};
