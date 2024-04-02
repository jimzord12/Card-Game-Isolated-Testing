import { hospitalConstants } from "../../../../constants/game/buildingsConfig";
import { Workers } from "../../../../types/GameLoopTypes/GameLoopTypes";

export const privateSectorCalc = (workers: Workers, population: number) => {
  const allNonPrivateWorkers =
    workers.concreteWorkers +
    workers.metalsWorkers +
    workers.crystalsWorkers +
    workers.dieselWorkers +
    workers.hospitalWorkers * hospitalConstants.doctorsToCitizensRatio;

  console.log("🧮 GameLoopWorker: concreteWorkers: ", workers.concreteWorkers);
  console.log("🧮 GameLoopWorker: metalsWorkers: ", workers.metalsWorkers);
  console.log("🧮 GameLoopWorker: crystalsWorkers: ", workers.crystalsWorkers);
  console.log("🧮 GameLoopWorker: dieselWorkers: ", workers.dieselWorkers);
  console.log("🧮 GameLoopWorker: hospitalWorkers: ", workers.hospitalWorkers);

  console.log(
    "🧮 GameLoopWorker: privateSectorCalc: allNonPrivateWorkers: ",
    allNonPrivateWorkers
  );

  if (allNonPrivateWorkers > population + 1) {
    // 1. This can happen when the Player has Negative PopGrowthRate
    // 2. The Code should reset All Workers to 0 and Maxout the Private Sector.
    console.log(
      "⛔ - privateSectorCalc: All Non-Private Workers are more than Population"
    );
    return false;
  }

  console.log("🧮 GameLoopWorker: Population: ", population);
  console.log(
    "🧮 GameLoopWorker: PrivateSector: ",
    population - allNonPrivateWorkers
  );

  return population - allNonPrivateWorkers;
};
