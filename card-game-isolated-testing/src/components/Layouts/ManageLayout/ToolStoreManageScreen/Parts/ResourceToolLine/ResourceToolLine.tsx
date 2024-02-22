import { UseGlobalContext } from "../../../../../../context/GlobalContext/GlobalContext";
import { ToolStoreResources, ToolStoreType } from "../../../../../../types";
import ToolUpgradeBtn from "./Parts/ToolUpgradeBtn/ToolUpgradeBtn";
import ToolUpgradeDiff from "./Parts/ToolUpgradeDiff/ToolUpgradeDiff";
import styles from "./resourceToolLineConstants";

interface ResourceToolLineProps {
  card: ToolStoreType;
  resType: ToolStoreResources;
  size: "extraSmall" | "small" | "medium" | "large";
}

const ResourceToolLine = ({ card, resType, size }: ResourceToolLineProps) => {
  const { images } = UseGlobalContext();
  if (images === undefined)
    throw new Error("⛔ ResourceToolLine.tsx, images is undefined!");

  const imgMapping = {
    crystals: images.gameIcons.crystalsCircularGameIcon,
    concrete: images.gameIcons.concreteCircularGameIcon,
    metals: images.gameIcons.metalsCircularGameIcon,
    diesel: images.gameIcons.dieselBarrelCircularGameIcon,
  };

  return (
    <div
      className="flex gap-4 p-2 w-fit justify-center items-center"
      about={`${resType}-ResourceTool-Line`}
    >
      <img
        src={imgMapping[resType]}
        className={`object-contain ${styles.resourceToolLineSize[size]}`}
        alt="Concrete Tool"
      />
      <div className="bg-slate-500/[0.7] rounded-2xl p-2 border-2">
        <div className="flex justify-center items-center">
          <ToolUpgradeDiff
            card={card}
            labelImages={images.labels}
            size={size}
            toolType={resType}
          />
          <div className="w-[30px]" />
          <ToolUpgradeBtn
            card={card}
            onClick={() => console.log("Clicked!")}
            size={size}
            toolType={resType}
          />
        </div>
      </div>
    </div>
  );
};

export default ResourceToolLine;
