import { LabelsImageGroup, Level, labelImages } from "../../../types";
import LabelLeftLvlIndicator from "./Parts/LeftLabelToolStore/LabelLeftLvlIndicator";

interface LabelWithLvlIndicatorProps {
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

const LabelWithLvlIndicator = ({
  size,
  value,
  labelType,
  valueType,
  desc,
  labelImages,
  isStoryBook,
  levelToDisplay,
}: LabelWithLvlIndicatorProps) => {
  return (
    <LabelLeftLvlIndicator
      size={size}
      value={value}
      levelToDisplay={levelToDisplay}
      labelType={labelType}
      valueType={valueType}
      desc={desc}
      labelImages={labelImages}
      isStoryBook={isStoryBook}
    />
  );
};

export default LabelWithLvlIndicator;
