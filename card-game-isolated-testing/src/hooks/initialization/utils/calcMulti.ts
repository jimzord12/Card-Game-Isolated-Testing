import { ToolStoreType, BuildingStats } from "../../../types";

// IMPORTANT:
// 1. Only ToolStore cards have a stats property
// 2. The stats property indicates the level of the card's Tools levels
// 3. These Tool Level are used to calculate the multipliers
// for boosting the game's resources gathering.
export const calcMulti = (card: ToolStoreType) => {
  const props = ["concrete", "metals", "crystals", "gold"];
  const multiplier = {
    gold: 1,
    concrete: 1,
    metals: 1,
    crystals: 1,
    diesel: 1,
  };

  for (let i = 0; i < props.length; i++) {
    multiplier[props[i] as keyof BuildingStats] =
      card.stats[props[i] as keyof BuildingStats] * card.output.boost;
  }

  console.log("🎁 Utils:calcMulti:: ", multiplier);

  return multiplier;
};
