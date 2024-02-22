import { UseGlobalContext } from "../../../../../../../../context/GlobalContext/GlobalContext";
import { useToastError } from "../../../../../../../../hooks/notifications";
import { BuildingStats, ToolStoreType } from "../../../../../../../../types";

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

  const arrowSize = {
    extraSmall: "w-[40px] p-1",
    small: "w-[80px] p-2",
    medium: "w-[125px] p-4",
    large: "w-[175px] p-4",
  };

  const isDisabled =
    card.stats[toolType] === 5 || card.stats[toolType] >= card.level;
  const toolStoreNeedsLvlUp = card.stats[toolType] >= card.level;

  const handleUpgrade = () => {
    console.log("Upgrading Tool...");
    showError("Logic Not Implemented", "This feature is not implemented yet!");
    return;
    if (toolStoreNeedsLvlUp) {
      showError("ToolStore Level too Low", "You need to be level it up first!");
      return;
    }
    card.levelUpTool(toolType);
    onClick();
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
          onClick={handleUpgrade}
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
