import { UseGlobalContext } from "../../../../../../../../context/GlobalContext/GlobalContext";
import {
  BuildingStats,
  LabelsImageGroup,
  Level,
  ToolStoreType,
  labelImages,
} from "../../../../../../../../types";
import LabelWithLvlIndicator from "../../../../../../../Labels/LabelWithLvlIndicator/LabelWithLvlIndicator";
import styles from "./toolUpgradeDiffConstants";

interface ToolUpgradeDiffProps {
  labelImages: labelImages | LabelsImageGroup;
  size: "extraSmall" | "small" | "medium" | "large";
  isStoryBook?: boolean;
  card: ToolStoreType;
  toolType: keyof BuildingStats;
}

const ToolUpgradeDiff = ({
  labelImages,
  size,
  isStoryBook,
  card,
  toolType,
}: ToolUpgradeDiffProps) => {
  const { images } = UseGlobalContext();

  const currentToolLevel = card.stats[toolType] as Level;
  const newToolLevel = (currentToolLevel + 1) as Level;
  const currentToolBoost = currentToolLevel * card.output.boost;
  const newToolBoost = newToolLevel * card.output.boost;

  return (
    <div className="flex">
      <LabelWithLvlIndicator
        labelImages={labelImages}
        labelType="rusty"
        size={size}
        value={currentToolBoost}
        levelToDisplay={currentToolLevel}
        valueType={{
          type: "%",
        }}
        // desc={
        //   size === "small"
        //     ? {
        //         text: "Old Boost",
        //       }
        //     : undefined
        // }
        isStoryBook={isStoryBook}
      />
      <img
        className={`object-contain ${styles.toolUpgradeArrowSize[size]} mr-1 tablet:mr-2`}
        src={images?.gameIcons.blueLevelUpArrowGameIcon}
        alt="Simple Arrow"
      />
      <LabelWithLvlIndicator
        labelImages={labelImages}
        labelType="rusty"
        size={size}
        value={newToolBoost}
        levelToDisplay={newToolLevel}
        valueType={{
          type: "%",
        }}
        // desc={
        //   size === "small"
        //     ? {
        //         text: "New Boost",
        //       }
        //     : undefined
        // }
        isStoryBook={isStoryBook}
      />
    </div>
  );
};

export default ToolUpgradeDiff;
