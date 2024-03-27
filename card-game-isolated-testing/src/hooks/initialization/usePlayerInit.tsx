import { calcPopGrowthRate } from "../game/gameLoop/calculators/gathRatesCalculators";
import { useGameVarsStore } from "../../stores/gameVars";
import { Level } from "../../types";
import { IPlayerDB } from "../../types/PlayerTypes/Player";
import { getWorkers } from "./utils";
import {
  barrelToEnergyConversion,
  barrelToSadnessConversion,
  townhallHousingLimitPerLevel,
} from "../../constants/game/defaultBuildingsConfig";
import { round2Decimal } from "../../utils/game/roundToDecimal";
import { useToastError } from "../notifications";
// Here we are Initializing:
// 1. Resources
// 2. Townhall Level
// 3. Factory Level
// 4. Workers
// 5. popGrowthRate without Building Boosts

const usePlayerInit = () => {
  const {
    setPlayer,
    setRank,
    setTownhallLevel,
    setFactoryLevel,
    setAllWorkers,
    setPopGrowthRate,
    setFactoryBarrels,
    setEnergyProduced,
    energyProduced,
    setQuarryLevels,
  } = useGameVarsStore((state) => state);

  const toastError = useToastError();

  const playerInit = (data: IPlayerDB) => {
    setPlayer(data); // 🔷 Set the Player Data to Global State
    console.log("💈 usePlayerInit: ", data);
    setTownhallLevel(data.townhall_lvl as Level);
    setFactoryLevel(data.factory_lvl as Level);
    setFactoryBarrels(data.factory_barrels ?? 0);
    setEnergyProduced(
      (data.factory_barrels ?? 0) * barrelToEnergyConversion + energyProduced
    );
    setQuarryLevels({
      concrete: data.concrete_quarry_lvl ?? 1,
      crystals: data.crystals_quarry_lvl ?? 1,
      metals: data.metals_quarry_lvl ?? 1,
      diesel: data.diesel_quarry_lvl ?? 1,
    });
    setRank(data.rank ?? -1);

    const workers = getWorkers(data);
    setAllWorkers(workers);

    //TODO: SET the needsCatchUp

    if (data.population === null) {
      throw new Error("⛔ PlayerInit: Player Population is 0");
    }

    const popGrowthCondition =
      (data.population ?? 0) >=
      townhallHousingLimitPerLevel[data.townhall_lvl as Level];

    const popGrowthRate = popGrowthCondition
      ? 0
      : round2Decimal(
          calcPopGrowthRate(
            data.population ?? 0,
            0,
            (data.factory_barrels ?? 0) * barrelToSadnessConversion
          )
        );

    if (popGrowthRate === 0) {
      toastError.showError(
        "Your Town is Full!",
        "As a result, your Population Growth Rate is 0. Upgrade your Townhall to increase the Population Limit."
      );
    }

    // const popGrowthRate = calcPopGrowthRate(
    //   data.population,
    //   0,
    //   (data.factory_barrels ?? 0) * barrelToSadnessConversion
    // );
    setPopGrowthRate(popGrowthRate);
    return popGrowthRate;
  };

  return { playerInit };
};

export default usePlayerInit;
