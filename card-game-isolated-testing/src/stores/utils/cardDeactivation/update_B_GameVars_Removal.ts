import BuildingCard from "../../../classes/buildingClass_V2";
import { GameVarsState } from "../../gameVars";
import { nameToTemplateDataBuilding } from "../../../constants/templates";
import { calcMulti } from "../../../hooks/initialization/utils/calcMulti";
import { isToolStore } from "../../../types/TypeGuardFns/isToolStore";

export const update_B_GameVars_Removal = (
  card: BuildingCard,
  gameVars: GameVarsState
) => {
  const { output, maintenance } = card;

  // ✨ AmusementPark
  if (card.name === nameToTemplateDataBuilding.AmusementPark.name) {
    const currentEnergyConsumed = gameVars.energyConsumed;
    const currentPopGrowthRate = gameVars.popGrowthRate;

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
    if (!isToolStore(card))
      throw new Error("⛔ updateBuildingRelatedGameVars: Not a ToolStore card");

    const currentMultipliers = gameVars.multipliers;
    const CardMultipliers = calcMulti(card);

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

  // ✨ For Hopsital and ToolStore, check the
};
