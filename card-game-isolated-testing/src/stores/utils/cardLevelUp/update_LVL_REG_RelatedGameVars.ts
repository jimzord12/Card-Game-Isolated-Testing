import { GameVarsState } from "../../gameVars";
import RegCard from "../../../classes/regClass_V2";

export const update_LVL_REG_RelatedGameVars = (
  oldCard: Partial<RegCard>,
  card: RegCard,
  gameVars: GameVarsState
) => {
  const { output, maintenance } = card;
  const { output: oldOutput, maintenance: oldMaintenance } = oldCard;
  console.log("new output: ", output);
  console.log("old output: ", oldOutput);
  console.log("new maintenance: ", maintenance);
  console.log("old maintenance: ", oldMaintenance);

  const currentEnergyProduced = gameVars.energyProduced;
  const currentExpences = gameVars.expences;
  console.log("currentEnergyProduced: ", currentEnergyProduced);
  console.log("currentExpences: ", currentExpences);

  const outputDiff = output.energy - oldOutput!.energy;
  const maintenanceDiff = maintenance.gold - oldMaintenance!.gold;
  console.log("outputDiff: ", outputDiff);
  console.log("maintenanceDiff: ", maintenanceDiff);

  gameVars.setEnergyProduced(currentEnergyProduced + outputDiff);
  gameVars.setExpences(currentExpences + maintenanceDiff);

  // ✨ For Hopsital and ToolStore, check the
};
