import BuildingCard from "../../../classes/buildingClass_V2";
import { GameVarsState } from "../../gameVars";
import { nameToTemplateDataBuilding } from "../../../constants/templates";
import { calcMultiToolStore } from "../../../hooks/initialization/utils/calcMultiToolStore";
import { isToolStore } from "../../../types/TypeGuardFns/isToolStore";
import { updatePlayerData } from "../../../../api/apiFns";

export const update_B_GameVars_Removal = (
  card: BuildingCard,
  gameVars: GameVarsState
) => {
  const { output, maintenance } = card;

  // ✨ AmusementPark
  if (card.name === nameToTemplateDataBuilding.AmusementPark.name) {
    const currentEnergyConsumed = gameVars.energyConsumed;
    const currentHappinessFromBuildings = gameVars.happinessFromBuildings;
    const currentPopGrowthRate = gameVars.popGrowthRate;

    gameVars.setHappinessFromBuildings(
      currentHappinessFromBuildings - output.boost
    );
    gameVars.setPopGrowthRate(currentPopGrowthRate - output.boost);
    gameVars.setEnergyConsumed(currentEnergyConsumed - maintenance.energy);
    return;
  }

  // ✨ RadioStation
  if (card.name === nameToTemplateDataBuilding.RadioStation.name) {
    const currentEnergyConsumed = gameVars.energyConsumed;

    gameVars.removeRadioStationEffectBoost();
    gameVars.setEnergyConsumed(currentEnergyConsumed - maintenance.energy);
    return;
  }

  // ✨ ToolStore
  if (card.name === nameToTemplateDataBuilding.ToolStore.name) {
    const currentEnergyConsumed = gameVars.energyConsumed;
    if (!isToolStore(card))
      throw new Error("⛔ updateBuildingRelatedGameVars: Not a ToolStore card");

    const currentMultipliers = gameVars.multipliers;
    const CardMultipliers = calcMultiToolStore(card);

    gameVars.setEnergyConsumed(currentEnergyConsumed - maintenance.energy);
    gameVars.setMultipliers({
      ...gameVars.multipliers,
      goldMultiplier: currentMultipliers.goldMultiplier - CardMultipliers.gold,
      concreteMultiplier:
        currentMultipliers.concreteMultiplier - CardMultipliers.concrete,
      metalsMultiplier:
        currentMultipliers.metalsMultiplier - CardMultipliers.metals,
      crystalsMultiplier:
        currentMultipliers.crystalsMultiplier - CardMultipliers.crystals,
    });
    return;
  }

  // ✨ Hospital
  if (card.name === nameToTemplateDataBuilding.Hospital.name) {
    const currentEnergyConsumed = gameVars.energyConsumed;
    const currentHappinessFromBuildings = gameVars.happinessFromBuildings;
    const currentPopGrowthRate = gameVars.popGrowthRate;
    const currentDoctors = gameVars.allWorkers.hospitalWorkers;
    const currentPrivateSector = gameVars.allWorkers.privateSector;

    // if (card.doctors === undefined)
    //   throw new Error(
    //     "⛔ update_B_GameVars_Removal: Hospital: doctors undefined"
    //   );

    const outputEffect = (card.doctors ?? 0) * output.boost;

    if (gameVars.player === null || gameVars.player.id === undefined)
      throw new Error("⛔ update_B_GameVars_Removal: Player ID is undefined");
    // Update Database
    updatePlayerData(gameVars.player.id, {
      workers_hospital: 0,
    });

    gameVars.setAllWorkers({
      ...gameVars.allWorkers,
      hospitalWorkers: 0,
      privateSector: currentPrivateSector + currentDoctors,
    });
    gameVars.setHappinessFromBuildings(
      currentHappinessFromBuildings - outputEffect
    );
    gameVars.setPopGrowthRate(currentPopGrowthRate - outputEffect);
    gameVars.setEnergyConsumed(currentEnergyConsumed - maintenance.energy);
    gameVars.setAllWorkers({
      ...gameVars.allWorkers,
      hospitalWorkers:
        gameVars.allWorkers.hospitalWorkers - (card.doctors ?? 0),
    });
    return;
  }
};
