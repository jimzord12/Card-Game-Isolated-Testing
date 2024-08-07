import { round2Decimal } from "../../../../../utils/game/roundToDecimal";

interface LabelValueProps {
  value: number | string;
  valueType?: {
    type?: "/h" | "%" | "maxLimit";
    limit?: number;
    color?: "white" | "black" | "rusty";
  };
  className?: string;
}
const LabelValue = ({ value, valueType, className }: LabelValueProps) => {
  let finalValue: string | number = value;

  switch (valueType?.type) {
    case "/h":
      finalValue = `${value} /h`;
      break;
    case "%":
      finalValue = `${round2Decimal((value as number) * 100)} %`;
      break;
    case "maxLimit":
      finalValue = `${value}/${valueType.limit}`;
      break;

    default:
      break;
  }

  if (typeof finalValue === "string" && finalValue.length > 24) {
    finalValue = finalValue.slice(0, 20) + "...";
  }

  return (
    <h2
      className={className}
      style={{ color: valueType?.color === "rusty" ? "#ffd2b8" : "" }}
    >
      {finalValue}
    </h2>
  );
};

export default LabelValue;
