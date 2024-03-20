import { toolStoreToolsCostsPerLevel } from "../../../../../../../../constants/game/buildingsConfig";
import { UseGlobalContext } from "../../../../../../../../context/GlobalContext/GlobalContext";
import {
  useToastConfetti,
  useToastError,
} from "../../../../../../../../hooks/notifications";
import { useGameVarsStore } from "../../../../../../../../stores/gameVars";
import { useModalStore } from "../../../../../../../../stores/modalStore";
import {
  BuildingStats,
  CardRequirements,
  Level,
  ToolStoreType,
} from "../../../../../../../../types";
import { subtractResources } from "../../../../../../../../utils/game";
import ConfirmationModal from "../../../../../../../Modals/ConfirmationModal/ConfirmationModal";
import {
  updateCardStats,
  updatePlayerData,
} from "../../../../../../../../../api/apiFns";
import LoadingModal from "../../../../../../../Modals/LoadingModal/LoadingModal";
import { waitFor } from "../../../../../../../../utils/general/waitPlease";
import { useEffect, useState } from "react";
import { round2Decimal } from "../../../../../../../../utils/game/roundToDecimal";
import { calcMultiToolStore } from "../../../../../../../../hooks/initialization/utils";

interface ToolUpgradeBtnProps {
  onClick: () => void;
  card: ToolStoreType;
  size: "extraSmall" | "small" | "medium" | "large";
  toolType: keyof BuildingStats;
}

const ToolUpgradeBtn = ({
  card,
  onClick,
  size,
  toolType,
}: ToolUpgradeBtnProps) => {
  const { images } = UseGlobalContext();
  const { showError } = useToastError();
  const { show } = useToastConfetti();
  const pushModal = useModalStore((state) => state.pushModal);
  const popModal = useModalStore((state) => state.popModal);
  const gameVars = useGameVarsStore();

  const [isLoading, setIsLoading] = useState(false);

  const arrowSize = {
    extraSmall: "w-[40px] p-1",
    small: "w-[80px] p-2",
    medium: "w-[125px] p-4",
    large: "w-[175px] p-4",
  };

  const toolLevel = card.stats[toolType];

  const isDisabled = toolLevel === 5 || toolLevel >= card.level;

  const toolStoreNeedsLvlUp = toolLevel >= card.level;

  const toolUpgradeCost =
    toolStoreToolsCostsPerLevel[toolType][(toolLevel + 1) as Level];

  useEffect(() => {
    if (isLoading) {
      pushModal(<LoadingModal />);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleClick = () => {
    console.log("Upgrading Tool...");

    pushModal(
      <ConfirmationModal
        title="Tool Upgrade Confirmation"
        message={`[${toolUpgradeCost}] Gold are reuqired to level up the [${toolType}] Tool`}
        onConfirm={() => {
          setIsLoading(true);
          handleToolUpgrade();
        }}
      />
    );
    // showError("Logic Not Implemented", "This feature is not implemented yet!");
    // return;
    if (toolStoreNeedsLvlUp) {
      showError("ToolStore Level too Low", "You need to be level it up first!");
      return;
    }
    onClick();
  };

  const handleToolUpgrade = async () => {
    const player = gameVars.player;
    if (player === null || player === undefined)
      throw new Error("⛔ ToolUpgradeBtn: player is null or undefined!");

    const playerGold = player.gold;
    if (playerGold === null || playerGold === undefined)
      throw new Error("⛔ ToolUpgradeBtn: playerGold is null or undefined!");

    if (playerGold < toolUpgradeCost) {
      showError(
        "Insufficient Gold",
        "You don't have enough gold to upgrade this tool!"
      );
      return;
    }

    if (
      player === null ||
      player.gold === null ||
      player.concrete === null ||
      player.metals === null ||
      player.crystals === null ||
      player.population === null ||
      player.diesel === null
    ) {
      showError(
        "There was an Error!",
        "checkAndSubtractRes: Something is null!"
      );
      throw new Error("⛔ ToolUpgradeBtn: handleToolUpgrade: Player is null!");
    }

    const playerResources: CardRequirements = {
      gold: player.gold,
      concrete: player.concrete,
      metals: player.metals,
      crystals: player.crystals,
      population: player.population,
      diesel: player.diesel,
    };
    const requirements = {
      gold: toolUpgradeCost,
      concrete: 0,
      metals: 0,
      crystals: 0,
      population: 0,
      diesel: 0,
    };

    const newResources = subtractResources({ playerResources, requirements });
    const oldMultipliers = calcMultiToolStore(card);
    card.levelUpTool(toolType);

    try {
      if (card.id === null || card.id === undefined) {
        showError(
          "ErrorCode: ToolStore-001: Upgrading Tool Error",
          "There was an error upgrading the tool!"
        );
        throw new Error("⛔handleToolUpgrade: Card ID is null or undefined!");
      }

      const responseCardStats = await updateCardStats(card.id, {
        [toolType]: card.stats[toolType],
      });
      const responsePlayerData = await updatePlayerData(player.id, {
        gold: newResources.gold,
      });

      await waitFor(1.2);

      const currentMultipliers = gameVars.multipliers;
      const CardMultipliers = calcMultiToolStore(card);
      const cardMultiDiff =
        CardMultipliers[toolType] - oldMultipliers[toolType];
      gameVars.setMultipliers({
        ...currentMultipliers,
        [`${toolType}Multiplier`]: round2Decimal(
          currentMultipliers[`${toolType}Multiplier`] + cardMultiDiff
        ),
      });

      switch (toolType) {
        case "concrete":
          console.log(
            "1 - DDDDDDDDDDDDDDDDDDDDDDDDDDDD: ",
            gameVars.allWorkers
          );
          console.log("2 - DDDDDDDDDDDDDDDDDD: ", gameVars.multipliers);

          gameVars.setConcreteGathRate(
            gameVars.allWorkers.concreteWorkers *
              (cardMultiDiff + gameVars.multipliers.concreteMultiplier)
          );
          break;
        case "metals":
          gameVars.setMetalsGathRate(
            gameVars.allWorkers.metalsWorkers *
              (cardMultiDiff + gameVars.multipliers.metalsMultiplier)
          );
          break;
        case "crystals":
          gameVars.setCrystalsGathRate(
            gameVars.allWorkers.crystalsWorkers *
              (cardMultiDiff + gameVars.multipliers.crystalsMultiplier)
          );
          break;
        case "diesel":
          gameVars.setDieselGathRate(
            gameVars.allWorkers.dieselWorkers *
              (gameVars.multipliers.dieselMultiplier + cardMultiDiff)
          );
          break;

        default:
          break;
      }

      if (responseCardStats && responsePlayerData) {
        gameVars.updatePlayerData({ gold: newResources.gold });

        show("✨ Tool Upgraded!");
      } else {
        showError(
          "ErrorCode: ToolStore-002: Error Upgrading Tool",
          "There was an error upgrading the tool!"
        );
      }
    } catch (error) {
      showError(
        "ErrorCode: ToolStore-003: Error Upgrading Tool",
        "There was an error upgrading the tool!"
      );
      console.error("🔴 Error Upgrading Tool: ", error);
    } finally {
      popModal();
      setIsLoading(false);
    }
  };

  return (
    <>
      {isDisabled ? (
        <div
          className={`rounded-2xl bg-emerald-200/50 w-fit border-2 grayscale`}
          onClick={() => {
            console.log("Tool is already at max level!");
          }}
        >
          <img
            src={images?.gameIcons.greenArrowUpgradeGameIcon}
            alt="Tool Upgrade Btn"
            className={`object-contain ${arrowSize[size]}`}
          />
        </div>
      ) : (
        <div
          className={`rounded-2xl bg-emerald-200/50 w-fit hover:bg-sky-600/50 border-2`}
          onClick={handleClick}
        >
          <img
            src={images?.gameIcons.greenArrowUpgradeGameIcon}
            alt="Tool Upgrade Btn"
            className={`object-contain ${arrowSize[size]}`}
          />
        </div>
      )}
    </>
  );
};

export default ToolUpgradeBtn;
