import { Dispatch, SetStateAction } from "react";

// Wrap those Raw images with this
import GlowImage from "../../../GlowImage/GlowImage";
import BuildingPadlock from "./B_Padlock";

// Import all CSS Styles Required
import { BuildingSpot, TownMapEntitiesData } from "../../../../types";
import "../animations.css";
import styles from "./bPlaceholders.module.css";
import "../placeholders.css";


interface propsTypes {
  highlightedImg: number | null;
  handleHover: (id: number) => void;
  handleLeave: (id: number) => void;
  setSelectedMapEntity: Dispatch<SetStateAction<number | null>>;
  id: number;
  spot: BuildingSpot;
  isLocked: boolean;
  mapEntities: TownMapEntitiesData;
  imgUrls: {
    placeholder: string;
    padlock: string;
  };
}

const PlaceholderBuilding = ({
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
            className={styles.buildingPlaceholderContainer}
            onClick={() => setSelectedMapEntity(id)}
            onMouseEnter={() => handleHover(id)}
            onMouseLeave={() => handleLeave(id)}
          >
            {isLocked && (
              <BuildingPadlock spot={spot} padlockImg={imgUrls.padlock} />
            )}

            <GlowImage
              src={imgUrls.placeholder}
              alt="Building - Placeholder"
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

export default PlaceholderBuilding;
