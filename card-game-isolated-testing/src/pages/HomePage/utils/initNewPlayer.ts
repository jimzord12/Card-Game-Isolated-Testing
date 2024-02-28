import { PlayerData } from "../../../types/PlayerTypes/Player";
import {
  startingResources,
  startingPop,
} from "../../../constants/game/startingStats";
import { toMySQL_Datetime } from "../../../utils";

export function initNewPlayer(playerId: number): PlayerData {
  const randomIslandId = Math.ceil(Math.random() * 6);

  return {
    id: playerId,
    island_id: randomIslandId,
    townhall_lvl: 1,
    factory_lvl: 1,
    factory_barrels: 0, // This is like workers. How many barrels /h are used in the factory.
    workers_concrete: 0,
    workers_metals: 0,
    workers_crystals: 0,
    workers_diesel: 0,
    workers_hospital: 0,
    concrete_quarry_lvl: 1,
    crystals_quarry_lvl: 1,
    metals_quarry_lvl: 1,
    diesel_quarry_lvl: 1,
    concrete: startingResources.concrete,
    crystals: startingResources.crystals,
    gold: startingResources.gold,
    metals: startingResources.metals,
    population: startingPop,
    diesel: startingResources.diesel,
    rank: 0,
    timestamp: toMySQL_Datetime(Date.now()),
  };
}
