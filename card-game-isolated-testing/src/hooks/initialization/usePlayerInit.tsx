import { calcPopGrowthRate } from "../game/gameLoop/calculators/gathRatesCalculators";
import { useGameVarsStore } from "../../stores/gameVars";
import { Level } from "../../types";
import { IPlayerDB } from "../../types/PlayerTypes/Player";
import { getWorkers } from "./utils";
import {
  barrelToEnergyConversion,
  barrelToSadnessConversion,
} from "../../constants/game/defaultBuildingsConfig";
// Here we are Initializing:
// 1. Resources
// 2. Townhall Level
// 3. Factory Level
// 4. Workers
// 5. popGrowthRate without Building Boosts

const usePlayerInit = () => {
  const {
    setPlayer,
    setTownhallLevel,
    setFactoryLevel,
    setAllWorkers,
    setPopGrowthRate,
    setFactoryBarrels,
    setEnergyProduced,
    energyProduced,
  } = useGameVarsStore((state) => state);

  const playerInit = (data: IPlayerDB) => {
    setPlayer(data); // 🔷 Set the Player Data to Global State
    console.log("💰💰💰💰💰💰💰💰: ", data.timestamp);
    setTownhallLevel(data.townhall_lvl as Level);
    setFactoryLevel(data.factory_lvl as Level);
    setFactoryBarrels(data.factory_barrels ?? 0);
    setEnergyProduced(
      (data.factory_barrels ?? 0) * barrelToEnergyConversion + energyProduced
    );

    const workers = getWorkers(data);
    setAllWorkers(workers);

    //TODO: SET the needsCatchUp

    if (data.population === null) {
      throw new Error("⛔ PlayerInit: Player Population is 0");
    }
    const popGrowthRate =
      calcPopGrowthRate(data.population, 0) -
      (data.factory_barrels ?? 0) * barrelToSadnessConversion;

    setPopGrowthRate(popGrowthRate);
    return popGrowthRate;
  };

  return { playerInit };
};

export default usePlayerInit;
