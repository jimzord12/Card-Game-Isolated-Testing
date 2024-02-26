import { UseGlobalContext } from "../../../../../../context/GlobalContext/GlobalContext";
import {
  BuildingStats,
  LabelsImageGroup,
  Level,
  ToolStoreResources,
  ToolStoreType,
  labelImages,
} from "../../../../../../types";
import LabelWithLvlIndicator from "../../../../../Labels/LabelWithLvlIndicator/LabelWithLvlIndicator";
import styles from "./resourceToolCurrentConstants";

interface ResourceToolLineProps {
  card: ToolStoreType;
  labelImages: labelImages | LabelsImageGroup;
  resType: ToolStoreResources;
  toolType: keyof BuildingStats;
  size: "extraSmall" | "small" | "medium" | "large";
  isStoryBook?: boolean;
}

const ResourceToolLine = ({
  labelImages,
  card,
  resType,
  size,
  toolType,
  isStoryBook = false,
}: ResourceToolLineProps) => {
  const { images } = UseGlobalContext();
  if (images === undefined)
    throw new Error("⛔ ResourceToolLine.tsx, images is undefined!");

  const imgMapping = {
    crystals: images.gameIcons.crystalsCircularGameIcon,
    concrete: images.gameIcons.concreteCircularGameIcon,
    metals: images.gameIcons.metalsCircularGameIcon,
    diesel: images.gameIcons.dieselBarrelCircularGameIcon,
  };

  const currentToolLevel = card.stats[toolType] as Level;
  const currentToolBoost = currentToolLevel * card.output.boost;

  return (
    <div
      className="flex gap-4 p-2 w-fit justify-center items-center"
      about={`${resType}-ResourceTool-Line`}
    >
      <img
        src={imgMapping[resType]}
        className={`object-contain ${styles.resourceToolCurrentSize[size]}`}
        alt="Concrete Tool"
      />
      <div className="bg-slate-500/[0.7] rounded-2xl p-2 border-2">
        <div className="flex justify-center items-center">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceToolLine;
