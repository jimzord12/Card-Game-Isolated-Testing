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
  labelImages: labelImages;
  valueType?: {
    type: "/h" | "%" | "maxLimit";
    limit?: number;
  };
  size?: "small" | "medium" | "large";
  desc?: {
    text: string;
    position?: "top" | "bottom";
  };
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
}: LabelProps) => {
  const modifiedLabels: modifiedLabels = {
    golden: labelImages.golden.standard,
    green: labelImages.otherLabels.greenEnergy,
    rusty: labelImages.otherLabels.rusty,
    special: labelImages.golden.special,
  };
  //   const positionStyles =

  const textStyles =
    type === "rusty" ? styles.textStyles.contrast : styles.textStyles.standard;
  return (
    <div>
      {type === "simple" ? (
        <>
          <SimpleLabel value={"Testing"} size={size} />
          {desc !== undefined && (
            <p className={`text-center mt-4 ${styles.descSizes[size]}`}>
              {desc?.text}
            </p>
          )}
        </>
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
            className={`${styles.centerize} ${textStyles} ${styles.sizes[size].text}`}
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
              className={`text-center mt-2 font-bold ${styles.descSizes[size]}`}
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
