import { updatePlayerData } from "../../../../../../api/apiFns";
import {
  concreteQuarryConstants,
  crystalsQuarryConstants,
  dieselQuarryConstants,
  metalsQuarryConstants,
  quarryLevelCost,
} from "../../../../../constants/game/quarriesConfig";
import { UseGlobalContext } from "../../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../../hooks/game/useGetLabelsSize";
import {
  useToastConfetti,
  useToastError,
} from "../../../../../hooks/notifications";
import { useGameVarsStore } from "../../../../../stores/gameVars";
import { useModalStore } from "../../../../../stores/modalStore";
import { Level, QuarryType } from "../../../../../types";
import { round2Decimal } from "../../../../../utils/game/roundToDecimal";
import ConfirmationModal from "../../../../Modals/ConfirmationModal/ConfirmationModal";
import styles from "./styles";

interface Props {
  type: QuarryType;
}

const QuarryLevelUpBtn = ({ type }: Props) => {
  const { images } = UseGlobalContext();

  const gameVars = useGameVarsStore();
  const pushModal = useModalStore((state) => state.pushModal);

  const { showError } = useToastError();
  const { show } = useToastConfetti();
  if (images === undefined || images === null)
    throw new Error("⛔ QuarryLevelUpBtn.tsx, images is undefined | null!");
  const deviceSize = useGetLabelsSize();
  const quarryLevel = gameVars.quarryLevels[type];

  const handleQuarryLevelUp = async () => {
    const requiredGold = quarryLevelCost[quarryLevel as Level];
    const playerGold = gameVars.player?.gold ?? 0;
    const playerId = gameVars.player?.id;

    if (quarryLevel === undefined || quarryLevel === null) {
      showError("Code Error", "Quarry Level is undefined | null!");
      throw new Error("⛔ QuarryLevelUpBtn: quarryLevel is undefined | null!");
    }

    // Max Level Reached
    if (quarryLevel === 5) {
      showError("Max Level Reached", "Quarry is already at Max Level.");
      return;
    }

    if (playerId === undefined) {
      showError("Code Error", "Player Id is undefined!");
      throw new Error("⛔ QuarryLevelUpBtn: playerId is undefined!");
    }

    if (playerGold === 0) {
      showError(
        "Low on Gold",
        "Your Gold is not Sufficient",
        `Current Gold: ${playerGold}`
      );
      return;
    }

    if (playerGold < requiredGold) {
      showError(
        "Insuffient Gold",
        "To level up the Quarry, more gold is required.",
        `You need ${round2Decimal(requiredGold - playerGold)} more Gold.`
      );
      return;
    }

    gameVars.setQuarryLevel(type, quarryLevel + 1); // Update Client Side State
    gameVars.updatePlayerData({ gold: playerGold - requiredGold }); // Update Client Side State

    const quarryProperty = propertyMapper[type];
    try {
      // Update Database State
      await updatePlayerData(playerId, {
        gold: playerGold - requiredGold,
        [`${quarryProperty}`]: quarryLevel + 1,
      });

      show(
        "Quarry Leveled Up!",
        `Now you can assign more workers to this Quarry!`
      );
    } catch (error) {
      console.error("QuarryLevelUpBtn: Error updating player data", error);
      showError(
        "Server Error",
        "Failed to Level Up Quarry. Please try again later."
      );
    }
  };

  const propertyMapper = {
    concrete: "concrete_quarry_lvl",
    crystals: "crystals_quarry_lvl",
    metals: "metals_quarry_lvl",
    diesel: "diesel_quarry_lvl",
  };

  const openConfirmationModal = () => {
    let quarryConstants;

    switch (type) {
      case "concrete":
        quarryConstants = concreteQuarryConstants;
        break;
      case "crystals":
        quarryConstants = crystalsQuarryConstants;
        break;
      case "metals":
        quarryConstants = metalsQuarryConstants;
        break;

      case "diesel":
        quarryConstants = dieselQuarryConstants;
        break;

      default:
        console.log("⛔ QuarryLevelUpBtn: Invalid Quarry Type!", type);
        throw new Error("⛔ QuarryLevelUpBtn: Invalid Quarry Type!");
    }
    pushModal(
      <ConfirmationModal
        title="Level Up Quarry"
        message={`The required Gold is [${
          quarryLevelCost[gameVars.quarryLevels[type] as Level]
        }] and your Workers Capacity will increase from [${
          quarryConstants.maxWorkers[gameVars.quarryLevels[type] as Level]
        }] -> [${
          quarryConstants.maxWorkers[(gameVars.quarryLevels[type] + 1) as Level]
        }]. Proceed?`}
        onConfirm={handleQuarryLevelUp}
      />
    );
  };

  return (
    <div
      className="w-fit p-2 border-2 largeScreen:p-4 largeScreen:border-4 rounded-xl bg-slate-700/70 hover:bg-emerald-700/60"
      style={{
        filter: quarryLevel === 5 ? "grayscale(100%)" : "grayscale(0%)",
        cursor: quarryLevel === 5 ? "not-allowed" : "pointer",
      }}
      onClick={
        quarryLevel === 5
          ? () =>
              showError("Max Level Reached", "Quarry is already at Max Level.")
          : openConfirmationModal
      }
    >
      <img
        className={`object-contain ${styles.imgSize[deviceSize]}`}
        src={images.gameIcons.greenArrowUpgradeGameIcon}
        alt="Go Back Arrow"
      />
    </div>
  );
};

export default QuarryLevelUpBtn;
