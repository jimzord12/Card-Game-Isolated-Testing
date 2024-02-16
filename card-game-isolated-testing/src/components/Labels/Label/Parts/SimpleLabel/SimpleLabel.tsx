import { styles } from "./simpleLabelConstants";

interface SimpleLabelProps {
  value: number | string;
  size: "extraSmall" | "small" | "medium" | "large";
  color: "white" | "black";
  bgColorHex?: string;
  borderColorHex?: string;
  borderWidthPx?: number;
}

const SimpleLabel = ({
  value,
  size,
  color,
  bgColorHex = "#076b07",
  borderColorHex = "#023002",
  borderWidthPx = 5,
}: SimpleLabelProps) => {
  return (
    <div
      style={{
        width: `${styles.containerSizes[size].widthPx}px`,
        height: `${styles.containerSizes[size].heightPx}px`,
        color: color,
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
      {value}
    </div>
  );
};

export default SimpleLabel;