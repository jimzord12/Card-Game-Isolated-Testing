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

interface LabelTopIconProps {
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

const LabelTopIcon = ({
  size,
  image,
  value,
  labelType,
  valueType,
  desc,
  labelImages,
  isStoryBook,
}: LabelTopIconProps) => {
  return (
    <div className="relative flex flex-col items-center w-fit h-fit">
      <div className={`flex justify-center ${styles.topIconSize[size]} z-10 `}>
        <img src={image} alt="An image" className="object-contain" />
      </div>
      <div className={`${styles.topIconPositionY[size]}`}>
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

export default LabelTopIcon;
