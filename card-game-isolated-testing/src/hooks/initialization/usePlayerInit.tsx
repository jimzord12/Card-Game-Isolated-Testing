import { calcPopGrowthRate } from "../game/gameLoop/calculators/gathRatesCalculators";
import { useGameVarsStore } from "../../stores/gameVars";
import { Level } from "../../types";
import { IPlayerDB } from "../../types/PlayerTypes/Player";
import { getWorkers } from "./utils";
// Here we are Initializing:
// 1. Resources
// 2. Townhall Level
// 3. Factory Level
// 4. Workers
// 5. Happiness

const usePlayerInit = () => {
  const {
    setPlayer,
    setTownhallLevel,
    setFactoryLevel,
    setAllWorkers,
    popGrowthRate: currentPopGrowthRate,
    setPopGrowthRate,
  } = useGameVarsStore((state) => state);

  const playerInit = (data: IPlayerDB) => {
    setPlayer(data); // 🔷 Set the Player Data to Global State

    setTownhallLevel(data.townhall_lvl as Level);
    setFactoryLevel(data.factory_lvl as Level);

    setAllWorkers(getWorkers(data));

    //TODO: SET the needsCatchUp

    if (data.population === null) {
      throw new Error("⛔ PlayerInit: Player Population is 0");
    }
    setPopGrowthRate(calcPopGrowthRate(data.population, currentPopGrowthRate));
  };

  return { playerInit };
};

export default usePlayerInit;
