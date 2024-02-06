import { ToolStoreType } from "../../../types";
import { Multipliers } from "../../../types/GameLoopTypes/GameLoopTypes";
import { calcMulti } from "./calcMulti";

export const multipliersInit = (toolStoreCards: ToolStoreType[]) => {
  const multipliers: Multipliers = {
    concreteMultiplier: 1,
    metalsMultiplier: 1,
    crystalsMultiplier: 1,
    goldMultiplier: 1,
  };

  toolStoreCards.forEach((card) => {
    const singleCardMultipliers = calcMulti(card);

    multipliers.concreteMultiplier += singleCardMultipliers.concrete;
    multipliers.metalsMultiplier += singleCardMultipliers.metals;
    multipliers.crystalsMultiplier += singleCardMultipliers.crystals;
    multipliers.goldMultiplier += singleCardMultipliers.gold;
  });

  return multipliers;
};
