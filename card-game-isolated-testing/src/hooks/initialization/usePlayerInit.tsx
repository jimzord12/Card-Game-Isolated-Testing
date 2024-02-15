import { calcPopGrowthRate } from "../game/gameLoop/calculators/gathRatesCalculators";
import { useGameVarsStore } from "../../stores/gameVars";
import { Level } from "../../types";
import { IPlayerDB } from "../../types/PlayerTypes/Player";
import { getWorkers } from "./utils";
import { useAllCardsStore } from "../../stores/allCards";
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
    // popGrowthRate: currentPopGrowthRate,
    // happinessFromBuildings,
    setPopGrowthRate,
  } = useGameVarsStore((state) => state);
  // const buildingCards = useAllCardsStore((state) => state.activeBuildingCards);
  const allCards = useAllCardsStore();

  const playerInit = (data: IPlayerDB) => {
    setPlayer(data); // 🔷 Set the Player Data to Global State
    console.log("💰💰💰💰💰💰💰💰: ", data.timestamp);
    setTownhallLevel(data.townhall_lvl as Level);
    setFactoryLevel(data.factory_lvl as Level);

    const workers = getWorkers(data);
    setAllWorkers(workers);

    //TODO: SET the needsCatchUp

    if (data.population === null) {
      throw new Error("⛔ PlayerInit: Player Population is 0");
    }

    // const happinessFromDoctors =
    //   workers.hospitalWorkers * hospitalConstants.doctorsBoostToGrowthRate;
    // let happinessFromAmusementParks = 0;

    // buildingCards.forEach((card) => {
    //   if (card.name === nameToTemplateDataBuilding.AmusementPark.name) {
    //     console.log("🏠 Building Card: ", card);
    //     happinessFromAmusementParks += card.output.boost;
    //   }
    // });

    // const totalExternalHappiness =
    //   happinessFromDoctors + happinessFromAmusementParks;

    // console.log("Dotors: ", workers.hospitalWorkers);
    // console.log("Building Cards: ", buildingCards);

    console.log("first happinessFromBuildings: ", allCards);
    setPopGrowthRate(calcPopGrowthRate(data.population, 0));
  };

  return { playerInit };
};

export default usePlayerInit;
