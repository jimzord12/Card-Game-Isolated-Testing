import BuildingCard from "../../../classes/buildingClass_V2";
import { GameVarsState } from "../../gameVars";
import { nameToTemplateDataBuilding } from "../../../constants/templates";
import { calcMulti } from "../../../hooks/initialization/utils/calcMulti";
import { isToolStore } from "../../../types/TypeGuardFns/isToolStore";

export const update_LVL_BuildingRelatedGameVars = (
  oldCard: Partial<BuildingCard>,
  card: BuildingCard,
  gameVars: GameVarsState
) => {
  const { output, maintenance } = card;
  const { output: oldOutput, maintenance: oldMaintenance } = oldCard;

  // ✨ AmusementPark
  if (card.name === nameToTemplateDataBuilding.AmusementPark.name) {
    const currentEnergyConsumed = gameVars.energyConsumed;
    const currentHappinessFromBuildings = gameVars.popGrowthRate;

    const outputDiff = output.boost - oldOutput!.boost;
    const maintenanceDiff = maintenance.energy - oldMaintenance!.energy;

    gameVars.setHappinessFromBuildings(
      currentHappinessFromBuildings + outputDiff
    );
    gameVars.setEnergyConsumed(currentEnergyConsumed + maintenanceDiff);
    return;
  }

  // ✨ RadioStation
  if (card.name === nameToTemplateDataBuilding.RadioStation.name) {
    const currentEnergyConsumed = gameVars.energyConsumed;
    const currentRadioStationEffectBoost =
      gameVars.radioStationEffectBoost ?? 0;

    const outputDiff = output.boost - oldOutput!.boost;
    const maintenanceDiff = maintenance.energy - oldMaintenance!.energy;

    gameVars.setRadioStationEffectBoost(
      currentRadioStationEffectBoost + outputDiff
    );
    gameVars.setEnergyConsumed(currentEnergyConsumed + maintenanceDiff);
    return;
  }

  // ✨ ToolStore
  if (card.name === nameToTemplateDataBuilding.ToolStore.name) {
    if (!isToolStore(card))
      throw new Error("⛔ updateBuildingRelatedGameVars: Not a ToolStore card");

    const currentMultipliers = gameVars.multipliers;
    const CardMultipliers = calcMulti(card);

    gameVars.setMultipliers({
      ...gameVars.multipliers,
      goldMultiplier: currentMultipliers.goldMultiplier + CardMultipliers.gold,
      concreteMultiplier:
        currentMultipliers.concreteMultiplier + CardMultipliers.concrete,
      metalsMultiplier:
        currentMultipliers.metalsMultiplier + CardMultipliers.metals,
      crystalsMultiplier:
        currentMultipliers.crystalsMultiplier + CardMultipliers.crystals,
    });
    return;
  }

  // ✨ Hospital simply increase Happiness based on: hospital's workers * hospital output
};
