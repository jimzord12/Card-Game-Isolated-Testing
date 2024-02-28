import { updatePlayerData } from "../../../../../../api/apiFns";
import { quarryLevelCost } from "../../../../../constants/game/quarriesConfig";
import { UseGlobalContext } from "../../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../../hooks/game/useGetLabelsSize";
import {
  useToastConfetti,
  useToastError,
} from "../../../../../hooks/notifications";
import { useGameVarsStore } from "../../../../../stores/gameVars";
import { useModalStore } from "../../../../../stores/modalStore";
import { Level, QuarryType } from "../../../../../types";
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

  const handleQuarryLevelUp = () => {
    const quarryLevel = gameVars.quarryLevels[type];
    const requiredGold = quarryLevelCost[quarryLevel as Level];
    const playerGold = gameVars.player?.gold ?? 0;
    const playerId = gameVars.player?.id;

    if (playerId === undefined)
      throw new Error("⛔ QuarryLevelUpBtn: playerId is undefined!");

    if (playerGold === 0) {
      showError("Game Error!", "QuarryLevelUpBtn.tsx: Player Gold is 0");
      return;
    }

    if (playerGold < requiredGold) {
      showError(
        "Insuffient Gold",
        "To level up the Quarry, more gold is required."
      );
      return;
    }

    show(
      "Quarry Leveled Up!",
      `Now you can assign more workers to this Quarry!`
    );
    gameVars.setQuarryLevel(type, quarryLevel + 1); // Update Client Side State
    gameVars.updatePlayerData({ gold: playerGold - requiredGold }); // Update Client Side State

    const quarryProperty = propertyMapper[type];
    updatePlayerData(playerId, {
      gold: playerGold - requiredGold,
      [`${quarryProperty}`]: quarryLevel + 1,
    }); // Update Server Side State
  };

  const propertyMapper = {
    concrete: "concrete_quarry_lvl",
    crystals: "crystals_quarry_lvl",
    metals: "metals_quarry_lvl",
    diesel: "diesel_quarry_lvl",
  };

  const openConfirmationModal = () => {
    pushModal(
      <ConfirmationModal
        title="Level Up Quarry"
        message={`Required Gold: [${
          quarryLevelCost[gameVars.quarryLevels[type] as Level]
        }] is needed to level up the Quarry. Proceed?`}
        onConfirm={handleQuarryLevelUp}
      />
    );
  };

  return (
    <div
      className="w-fit p-2 border-2 largeScreen:p-4 largeScreen:border-4 rounded-xl bg-slate-700/70 hover:bg-emerald-700/60"
      onClick={openConfirmationModal}
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
