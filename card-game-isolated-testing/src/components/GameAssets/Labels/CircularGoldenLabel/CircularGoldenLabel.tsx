import { useCallback, useMemo } from "react";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { GameIconsImageGroup } from "../../../../types";
import styles from "./circularLabelStyles.module.css";

interface Props {
  happinessValue: number;
  totalPop: number;
  alt: string;
}

const CircularGoldenLabel = ({ happinessValue, totalPop, alt }: Props) => {
  const { images } = UseGlobalContext();
  if (images === undefined)
    throw new Error("⛔ CircularGoldenLabel, images is undefined!");

  const faceFinder = useCallback(
    (
      happinessValue: number,
      totalPop: number
    ): keyof Partial<GameIconsImageGroup> => {
      // console.log("🍰 1. Happiness: ", happinessValue);
      // console.log("🍰 2. TotalPop: ", totalPop);
      const result = happinessValue / totalPop;
      if (result < 0.5) return "angryFaceGameIcon";
      if (result > 0.5 && result < 1) return "sadFaceGameIcon";
      if (result >= 1 && result < 1.5) return "neutralFaceGameIcon";
      if (result >= 1.5 && result < 2) return "happyFaceGameIcon";
      if (result >= 2) return "overjoyedFaceGameIcon";
      return "calendarGameIcon";
    },
    []
  );

  const faceToDisplay = useMemo(
    () => faceFinder(happinessValue, totalPop),
    [happinessValue, totalPop]
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
