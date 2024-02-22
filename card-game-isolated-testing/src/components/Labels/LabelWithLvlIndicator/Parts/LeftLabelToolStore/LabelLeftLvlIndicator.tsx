import { LabelsImageGroup, Level } from "../../../../../types";
import Label from "../../../Label/Label";
import ToolLevelIndicator from "../ToolLevelIndicator/ToolLevelIndicator";
import { styles } from "../labelLvlIndicatorConstants";

type labelImages = {
  golden: {
    standard: string;
    special: string;
  };
  otherLabels: {
    greenEnergy: string;
    rusty: string;
  };
};

interface LabelLeftIconProps {
  size: "extraSmall" | "small" | "medium" | "large";
  value: number | string;
  labelImages: labelImages | LabelsImageGroup;
  labelType: "golden" | "green" | "rusty" | "special" | "simple";
  valueType?: {
    type?: "/h" | "%" | "maxLimit";
    limit?: number;
    color?: "white" | "black" | "rusty";
    addGrayScale?: "yes" | "no";
  };
  desc?: {
    text: string;
    style?: "white" | "black";
  };
  isStoryBook?: boolean;
  levelToDisplay: Level;
}

const LabelLeftIcon = ({
  size,
  value,
  labelType,
  valueType,
  desc,
  labelImages,
  isStoryBook,
  levelToDisplay,
}: LabelLeftIconProps) => {
  return (
    <div className="relative flex items-center w-fit h-fit">
      <div
        className={`flex justify-center ${styles.leftTSLabelSize[size]} z-10 `}
      >
        <ToolLevelIndicator level={levelToDisplay} size={size} />
      </div>
      <div className={`${styles.leftTSLabelXPosition[size]}`}>
        <Label
          type={labelType}
          value={value}
          valueType={valueType}
          desc={desc}
          size={size}
          labelImages={labelImages}
          isStoryBook={isStoryBook}
        />
      </div>
    </div>
  );
};

export default LabelLeftIcon;
