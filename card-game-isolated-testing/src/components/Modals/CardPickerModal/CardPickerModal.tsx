import { useState } from "react";
import { useModalStore } from "../../../stores/modalStore";
import { CardSpot, CardType } from "../../../types";
import ModalCloseBtn from "../BaseModalParts/ModalCloseBtn/ModalCloseBtn";
import ModalRarityIndicator from "../BaseModalParts/ModalRarityIndicator/ModalRarityIndicator";
import styles from "./cardPickerModalStyles.module.css";

type Props = {
  type: Omit<CardType, "sp">;
  spot: CardSpot;
};

const CardPickerModal = ({ type, spot }: Props) => {
  const popModal = useModalStore((state) => state.popModal);
  const modalBg = useModalStore((state) => state.modalData.modalBg);
  const [isClosing, setIsClosing] = useState(false);
  // const provideModalData = useModalStore((state) => state.provideModalData);

  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      popModal();
    }, 700);
  };
  const modalClass = isClosing
    ? `${styles.standardModalContainer} ${styles.slideOutEllipticTopBck}`
    : `${styles.standardModalContainer} ${styles.enterAnimation}`;

  return (
    <div className={modalClass}>
      <div
        style={{
          background: `url(${modalBg})`,
          backgroundSize: "cover",
        }}
        className={styles.backgroundImage}
      />
      <div className={styles.backgroundFilter} />

      <div className={styles.templateCardsContainer}>
      {/* 
      //TODO: Map through the Template Cards and render them here, filter out the ones that are not of the correct type. */}
      </div>

      <div className={styles.modalElements}>
        <ModalCloseBtn onCloseHandler={handleClose} isClosing={isClosing} />
        {/* <ModalLevelIndicator isClosing={isClosing} level={townhallLevel} /> */}
        <ModalRarityIndicator
          isClosing={isClosing}
          rarityOrName={"Pick A Card"}
        />
      </div>
    </div>
  );
};

export default CardPickerModal;
