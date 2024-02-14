import { LabelsImageGroup } from "../../../../types";
import Label from "../../Label/Label";
import { styles } from "./labelWithIconConstants";

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
    type: "/h" | "%" | "maxLimit";
    limit?: number;
  };
  desc?: {
    text: string;
    style?: "white" | "black";
  };
  image: string;
  isStoryBook?: boolean;
}

const LabelLeftIcon = ({
  size,
  image,
  value,
  labelType,
  valueType,
  desc,
  labelImages,
  isStoryBook,
}: LabelLeftIconProps) => {
  return (
    <div className="relative flex items-center w-fit h-fit">
      <div className={`flex justify-center ${styles.leftIconSize[size]} z-10 `}>
        <img src={image} alt="An image" className="object-contain" />
      </div>
      <div className={`${styles.leftIconXPosition[size]}`}>
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
