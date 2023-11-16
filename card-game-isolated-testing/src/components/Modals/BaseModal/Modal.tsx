import { ReactNode, useEffect, useState } from "react";
import { useModalStore } from "../../../stores/modalStore";

import { useGameVarsStore } from "../../../stores/gameVars";
import ModalCloseBtn from "../BaseModalParts/ModalCloseBtn/ModalCloseBtn";
import ModalLevelIndicator from "../BaseModalParts/ModalLevelIndicator/ModalLevelIndicator";
import ModalRarityIndicator from "../BaseModalParts/ModalRarityIndicator/ModalRarityIndicator";
import styles from "./baseModal.module.css";

type Props = {
  children: ReactNode;
  index: number;
};

const Modal = ({ children, index }: Props) => {
  const [isClosing, setIsClosing] = useState(false);

  // From Zustange Stores
  const popModal = useModalStore((state) => state.popModal);
  const modalStack = useModalStore((state) => state.stack);
  // const modalBg = useModalStore((state) => state.modalData.modalBg);
  // const modalLevel = useModalStore((state) => state.modalData.modalLevel);
  const townhallLevel = useGameVarsStore((state) => state.townhallLevel);
  const modalRarity = useModalStore((state) => state.modalData.modalRarity);
  const modalType = useModalStore((state) => state.modalData.modalType);

  useEffect(() => {
    if (modalStack.length - 1 < index) {
      setIsClosing(true);
    }
  }, [modalStack.length, index]);

  const handleClose = () => {
    setIsClosing(true);
    let times = modalStack.length - 1 - index;
    setTimeout(() => {
      while (times >= 0) {
        popModal();
        times--;
      }
    }, 700); // Set timeout to match animation duration
  };

  const modalClass = isClosing
    ? `${styles.modalContent} ${styles.slideOutEllipticTopBck}`
    : `${styles.modalContent} ${styles.enterAnimation}`;

  return (
    <div className={styles.modalBackdrop} onClick={handleClose}>
      <div className={modalClass} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
      {/* //TODO: The Code below must go to StandardModal.tsx */}
      {modalType === "standard" && (
        <>
          <ModalCloseBtn onCloseHandler={handleClose} isClosing={isClosing} />
          <ModalLevelIndicator isClosing={isClosing} level={townhallLevel} />
          <ModalRarityIndicator isClosing={isClosing} rarity={modalRarity} />
        </>
      )}
    </div>
  );
};

export default Modal;
