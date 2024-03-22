import { useCallback, useMemo } from "react";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { GameIconsImageGroup } from "../../../../types";
import styles from "./circularLabelStyles.module.css";

interface Props {
  popGrowthRate: number;
  alt: string;
}

const CircularGoldenLabel = ({ popGrowthRate, alt }: Props) => {
  const { images } = UseGlobalContext();
  if (images === undefined)
    throw new Error("⛔ CircularGoldenLabel, images is undefined!");

  const faceFinder = useCallback(
    (popGrowthRate: number): keyof Partial<GameIconsImageGroup> => {
      if (popGrowthRate < 0) return "angryFaceGameIcon";
      if (popGrowthRate >= 0 && popGrowthRate < 1) return "sadFaceGameIcon";
      if (popGrowthRate >= 1 && popGrowthRate < 2) return "neutralFaceGameIcon";
      if (popGrowthRate >= 2 && popGrowthRate < 3.5) return "happyFaceGameIcon";
      if (popGrowthRate >= 3.5) return "overjoyedFaceGameIcon";
      console.error(
        "⛔ CircularGoldenLabel: popGrowthRate is invalid!",
        popGrowthRate
      );
      return "calendarGameIcon";
    },
    []
  );

  const faceToDisplay = useMemo(
    () => faceFinder(popGrowthRate),
    [faceFinder, popGrowthRate]
  );

  return (
    <div className={styles.labelContainer}>
      <div className={styles.gameIconContainer}>
        <img
          className={styles.gameIconImg}
          src={images.gameIcons[faceToDisplay]}
          alt={alt}
        />
      </div>
      <div
        className={
          faceToDisplay === "sadFaceGameIcon"
            ? `${styles.label} ${styles.sadFaceSpecific}`
            : `${styles.label}`
        }
      >
        <img
          className={styles.labelImg}
          src={images?.frames.stefaniFrame}
          alt="label"
        />
      </div>
    </div>
  );
};

export default CircularGoldenLabel;
