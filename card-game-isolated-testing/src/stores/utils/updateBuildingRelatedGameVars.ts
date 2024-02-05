import BuildingCard from "../../classes/buildingClass_V2";
import { GameVarsState } from "../gameVars";
import { nameToTemplateDataBuilding } from "../../constants/templates";
import { calcMulti } from "../../hooks/initialization/utils/calcMulti";
import { isToolStore } from "../../types/TypeGuardFns/isToolStore";

export const updateBuildingRelatedGameVars = (
  card: BuildingCard,
  gameVars: GameVarsState
) => {
  const { output, maintenance } = card;

  // ✨ AmusementPark
  if (card.name === nameToTemplateDataBuilding.AmusementPark.name) {
    const currentEnergyConsumed = gameVars.energyConsumed;
    const currentHappiness = gameVars.happiness;

    gameVars.setHappiness(currentHappiness + output.boost);
    gameVars.setEnergyConsumed(currentEnergyConsumed + maintenance.energy);
    return;
  }

  // ✨ RadioStation
  if (card.name === nameToTemplateDataBuilding.RadioStation.name) {
    const currentEnergyConsumed = gameVars.energyConsumed;

    gameVars.setEffectboost(output.boost);
    gameVars.setEnergyConsumed(currentEnergyConsumed + maintenance.energy);
    return;
  }

  // ✨ ToolStore
  if (card.name === nameToTemplateDataBuilding.ToolStore.name) {
    if (!isToolStore(card))
      throw new Error("⛔ updateBuildingRelatedGameVars: Not a ToolStore card");

    const cardMultipliers = calcMulti(card);
    
    gameVars.setMultipliers({
      ...gameVars.multipliers,
      goldMultiplier: cardMultipliers.gold,
      concreteMultiplier: cardMultipliers.concrete,
      metalsMultiplier: cardMultipliers.metals,
      crystalsMultiplier: cardMultipliers.crystals,
    });
    return;
  }

  // ✨ For Hopsital and ToolStore, check the
};
