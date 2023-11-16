import { ReactNode, useEffect, useState } from "react";
import { useModalStore } from "../../../stores/modalStore";

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
  const modalLevel = useModalStore((state) => state.modalData.modalLevel);
  const modalRarity = useModalStore((state) => state.modalData.modalRarity);

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
      <ModalCloseBtn onCloseHandler={handleClose} isClosing={isClosing} />
      <ModalLevelIndicator isClosing={isClosing} level={modalLevel} />
      <ModalRarityIndicator isClosing={isClosing} rarity={modalRarity} />
    </div>
  );
};

export default Modal;
