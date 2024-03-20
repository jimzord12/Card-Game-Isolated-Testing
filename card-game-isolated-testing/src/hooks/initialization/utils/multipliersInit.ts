import { ToolStoreType } from "../../../types";
import { Multipliers } from "../../../types/GameLoopTypes/GameLoopTypes";
import { calcMultiToolStore } from "./calcMultiToolStore";

export const multipliersInit = (
  startingMultipliers: Multipliers,
  toolStoreCards: ToolStoreType[]
) => {
  if (toolStoreCards.length === 0) return startingMultipliers;
  // const multipliers: Multipliers = {
  //   concreteMultiplier: 1,
  //   metalsMultiplier: 1,
  //   crystalsMultiplier: 1,
  //   goldMultiplier: 1,
  // };
  console.log("🔷 Multipliers Init: ", startingMultipliers);

  toolStoreCards.forEach((card) => {
    const singleCardMultipliers = calcMultiToolStore(card);
    console.log("🔷 2- Multipliers Init: ", card);

    startingMultipliers.concreteMultiplier += singleCardMultipliers.concrete;
    startingMultipliers.metalsMultiplier += singleCardMultipliers.metals;
    startingMultipliers.crystalsMultiplier += singleCardMultipliers.crystals;
    startingMultipliers.dieselMultiplier += singleCardMultipliers.diesel;
  });

  return startingMultipliers;
};
