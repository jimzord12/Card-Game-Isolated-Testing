import {
  LabelSize,
  LabelsImageGroup,
  labelImages,
  labelType,
} from "../../../types";
import { isNumber } from "../../../types/TypeGuardFns/isNumber";
import { round2Decimal } from "../../../utils/game/roundToDecimal";
import LabelValue from "./Parts/LabelValue/LabelValue";
import SimpleLabel from "./Parts/SimpleLabel/SimpleLabel";
import { styles } from "./labelConstants";
import { useMediaQuery } from "usehooks-ts";

interface LabelProps {
  type: labelType;
  value: number | string;
  labelImages: labelImages | LabelsImageGroup;
  valueType?: {
    type?: "/h" | "%" | "maxLimit";
    limit?: number;
    color?: "white" | "black";
  };
  size?: LabelSize;
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
  // size = "medium",
  desc,
  isStoryBook = false,
}: LabelProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  let finalSize: LabelSize;
  let modifiedLabels: modifiedLabels;

  if (isMobile) finalSize = "extraSmall";
  else if (isTablet) finalSize = "small";
  else finalSize = "large";

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

  const finalValue = isNumber(value) ? round2Decimal(value) : value;

  return (
    <div>
      {type === "simple" ? (
        <div
          className={`relative flex flex-col justify-center items-center w-fit`}
        >
          <SimpleLabel
            value={finalValue}
            size={finalSize}
            color={valueType?.color ?? "white"}
          />
          {desc !== undefined && (
            <p
              className={`${
                desc.style === "white" ? "text-white" : ""
              } text-center mt-2 font-bold ${styles.descSizes[finalSize]}`}
            >
              {desc?.text}
            </p>
          )}
        </div>
      ) : (
        <div
          className={`relative flex flex-col ${styles.containerSizes[type][finalSize]}`}
        >
          <img
            src={modifiedLabels[type as Exclude<labelType, "simple">]}
            alt={`A Label of type: ${type}`}
            className="object-contain"
          />
          <LabelValue
            className={`${styles.containerSizes[type][finalSize]} ${
              styles.centerize
            } ${textStyles} ${styles.sizes[finalSize].text} ${
              styles.valueTextColors[valueType?.color ?? "white"]
            } text-center leading-none`}
            value={finalValue}
            valueType={
              valueType
                ? {
                    type: valueType.type,
                    limit: valueType.limit,
                    color: valueType.color ?? "white",
                  }
                : undefined
            }
          />
          {desc !== undefined && (
            <p
              className={`${
                desc.style === "white" ? "text-white" : ""
              } text-center mt-2 font-bold ${styles.descSizes[finalSize]}`}
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