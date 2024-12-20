import { CardRequirements, Level } from "../../../types";
import { AxiosError } from "axios";
import { updatePlayerData as updatePlayerDataSQL } from "../../../../api/apiFns";
import { hasEnoughResources, subtractResources } from "../../../utils/game";
import { useToastConfetti, useToastError } from "../../../hooks/notifications";
import { useGameVarsStore } from "../../../stores/gameVars";
import {
  townhallRequirements,
  factoryRequirements,
} from "../../../constants/game/defaultBuildingsConfig";

interface levelUpCardArgs {
  //   currentLevel: Level;
  playerResources: CardRequirements;
  playerId: number;
  contentType: "townhall" | "factory";
}

const useDefaultBuildingLevelUp = () => {
  const updatePlayerData = useGameVarsStore((state) => state.updatePlayerData);
  const townhallLevel = useGameVarsStore((state) => state.townhallLevel);
  const setTownhallLevel = useGameVarsStore((state) => state.setTownhallLevel);

  const factoryLevel = useGameVarsStore((state) => state.factoryLevel);
  const setFactoryLevel = useGameVarsStore((state) => state.setFactoryLevel);

  const toastConfetti = useToastConfetti();
  const toastError = useToastError();

  const levelUpDefaultBuilding = async ({
    // currentLevel,
    playerResources,
    playerId,
    contentType,
  }: levelUpCardArgs) => {
    if (contentType === "townhall") {
      // 🔷 If Card's Level is MAX
      if (townhallLevel === 5) {
        toastError.showError(
          "MAX Level",
          "😅 Your Townhall is at the Maximum Level! It can not be leveled Up any further"
        );
        return false;
      }

      // 🔷 Checking If Player has enough resources
      const alertFlags = hasEnoughResources({
        playerResources: playerResources,
        requirements: townhallRequirements[townhallLevel],
      });

      console.log(
        " [2] - useDefaultBuildingLevelUp: hasEnoughResources => hasEnoughResources: ",
        alertFlags
      );

      // 🔷 If Player does NOT has enough resources
      if (alertFlags.length > 0) {
        toastError.showError(
          "Low on Resources",
          "😬 You are short on the following Resources: ",
          alertFlags.join(", ")
        );
        return false;
      }

      // 🔷 If All are good...
      const newTownhallLevel = (townhallLevel + 1) as Level;

      try {
        const success_townhall = await updatePlayerDataSQL(playerId, {
          townhall_lvl: newTownhallLevel,
        }); // 🔷 1.  Update Townhall in MySQL
        if (!success_townhall)
          throw new Error(
            "⛔ ActionsSection: levelUp: Townhall was not updated in DB!"
          );

        setTownhallLevel(newTownhallLevel as Level); // 🔷 2. Update Townhall in Client

        // 🔷 4. Subtracks the Resources.
        const newPlayerResources = subtractResources({
          playerResources: playerResources,
          requirements: townhallRequirements[townhallLevel],
        });

        // 🔷 5. Updates the State of GameVars Store
        updatePlayerData(newPlayerResources);

        // 6. Update MySQL Player Data
        const success_playerData = await updatePlayerDataSQL(
          playerId,
          newPlayerResources
        );
        if (!success_playerData)
          throw new Error(
            "⛔ ActionsSection: levelUp-Townhall: Player Resources were not updated in DB!"
          );

        toastConfetti.show(
          "Leveled Up Card",
          `💪 Awesome! You just leveled Up your Townhall to ${newTownhallLevel}!`
        );
        return true;
      } catch (error) {
        toastError.showError(
          "There was an Error!",
          "levelUp (Townhall): Something went wrong!"
        );
        throw new Error(
          "⛔ ActionsSection: levelUp (Townhall): Card was not updated in DB!",
          error as AxiosError
        );
      }
    }

    if (contentType === "factory") {
      // 🔷 If Card's Level is MAX
      if (factoryLevel === 5) {
        toastError.showError(
          "MAX Level",
          "😅 Your Townhall is at the Maximum Level! It can not be leveled Up any further"
        );
        return false;
      }

      // 🔷 Checking If Player has enough resources
      const alertFlags = hasEnoughResources({
        playerResources: playerResources,
        requirements: factoryRequirements[factoryLevel],
      });

      // 🔷 If Player does NOT has enough resources
      if (alertFlags.length > 0) {
        toastError.showError(
          "Low on Resources",
          "😬 You are short on the following Resources: ",
          alertFlags.join(", ")
        );
        return false;
      }

      // 🔷 If All are good...
      const newFactoryLevel = (factoryLevel + 1) as Level;

      try {
        const success_factory = await updatePlayerDataSQL(playerId, {
          factory_lvl: newFactoryLevel,
        }); // 🔷 1.  Update Townhall in MySQL
        if (!success_factory)
          throw new Error(
            "⛔ ActionsSection: levelUp: Townhall was not updated in DB!"
          );

        setFactoryLevel(newFactoryLevel as Level); // 🔷 2. Update Townhall in Client

        // 🔷 4. Subtracks the Resources.
        const newPlayerResources = subtractResources({
          playerResources: playerResources,
          requirements: factoryRequirements[factoryLevel],
        });

        // 🔷 5. Updates the State of GameVars Store
        updatePlayerData(newPlayerResources);

        // 6. Update MySQL Player Data
        const success_playerData = await updatePlayerDataSQL(
          playerId,
          newPlayerResources
        );
        if (!success_playerData)
          throw new Error(
            "⛔ ActionsSection: levelUp (Factory): Player Resources were not updated in DB!"
          );

        toastConfetti.show(
          "Leveled Up Card",
          `💪 Awesome! You just leveled Up your Factory to ${newFactoryLevel}!`
        );

        return true;
      } catch (error) {
        toastError.showError(
          "There was an Error!",
          "levelUp (Factory): Something went wrong!"
        );
        throw new Error(
          "⛔ ActionsSection: levelUp (Factory): Card was not updated in DB!",
          error as AxiosError
        );
      }
    }
  };

  return { levelUpDefaultBuilding };
};

export default useDefaultBuildingLevelUp;
