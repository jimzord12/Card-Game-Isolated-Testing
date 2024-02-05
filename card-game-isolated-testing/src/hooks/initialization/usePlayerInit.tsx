import { useGameVarsStore } from "../../stores/gameVars";
import { Level } from "../../types";
import { Workers } from "../../types/GameLoopTypes/GameLoopTypes";
import { IPlayerDB } from "../../types/PlayerTypes/Player";

// Here we are Initializing:
// 1. Resources
// 2. Townhall Level
// 3. Factory Level
// 4. Workers

const usePlayerInit = () => {
  const { setPlayer, setTownhallLevel, setFactoryLevel, setAllWorkers } =
    useGameVarsStore((state) => state);

  const playerInit = (data: IPlayerDB) => {
    setPlayer(data); // 🔷 Set the Player Data to Global State

    setTownhallLevel(data.townhall_lvl as Level);
    setFactoryLevel(data.factory_lvl as Level);

    setAllWorkers(getWorkers(data));
  };

  const getWorkers = (playerData: IPlayerDB): Workers => {
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
      (playerData.workers_diesel ?? 0);

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

  return { playerInit };
};

export default usePlayerInit;
