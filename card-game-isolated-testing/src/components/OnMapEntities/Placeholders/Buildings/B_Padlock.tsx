import { useMemo } from "react";
import { BuildingSpot } from "../../../../types";
import styles from "./bPlaceholders.module.css";

interface Props {
  spot: BuildingSpot;
  padlockImg: string;
}

const B_Padlock = ({ spot, padlockImg }: Props) => {
  const randomValue = useMemo((): number => {
    const min = 6;
    const max = 8;
    return Math.random() * (max - min) + min;
  }, []);
  return (
    <div className={styles.buildingPadlockContainer}>
      <img
        className={styles.buildingPadlock}
        style={{
          animation: `floatPadlock${
            spot % 2 === 0 ? "1" : "2"
          } ${randomValue}s ease-in-out infinite`,
        }}
        src={padlockImg}
      />
    </div>
  );
};

export default B_Padlock;
