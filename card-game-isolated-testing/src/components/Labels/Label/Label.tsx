import { LabelsImageGroup } from "../../../types";
import LabelValue from "./Parts/LabelValue/LabelValue";
import SimpleLabel from "./Parts/SimpleLabel/SimpleLabel";
import { styles } from "./labelConstants";

type labelType = "golden" | "green" | "rusty" | "special" | "simple";

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

interface LabelProps {
  type: labelType;
  value: number | string;
  labelImages: labelImages | LabelsImageGroup;
  valueType?: {
    type: "/h" | "%" | "maxLimit";
    limit?: number;
  };
  size?: "extraSmall" | "small" | "medium" | "large";
  desc?: {
    text: string;
    position?: "top" | "bottom";
    style?: "white" | "black";
  };
  isStoryBook?: boolean;
}

interface modifiedLabels {
  golden: string;
  green: string;
  rusty: string;
  special: string;
}

const Label = ({
  type,
  value,
  labelImages,
  valueType,
  size = "medium",
  desc,
  isStoryBook = false,
}: LabelProps) => {
  let modifiedLabels: modifiedLabels;

  if (isStoryBook) {
    modifiedLabels = {
      golden: (labelImages as labelImages).golden.standard,
      green: (labelImages as labelImages).otherLabels.greenEnergy,
      rusty: (labelImages as labelImages).otherLabels.rusty,
      special: (labelImages as labelImages).golden.special,
    };
  } else {
    modifiedLabels = {
      golden: (labelImages as LabelsImageGroup).goldenStandardLabel,
      green: (labelImages as LabelsImageGroup).greenEnergyLabel,
      rusty: (labelImages as LabelsImageGroup).rustyLabel,
      special: (labelImages as LabelsImageGroup).goldenSpecialLabel,
    };
  }

  const textStyles =
    type === "rusty" ? styles.textStyles.contrast : styles.textStyles.standard;
  return (
    <div>
      {type === "simple" ? (
        <div className={`relative flex flex-col w-fit`}>
          <SimpleLabel value={value} size={size} />
          {desc !== undefined && (
            <p
              className={`text-center mt-2 font-bold ${styles.descSizes[size]}`}
            >
              {desc?.text}
            </p>
          )}
        </div>
      ) : (
        <div
          className={`relative flex flex-col ${styles.containerSizes[type][size]}`}
        >
          <img
            src={modifiedLabels[type as Exclude<labelType, "simple">]}
            alt={`A Label of type: ${type}`}
            className="object-contain"
          />
          <LabelValue
            className={`${styles.containerSizes[type][size]} ${styles.centerize} ${textStyles} ${styles.sizes[size].text}`}
            value={value}
            valueType={
              valueType
                ? {
                    type: valueType.type,
                    limit: valueType.limit,
                  }
                : undefined
            }
          />
          {desc !== undefined && (
            <p
              className={`${
                desc.style === "white" ? "text-white" : ""
              } text-center mt-2 font-bold ${styles.descSizes[size]}`}
            >
              {desc?.text}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Label;
