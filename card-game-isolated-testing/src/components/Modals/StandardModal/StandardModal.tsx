import { useState } from "react";

import { useModalStore } from "../../../stores/modalStore";
import { ActionsSectionType } from "../../../types/ModalTypes/ActionsSectionTypes";
import ActionsSection from "../ActionsSection/ActionsSection";
import ModalCloseBtn from "../BaseModalParts/ModalCloseBtn/ModalCloseBtn";
import ModalLevelIndicator from "../BaseModalParts/ModalLevelIndicator/ModalLevelIndicator";
import ModalCenterLabel from "../BaseModalParts/ModalCenterLabel/ModalCenterLabel";
import styles from "./standardModalStyles.module.css";
import type { CardLevel, Level } from "../../../types";
import RegCard from "../../../classes/regClass_V2";
import BuildingCard from "../../../classes/buildingClass_V2";

type Props = {
  contentScreens: React.ReactNode[];
  label: string;
  bgImage: string;
  level: Level | CardLevel;
  contentType: ActionsSectionType;
  card?: RegCard | BuildingCard;
  onClose?: () => void;
};

/**
 *
 * @param childres The children should be the content of the modal
 * @param label The label should be a string that will be displayed in the top center of the modal
 * @param bgImage The bgImage should be an image URL that will be used as the background image of the modal
 * @param actions Is an array of objects of the ModalAction type. Each object should have a label and a handler
 * @param level The level should be a number between 1 and 5
 * @param rarity The rarity should be a number between 1 and 5
 */
const StandardModal = ({
  contentScreens,
  label,
  contentType,
  bgImage,
  card,
  level,
  onClose,
}: Props) => {
  const popModal = useModalStore((state) => state.popModal);
  // const modalBg = useModalStore((state) => state.modalData.modalBg);
  const [isClosing, setIsClosing] = useState(false);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [cardLevel, setCardLevel] = useState<Level | CardLevel>(level); // ✨ I am using this React State to dynamically change the level of the card in the modal

  const handleClose = () => {
    setIsClosing(true);
    onClose && onClose();
    setTimeout(() => {
      popModal();
    }, 700); // Set timeout to match animation duration
  };

  const modalClass = isClosing
    ? `${styles.standardModalContainer} ${styles.slideOutEllipticTopBck}`
    : `${styles.standardModalContainer} ${styles.enterAnimation}`;

  return (
    <div className={modalClass}>
      <div
        style={{
          background: `url(${bgImage})`,
          backgroundSize: "cover",
        }}
        className={styles.backgroundImage}
      />
      <div className={styles.backgroundFilter} />

      <div className={styles.anotherContainer}>
        <div className={styles.layoutContainer}>
          {contentScreens[currentScreenIndex]}
        </div>

        <div className={styles.actionButtonsContainer}>
          <ActionsSection
            contentType={contentType}
            card={card}
            setCurrentScreenIndex={setCurrentScreenIndex}
            currentScreenIndex={currentScreenIndex}
            setCardLevel={setCardLevel}
            handleCloseModal={handleClose}
          />
        </div>
      </div>
      <div className={styles.modalElements}>
        <ModalCloseBtn onCloseHandler={handleClose} isClosing={isClosing} />
        <div className="absolute left-[10%] top-[5%]">
          <ModalLevelIndicator
            isClosing={isClosing}
            level={cardLevel}
            contentType={contentType}
            usage="Modal"
          />
        </div>
        <ModalCenterLabel isClosing={isClosing} label={label} />
      </div>
    </div>
  );
};

export default StandardModal;
