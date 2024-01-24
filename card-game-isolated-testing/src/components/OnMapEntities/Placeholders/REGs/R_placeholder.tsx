import { Dispatch, SetStateAction, useCallback, useState } from "react";

// Wrap those Raw images with this
import GlowImage from "../../../GlowImage/GlowImage";

// Import all CSS Styles Required
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { useModalStore } from "../../../../stores/modalStore";
import { RegSpot, TownMapEntitiesData } from "../../../../types";
import CardPickerModal from "../../../Modals/CardPickerModal/CardPickerModal";
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
  const [animate, setAnimate] = useState(false);
  const pushModal = useModalStore((state) => state.pushModal);
  // const modalId = useModalStore((state) => state.modalData.id);
  // const provideModalData = useModalStore((state) => state.provideModalData);

  const { images } = UseGlobalContext();

  if (images === undefined)
    throw new Error("⛔ R_Placeholder, images is undefined!");

  const handleClickWhenLocked = useCallback(() => {
    setAnimate(true);
  }, []);

  const handleAnimationEnd = useCallback(() => {
    setAnimate(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    pushModal(<CardPickerModal type="reg" spot={spot} />);
  }, [pushModal, spot]);

  // useEffect(() => {
  //   console.log("UseEffect For [R_PlaceHolder], ID: ", modalId);
  //   if (modalId !== id) return;
  // }, [modalId]);

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
              handleOpenModal(/*spot*/);
            }
          }}
          onAnimationEnd={handleAnimationEnd}
        >
          <div
            className={
              animate && isLocked
                ? `${styles.regPlaceholderContainer} shakeHorizontal`
                : styles.regPlaceholderContainer
            }
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
