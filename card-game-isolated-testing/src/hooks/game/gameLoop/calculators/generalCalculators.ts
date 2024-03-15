import { Workers } from "../../../../types/GameLoopTypes/GameLoopTypes";

export const privateSectorCalc = (workers: Workers, population: number) => {
  const allNonPrivateWorkers =
    workers.concreteWorkers +
    workers.metalsWorkers +
    workers.crystalsWorkers +
    workers.dieselWorkers +
    workers.hospitalWorkers;

  if (allNonPrivateWorkers > population + 1) {
    // 1. This can happen when the Player has Negative PopGrowthRate
    // 2. The Code should reset All Workers to 0 and Maxout the Private Sector.
    console.log(
      "⛔ - privateSectorCalc: All Non-Private Workers are more than Population"
    );
    return false;
  }

  return population - allNonPrivateWorkers;
};
