import BuildingCard from "../../../classes/buildingClass_V2";
import { GameVarsState } from "../../gameVars";
import { nameToTemplateDataBuilding } from "../../../constants/templates";
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

    console.log("1 - LVL_UP: RadioStation | Current RS Boost: ", gameVars);
    console.log("2 - LVL_UP: RadioStation | new Output: ", output.boost);
    console.log("3 - LVL_UP: RadioStation | old Output: ", oldOutput!.boost);

    gameVars.setRadioStationEffectBoost(
      currentRadioStationEffectBoost + outputDiff
    );
    gameVars.setEnergyConsumed(currentEnergyConsumed + maintenanceDiff);
    return;
  }

  // ✨ Hospital
  if (card.name === nameToTemplateDataBuilding.Hospital.name) {
    const currentEnergyConsumed = gameVars.energyConsumed;
    const maintenanceDiff = maintenance.energy - oldMaintenance!.energy;
    const currentHappinessFromBuildings = gameVars.happinessFromBuildings;
    const currentPopGrowthRate = gameVars.popGrowthRate;
    const activeDoctors = gameVars.allWorkers.hospitalWorkers;
    const oldHopsitalBoost = activeDoctors * oldOutput!.boost;
    const newHopsitalBoost = activeDoctors * output.boost;

    const outputDiff = round2Decimal(newHopsitalBoost - oldHopsitalBoost);

    gameVars.setEnergyConsumed(currentEnergyConsumed + maintenanceDiff);
    gameVars.setPopGrowthRate(currentPopGrowthRate + outputDiff);

    gameVars.setHappinessFromBuildings(
      currentHappinessFromBuildings + outputDiff
    );
    return;
  }

  // ✨ ToolStore 🛑 FIX!
  if (card.name === nameToTemplateDataBuilding.ToolStore.name) {
    if (!isToolStore(card))
      throw new Error("⛔ updateBuildingRelatedGameVars: Not a ToolStore card");
    const currentEnergyConsumed = gameVars.energyConsumed;
    const currentMultipliers = gameVars.multipliers;

    const oldConcreteMulti = oldCard.output?.boost ?? 0 * card.stats.concrete;
    const oldMetalsMulti = oldCard.output?.boost ?? 0 * card.stats.metals;
    const oldCrystalsMulti = oldCard.output?.boost ?? 0 * card.stats.crystals;
    const oldDieselMulti = oldCard.output?.boost ?? 0 * card.stats.diesel;

    const newConcreteMulti = output.boost * card.stats.concrete;
    const newMetalsMulti = output.boost * card.stats.metals;
    const newCrystalsMulti = output.boost * card.stats.crystals;
    const newDieselMulti = output.boost * card.stats.diesel;

    // const CardMultipliers = calcMultiToolStore(card);

    const maintenanceDiff = maintenance.energy - oldMaintenance!.energy;

    gameVars.setEnergyConsumed(currentEnergyConsumed + maintenanceDiff);
    gameVars.setMultipliers({
      ...gameVars.multipliers,
      concreteMultiplier:
        currentMultipliers.concreteMultiplier +
        newConcreteMulti -
        oldConcreteMulti,
      metalsMultiplier:
        currentMultipliers.metalsMultiplier + newMetalsMulti - oldMetalsMulti,
      crystalsMultiplier:
        currentMultipliers.crystalsMultiplier +
        newCrystalsMulti -
        oldCrystalsMulti,
      dieselMultiplier:
        currentMultipliers.dieselMultiplier + newDieselMulti - oldDieselMulti,
    });
    return;
  }

  // ✨ Hospital simply increase Happiness based on: hospital's workers * hospital output
};
