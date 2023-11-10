import { useMemo } from "react";
import { RegSpot } from "../../../../types";
import styles from "./rPlaceholders.module.css";

interface Props {
  spot: RegSpot;
  padlockImg: string;
}

const R_Padlock = ({ spot, padlockImg }: Props) => {
  const randomValue = useMemo((): number => {
    const min = 6;
    const max = 8;
    return Math.random() * (max - min) + min;
  }, []);
  return (
    <div className={styles.regPadlockContainer}>
      <img
        className={styles.regPadlock}
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

export default R_Padlock;
