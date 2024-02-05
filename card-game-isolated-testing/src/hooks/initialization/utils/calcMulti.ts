import { ToolStoreType, BuildingStats } from "../../../types";

export const calcMulti = (card: ToolStoreType) => {
  const props = ["concrete", "metals", "crystals", "gold"];
  const multiplier = { concrete: 1, metals: 1, crystals: 1, gold: 1 };

  for (let i = 0; i < props.length; i++) {
    multiplier[props[i] as keyof BuildingStats] =
      card.stats[props[i] as keyof BuildingStats] * card.output.boost;
  }

  return multiplier;
};
