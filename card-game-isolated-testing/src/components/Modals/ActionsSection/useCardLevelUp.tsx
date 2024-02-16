import React, { SetStateAction } from "react";
import { CardLevel, CardRequirements, Level } from "../../../types";
import { AxiosError } from "axios";
import {
  updateCardData,
  updatePlayerData as updatePlayerDataSQL,
} from "../../../../api/apiFns";
import BuildingCard from "../../../classes/buildingClass_V2";
import RegCard from "../../../classes/regClass_V2";
import SPCard from "../../../classes/spClass_V2";
import { hasEnoughResources, subtractResources } from "../../../utils/game";
import { useToastConfetti, useToastError } from "../../../hooks/notifications";
import { useGameVarsStore } from "../../../stores/gameVars";
import { isRegCard } from "../../../types/TypeGuardFns/RegGuards";
import { isBuildingCard } from "../../../types/TypeGuardFns/BuildingGuards";
import { update_LVL_REG_RelatedGameVars } from "../../../stores/utils/cardLevelUp/update_LVL_REG_RelatedGameVars";
import { update_LVL_BuildingRelatedGameVars } from "../../../stores/utils/cardLevelUp/update_LVL_BuildingRelatedGameVars";

interface levelUpCardArgs {
  card: BuildingCard | RegCard | undefined;
  playerResources: CardRequirements;
  playerId: number;
}

interface Props {
  setCardLevel: React.Dispatch<SetStateAction<Level | CardLevel>>;
}

const useCardLevelUp = ({ setCardLevel }: Props) => {
  const updatePlayerData = useGameVarsStore((state) => state.updatePlayerData);

  const toastConfetti = useToastConfetti();
  const toastError = useToastError();
  const gameVars = useGameVarsStore((state) => state);

  const levelUpCard = async ({
    card,
    playerResources,
    playerId,
  }: levelUpCardArgs) => {
    if (
      (card instanceof BuildingCard || card instanceof RegCard) &&
      card.id !== null
    ) {
      const oldCard = { output: card.output, maintenance: card.maintenance };

      // 🔷 Checking If Player has enough resources
      const alertFlags = hasEnoughResources({
        playerResources: playerResources,
        requirements: card.requirements,
      });

      // 🔷 If Player does NOT has enough resources
      if (alertFlags.length > 0) {
        toastError.showError(
          "Low on Resources",
          "😬 You are short on the following Resources: ",
          alertFlags.join(", ")
        );
      }

      // 🔷 If Card is NOT a SP && Level is NOT MAX
      if (!(card instanceof SPCard) && card.level === 5) {
        toastError.showError(
          "MAX Level",
          "😅 Your Card is at the Maximum Level! It can not be leveled Up any further"
        );
        return;
      }

      card.levelUp(); // 🔷 2. Update Card Internally

      // 🔷 If All are good...
      try {
        const success_card = await updateCardData({
          id: card.id,
          level: card.level,
        }); // 🔷 1.  Update Card in MySQL
        if (!success_card)
          throw new Error(
            "⛔ ActionsSection: levelUp: Card was not updated in DB! Probably it does not exists"
          );

        setCardLevel(card.level); // 🔷 3. Update Parent State to trigger Re-render

        console.log("1 - OLD RESOURECES: ", playerResources);

        // 🔷 4. Subtracks the Resources.
        const newPlayerResources = subtractResources({
          playerResources: playerResources,
          requirements: card.requirements,
        });

        console.log("2 - NEW RESOURECES: ", newPlayerResources);

        // 🔷 5. Updates the Resources of GameVars Store
        updatePlayerData(newPlayerResources);

        // 6. Update MySQL Player Data
        const success_playerData = await updatePlayerDataSQL(
          playerId,
          newPlayerResources
        );
        if (!success_playerData)
          throw new Error(
            "⛔ ActionsSection: levelUp: Player Resources were not updated in DB!"
          );

        toastConfetti.show(
          "Leveled Up Card",
          `💪 Awesome! You just leveled Up your ${card.name}!`
        );

        // 🔷 8. Update the Stats of GameVars Store
        if (isRegCard(card)) {
          update_LVL_REG_RelatedGameVars(
            oldCard as Partial<RegCard>,
            card,
            gameVars
          );
        }
        if (isBuildingCard(card)) {
          update_LVL_BuildingRelatedGameVars(
            oldCard as Partial<BuildingCard>,
            card,
            gameVars
          );
        }

        console.log("⚡+✅ - In Backend: Card Successfully Leveled Up: ", card);
      } catch (error) {
        toastError.showError(
          "There was an Error!",
          "levelUp: Something went wrong!"
        );
        throw new Error(
          "⛔ ActionsSection: levelUp: Card was not updated in DB!",
          error as AxiosError
        );
      }
    }
  };

  return { levelUpCard };
};

export default useCardLevelUp;
