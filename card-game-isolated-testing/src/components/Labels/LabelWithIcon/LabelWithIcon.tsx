import Label from "../Label/Label";
import { styles } from "./labelWithIconConstants";

type labelImages = {
  // [key in labelType]: string;
  golden: {
    standard: string;
    special: string;
  };
  otherLabels: {
    greenEnergy: string;
    rusty: string;
  };
};

interface LabelWithIconProps {
  size: "small" | "medium" | "large";
  value: number | string;
  labelImages: labelImages;
  labelType: "golden" | "green" | "rusty" | "special" | "simple";
  valueType?: {
    type: "/h" | "%" | "maxLimit";
    limit?: number;
  };
  desc?: {
    text: string;
  };
  image: string;
}

const LabelWithIcon = ({
  size,
  image,
  value,
  labelType,
  valueType,
  desc,
  labelImages,
}: LabelWithIconProps) => {
  return (
    <div className="relative flex flex-col items-center w-fit min-h-full">
      <div className={`flex justify-center ${styles.iconSize[size]} z-10 `}>
        <img src={image} alt="An image" className="object-contain" />
      </div>
      <div className="transform -translate-y-4">
        <Label
          type={labelType}
          value={value}
          valueType={valueType}
          desc={desc}
          size={size}
          labelImages={labelImages}
        />
      </div>
    </div>
  );
};

export default LabelWithIcon;
