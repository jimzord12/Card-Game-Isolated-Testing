import { Dispatch, SetStateAction, useCallback, useState } from "react";

// Wrap those Raw images with this
import GlowImage from "../../../GlowImage/GlowImage";
import BuildingPadlock from "./B_Padlock";

// Import all CSS Styles Required
import { BuildingSpot, TownMapEntitiesData } from "../../../../types";
import "../animations.css";
import "../placeholders.css";
import styles from "./bPlaceholders.module.css";

import { useModalStore } from "../../../../stores/modalStore";
import StandardModal from "../../../Modals/StandardModal/StandardModal";

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
  const [animate, setAnimate] = useState(false);
  const pushModal = useModalStore((state) => state.pushModal);

  const handleClickWhenLocked = useCallback(() => {
    setAnimate(true);
  }, []);

  const handleAnimationEnd = useCallback(() => {
    setAnimate(false);
  }, []);

  const handleOpenStandardModal = useCallback((spot: BuildingSpot) => {
    pushModal(
      <StandardModal
        message={`This is the Standard Modal For a [BUILDING] Placeholder, SPOT: [${spot}]`}
        onConfirm={() => {
          console.log("✅ You pressed the Confirm Button!");
        }}
        onCancel={() => {
          console.log("❌ You pressed the Cancel Button!");
        }}
      />
    );
  }, []);
  return (
    <>
      {mapEntities[spot] === null ? (
        <div
          className={`placeholderSpot${spot}`}
          key={id}
          onClick={() => {
            if (isLocked) {
              handleClickWhenLocked();
            } else {
              handleOpenStandardModal(spot);
            }
          }}
          onAnimationEnd={handleAnimationEnd}
        >
          <div
            className={
              animate && isLocked
                ? `${styles.buildingPlaceholderContainer} shakeHorizontal`
                : styles.buildingPlaceholderContainer
            }
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
