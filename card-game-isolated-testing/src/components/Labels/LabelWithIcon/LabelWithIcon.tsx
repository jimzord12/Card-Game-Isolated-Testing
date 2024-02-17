import { LabelsImageGroup, labelImages } from "../../../types";
import LabelLeftIcon from "./Parts/LabelLeftIcon";
import LabelTopIcon from "./Parts/LabelTopIcon";

interface LabelWithIconProps {
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
  image: string;
  position?: "top" | "left";
  isStoryBook?: boolean;
}

const LabelWithIcon = ({
  size,
  image,
  value,
  labelType,
  valueType,
  desc,
  labelImages,
  position,
  isStoryBook,
}: LabelWithIconProps) => {
  return (
    <>
      {position === "top" ? (
        <LabelTopIcon
          size={size}
          image={image}
          value={value}
          labelType={labelType}
          valueType={valueType}
          desc={desc}
          labelImages={labelImages}
          isStoryBook={isStoryBook}
        />
      ) : (
        <LabelLeftIcon
          size={size}
          image={image}
          value={value}
          labelType={labelType}
          valueType={valueType}
          desc={desc}
          labelImages={labelImages}
          isStoryBook={isStoryBook}
        />
      )}
    </>
  );
};

export default LabelWithIcon;
