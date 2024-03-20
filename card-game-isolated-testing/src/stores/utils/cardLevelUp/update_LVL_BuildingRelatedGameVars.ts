import BuildingCard from "../../../classes/buildingClass_V2";
import { GameVarsState } from "../../gameVars";
import { nameToTemplateDataBuilding } from "../../../constants/templates";
import { calcMultiToolStore } from "../../../hooks/initialization/utils/calcMultiToolStore";
import { isToolStore } from "../../../types/TypeGuardFns/isToolStore";
import { round2Decimal } from "../../../utils/game/roundToDecimal";

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
    const currentHappinessFromBuildings = gameVars.happinessFromBuildings;

    const outputDiff = round2Decimal(output.boost - oldOutput!.boost);

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

    const outputDiff = round2Decimal(output.boost - oldOutput!.boost);
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
    const currentEnergyConsumed = gameVars.energyConsumed;
    const currentMultipliers = gameVars.multipliers;

    const oldConcreteMulti = oldCard.output?.boost ?? 0 * card.stats.concrete;
    const oldMetalsMulti = oldCard.output?.boost ?? 0 * card.stats.metals;
    const oldCrystalsMulti = oldCard.output?.boost ?? 0 * card.stats.crystals;
    const oldDieselMulti = oldCard.output?.boost ?? 0 * card.stats.diesel;
    
    const CardMultipliers = calcMultiToolStore(card);

    const maintenanceDiff = maintenance.energy - oldMaintenance!.energy;

    gameVars.setEnergyConsumed(currentEnergyConsumed + maintenanceDiff);
    gameVars.setMultipliers({
      ...gameVars.multipliers,
      concreteMultiplier:
        currentMultipliers.concreteMultiplier +
        CardMultipliers.concrete -
        oldConcreteMulti,
      metalsMultiplier:
        currentMultipliers.metalsMultiplier +
        CardMultipliers.metals -
        oldMetalsMulti,
      crystalsMultiplier:
        currentMultipliers.crystalsMultiplier +
        CardMultipliers.crystals -
        oldCrystalsMulti,
      dieselMultiplier:
        currentMultipliers.dieselMultiplier +
        CardMultipliers.diesel -
        oldDieselMulti,
    });
    return;
  }

  // ✨ Hospital simply increase Happiness based on: hospital's workers * hospital output
};
