import { round2Decimal } from "../../../../../utils/game/roundToDecimal";
import { styles } from "./simpleLabelConstants";

interface SimpleLabelProps {
  value: number | string;
  valueType?: {
    type?: "/h" | "%" | "maxLimit";
    limit?: number;
    color?: "white" | "black" | "rusty";
    addGrayScale?: "yes" | "no";
  };
  size: "extraSmall" | "small" | "medium" | "large";
  color: "white" | "black" | "rusty";
  bgColorHex?: string;
  borderColorHex?: string;
  borderWidthPx?: number;
}

const SimpleLabel = ({
  value,
  valueType,
  size,
  color,
  bgColorHex = "#076b07",
  borderColorHex = "#023002",
  borderWidthPx = 5,
}: SimpleLabelProps) => {
  let finalValue: number | string = value;
  if (valueType?.type === "/h" && typeof value === "number")
    finalValue = `${round2Decimal(value)} /h`;
  if (valueType?.type === "%" && typeof value === "number")
    finalValue = `${round2Decimal(value * 100)} %`;
  return (
    <div
      style={{
        width: `${styles.containerSizes[size].widthPx}px`,
        height: `${styles.containerSizes[size].heightPx}px`,
        color: color === "rusty" ? "#ffd2b8" : color,
        backgroundColor: bgColorHex,
        borderColor: borderColorHex,
        borderWidth: `${borderWidthPx}px`,
        borderStyle: "solid", // You need to specify a border style to see the border
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: `${styles.textSizes[size]}`,
        fontWeight: "bold",
        borderRadius: "10px",
      }}
    >
      {finalValue}
    </div>
  );
};

export default SimpleLabel;
