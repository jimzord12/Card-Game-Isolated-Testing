import BuildingCard from "../../../classes/buildingClass_V2";
import { GameVarsState } from "../../gameVars";
import { nameToTemplateDataBuilding } from "../../../constants/templates";
import { calcMulti } from "../../../hooks/initialization/utils/calcMulti";
import { isToolStore } from "../../../types/TypeGuardFns/isToolStore";

export const updateBuildingRelatedGameVars = (
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
      currentHappinessFromBuildings + output.boost
    );
    gameVars.setPopGrowthRate(currentPopGrowthRate + output.boost);
    gameVars.setEnergyConsumed(currentEnergyConsumed + maintenance.energy);

    console.log(
      "Activating AmusementPark | HFB: ",
      currentHappinessFromBuildings + output.boost
    );
    return;
  }

  // ✨ RadioStation
  if (card.name === nameToTemplateDataBuilding.RadioStation.name) {
    const currentEnergyConsumed = gameVars.energyConsumed;
    const currentRadioStationEffectBoost =
      gameVars.radioStationEffectBoost ?? 0;

    gameVars.setRadioStationEffectBoost(
      currentRadioStationEffectBoost + output.boost
    );
    gameVars.setEnergyConsumed(currentEnergyConsumed + maintenance.energy);
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

  // ✨ Hospital
  if (card.name === nameToTemplateDataBuilding.Hospital.name) {
    const currentEnergyConsumed = gameVars.energyConsumed;

    gameVars.setEnergyConsumed(currentEnergyConsumed + maintenance.energy);
    return;
  }
};
