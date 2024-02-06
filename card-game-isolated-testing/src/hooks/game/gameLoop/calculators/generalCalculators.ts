import { Workers } from "../../../../types/GameLoopTypes/GameLoopTypes";

export const privateSectorCalc = (workers: Workers, population: number) => {
  const allNonPrivateWorkers =
    workers.concreteWorkers +
    workers.metalsWorkers +
    workers.crystalsWorkers +
    workers.dieselWorkers +
    workers.hospitalWorkers;
  return population - allNonPrivateWorkers;
};
