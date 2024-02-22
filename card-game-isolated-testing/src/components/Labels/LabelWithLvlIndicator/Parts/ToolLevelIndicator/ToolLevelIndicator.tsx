import { UseGlobalContext } from "../../../../../context/GlobalContext/GlobalContext";
import { Level } from "../../../../../types";
import { styles } from "./toolLevelIndicatorConstants";

interface ToolLevelIndicatorProps {
  level: Level;
  size: "extraSmall" | "small" | "medium" | "large";
}

const ToolLevelIndicator = ({ level, size }: ToolLevelIndicatorProps) => {
  const { images } = UseGlobalContext();
  if (images === undefined)
    throw new Error("⛔ ToolLevelIndicator.tsx, images is undefined!");

  return (
    <div className={`relative ${styles.centerize} w-fit`}>
      {level !== null && (
        <>
          <img
            className={`object-contain ${styles.levelIndicatorSize[size]}`}
            src={images?.labels?.levelLabel}
            alt="modal Level Icon"
          />
          <h3
            className={`absolute text-black ${styles.levelIndicatorTextSize[size]}`}
          >
            {level}
          </h3>
        </>
      )}
    </div>
  );
};

export default ToolLevelIndicator;
