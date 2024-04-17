import BuildingCard from "../../../classes/buildingClass_V2";
import { GameVarsState } from "../../gameVars";
import { nameToTemplateDataBuilding } from "../../../constants/templates";
import { calcMultiToolStore } from "../../../hooks/initialization/utils/calcMultiToolStore";
import { isToolStore } from "../../../types/TypeGuardFns/isToolStore";
import { round2Decimal } from "../../../utils/game/roundToDecimal";

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

  // ✨ Hospital
  if (card.name === nameToTemplateDataBuilding.Hospital.name) {
    const currentEnergyConsumed = gameVars.energyConsumed;
    const currentHappinessFromBuildings = gameVars.happinessFromBuildings;
    const currentPopGrowthRate = gameVars.popGrowthRate;
    const activeDoctors = gameVars.allWorkers.hospitalWorkers;
    const hopsitalBoost = activeDoctors * output.boost;

    gameVars.setHappinessFromBuildings(
      currentHappinessFromBuildings + hopsitalBoost
    );
    gameVars.setPopGrowthRate(currentPopGrowthRate + hopsitalBoost);
    gameVars.setEnergyConsumed(currentEnergyConsumed + maintenance.energy);
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
    if (!isToolStore(card)) {
      console.log(
        "⛔ updateBuildingRelatedGameVars: Not a ToolStore card",
        card
      );
      throw new Error("⛔ updateBuildingRelatedGameVars: Not a ToolStore card");
    }

    const currentMultipliers = gameVars.multipliers;
    const CardMultipliers = calcMultiToolStore(card);
    console.log("2 - KKKKKKK: ", CardMultipliers);

    const currentEnergyConsumed = gameVars.energyConsumed;

    gameVars.setEnergyConsumed(currentEnergyConsumed + maintenance.energy);
    gameVars.setMultipliers({
      ...gameVars.multipliers,
      goldMultiplier: round2Decimal(
        currentMultipliers.goldMultiplier * CardMultipliers.gold
      ),
      concreteMultiplier: round2Decimal(
        currentMultipliers.concreteMultiplier * CardMultipliers.concrete
      ),
      metalsMultiplier: round2Decimal(
        currentMultipliers.metalsMultiplier * CardMultipliers.metals
      ),
      crystalsMultiplier: round2Decimal(
        currentMultipliers.crystalsMultiplier * CardMultipliers.crystals
      ),
      dieselMultiplier: round2Decimal(
        currentMultipliers.dieselMultiplier * CardMultipliers.diesel
      ),
    });
    return;
  }
};
