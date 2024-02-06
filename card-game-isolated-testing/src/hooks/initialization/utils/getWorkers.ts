import { Workers } from "../../../types/GameLoopTypes/GameLoopTypes";
import { IPlayerDB } from "../../../types/PlayerTypes/Player";

export const getWorkers = (playerData: IPlayerDB): Workers => {
  if (
    playerData.population === null ||
    playerData.population === undefined ||
    playerData.population <= 0
  )
    throw new Error(
      "⛔ - usePlayerInit: getWorkers: Population is null or undefined or less than 0!"
    );

  const allNonPrivateWorkers =
    (playerData.workers_concrete ?? 0) +
    (playerData.workers_metals ?? 0) +
    (playerData.workers_crystals ?? 0) +
    (playerData.workers_diesel ?? 0) +
    (playerData.workers_hospital ?? 0);

  const privateSector = playerData.population - allNonPrivateWorkers;

  return {
    privateSector: privateSector,
    concreteWorkers: playerData.workers_concrete ?? 0,
    metalsWorkers: playerData.workers_metals ?? 0,
    crystalsWorkers: playerData.workers_crystals ?? 0,
    dieselWorkers: playerData.workers_diesel ?? 0,
    hospitalWorkers: playerData.workers_hospital ?? 0,
  };
};
