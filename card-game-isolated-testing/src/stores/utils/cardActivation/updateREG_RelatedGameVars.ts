import { GameVarsState } from "../../gameVars";
import RegCard from "../../../classes/regClass_V2";

export const updateREG_RelatedGameVars = (
  card: RegCard,
  gameVars: GameVarsState
) => {
  const { output, maintenance } = card;

  const currentEnergyProduced = gameVars.energyProduced;
  const currentExpences = gameVars.expences;

  gameVars.setEnergyProduced(currentEnergyProduced + output.energy);
  gameVars.setExpences(currentExpences + maintenance.gold);

  // ✨ For Hopsital and ToolStore, check the
};
