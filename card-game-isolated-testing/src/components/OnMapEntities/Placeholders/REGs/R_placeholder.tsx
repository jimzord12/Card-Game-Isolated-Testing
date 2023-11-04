import { Dispatch, SetStateAction, useMemo } from "react";

import { placeholders } from "../../../../assets/imgs/onMapAssets";
// Wrap those Raw images with this
import GlowImage from "../../../GlowImage/GlowImage";

// Import all CSS Styles Required
import "../animations.css";
import styles from "./rPlaceholders.module.css";

interface propsTypes {
  highlightedImg: number | null;
  handleHover: (id: number) => void;
  handleLeave: (id: number) => void;
  //TODO: Entity's Type goes here
  setSelectedMapEntity: Dispatch<SetStateAction<number | null>>;
  //   imageDetails: ImageDetail[];
  id: number;
  spot: number
}

const PlaceholderREG = ({
  highlightedImg,
  handleHover,
  handleLeave,
  setSelectedMapEntity,
  id,
  spot
}: propsTypes) => {
  const randomValue = useMemo((): number => {
    const min = 6;
    const max = 8;
    return Math.random() * (max - min) + min;
  }, []);

  return (
    <div
      className={styles.regPlaceholderContainer}
      onClick={() => setSelectedMapEntity(id)}
      onMouseEnter={() => handleHover(id)}
      onMouseLeave={() => handleLeave(id)}
    >
      <div className={styles.regPadlockContainer}>
        <img
          className={styles.regPadlock}
          style={{
            animation: `floatPadlock${
              spot % 2 === 0 ? "1" : "2"
            } ${randomValue}s ease-in-out infinite`,
          }}
          src={placeholders.padlockREG}
        />
      </div>
      <GlowImage
        src={placeholders.placeholderREG}
        alt="REG - Placeholder"
        isHovered={highlightedImg === id}
        onHover={() => handleHover(id)}
        onLeave={() => handleLeave(id)}
      />
    </div>
  );
};

export default PlaceholderREG;
