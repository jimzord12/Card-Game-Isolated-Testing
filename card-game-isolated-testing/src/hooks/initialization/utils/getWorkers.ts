import { hospitalConstants } from "../../../constants/game/buildingsConfig";
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

  const doctors = playerData.workers_hospital
    ? playerData.workers_hospital * hospitalConstants.doctorsToCitizensRatio
    : 0;

  const allNonPrivateWorkers =
    (playerData.workers_concrete ?? 0) +
    (playerData.workers_metals ?? 0) +
    (playerData.workers_crystals ?? 0) +
    (playerData.workers_diesel ?? 0) +
    doctors; // 1 Doctor counts as 4 Private Sector Workers

  const privateSector = playerData.population - allNonPrivateWorkers;

  console.log(
    "✨ usePlayerInit: GetWorkers: Population: ",
    playerData.population
  );
  console.log("✨ usePlayerInit: GetWorkers: privateSector: ", privateSector);
  console.log("✨ usePlayerInit: GetWorkers: Other Workers: ", {
    concreteWorkers: playerData.workers_concrete ?? 0,
    metalsWorkers: playerData.workers_metals ?? 0,
    crystalsWorkers: playerData.workers_crystals ?? 0,
    dieselWorkers: playerData.workers_diesel ?? 0,
    hospitalWorkers: playerData.workers_hospital ?? 0,
  });

  return {
    privateSector: privateSector,
    concreteWorkers: playerData.workers_concrete ?? 0,
    metalsWorkers: playerData.workers_metals ?? 0,
    crystalsWorkers: playerData.workers_crystals ?? 0,
    dieselWorkers: playerData.workers_diesel ?? 0,
    hospitalWorkers: playerData.workers_hospital ?? 0,
  };
};
