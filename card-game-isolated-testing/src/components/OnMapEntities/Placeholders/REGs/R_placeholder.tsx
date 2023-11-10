import { Dispatch, SetStateAction } from "react";

// Wrap those Raw images with this
import GlowImage from "../../../GlowImage/GlowImage";

// Import all CSS Styles Required
import { RegSpot, TownMapEntitiesData } from "../../../../types";
import "../animations.css";
import "../placeholders.css";
import R_Padlock from "./R_Padlock";
import styles from "./rPlaceholders.module.css";

interface propsTypes {
  highlightedImg: number | null;
  handleHover: (id: number) => void;
  handleLeave: (id: number) => void;
  //TODO: Entity's Type goes here
  setSelectedMapEntity: Dispatch<SetStateAction<number | null>>;
  //   imageDetails: ImageDetail[];
  id: number;
  isLocked: boolean;
  spot: RegSpot;
  mapEntities: TownMapEntitiesData;
  imgUrls: {
    placeholder: string;
    padlock: string;
  };
}

const PlaceholderREG = ({
  highlightedImg,
  handleHover,
  handleLeave,
  setSelectedMapEntity,
  id,
  spot,
  isLocked,
  mapEntities,
  imgUrls,
}: propsTypes) => {
  return (
    <>
      {mapEntities[spot] === null ? (
        <div className={`placeholderSpot${spot}`} key={id}>
          <div
            className={styles.regPlaceholderContainer}
            onClick={() => setSelectedMapEntity(id)}
            onMouseEnter={() => handleHover(id)}
            onMouseLeave={() => handleLeave(id)}
          >
            {isLocked && <R_Padlock spot={spot} padlockImg={imgUrls.padlock} />}
            <GlowImage
              src={imgUrls.placeholder}
              alt="REG - Placeholder"
              isHovered={highlightedImg === id}
              onHover={() => handleHover(id)}
              onLeave={() => handleLeave(id)}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PlaceholderREG;
