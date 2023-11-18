import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

// Wrap those Raw images with this
import GlowImage from "../../../GlowImage/GlowImage";
import BuildingPadlock from "./B_Padlock";

// Import all CSS Styles Required
import { BuildingSpot, TownMapEntitiesData } from "../../../../types";
import "../animations.css";
import "../placeholders.css";
import styles from "./bPlaceholders.module.css";

import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { useModalStore } from "../../../../stores/modalStore";
import CardPickerModal from "../../../Modals/CardPickerModal/CardPickerModal";

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
  // const modalBg = useModalStore((state) => state.modalData.modalBg);
  const modalId = useModalStore((state) => state.modalData.id);

  const provideModalData = useModalStore((state) => state.provideModalData);

  const { images } = UseGlobalContext();

  if (images === undefined)
    throw new Error("⛔ B_Placeholder, images is undefined!");

  const handleClickWhenLocked = useCallback(() => {
    setAnimate(true);
  }, []);

  const handleAnimationEnd = useCallback(() => {
    setAnimate(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    provideModalData({
      id: id,
      modalBg: images?.modal_backgrounds.levelUpBuildingBG,
      modalLevel: null,
      modalRarityOrName: "Pick A Card",
      modalType: "standard",
    });
  }, []);

  useEffect(() => {
    console.log("UseEffect For [B_PlaceHolder], ID: ", modalId);
    if (modalId !== id) return;
    pushModal(<CardPickerModal type="building" spot={spot} />);
  }, [modalId]);

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
              handleOpenModal();
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
