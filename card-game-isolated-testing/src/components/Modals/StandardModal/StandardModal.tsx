import { ReactNode, useState } from "react";
import { useGameVarsStore } from "../../../stores/gameVars";
import { useModalStore } from "../../../stores/modalStore";
import { CardLevel, Level } from "../../../types";
import { ActionsSectionAction } from "../../../types/ModalTypes/ActionsSectionTypes";
import ActionsSection from "../ActionsSection/ActionsSection";
import ModalCloseBtn from "../BaseModalParts/ModalCloseBtn/ModalCloseBtn";
import ModalLevelIndicator from "../BaseModalParts/ModalLevelIndicator/ModalLevelIndicator";
import ModalRarityIndicator from "../BaseModalParts/ModalRarityIndicator/ModalRarityIndicator";
import styles from "./standardModalStyles.module.css";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
  children: ReactNode;
  actions?: ActionsSectionAction[];
  level: Level | CardLevel;
  rarityOrName: number | string;
};

const StandardModal = ({ children, actions, /*level ,*/ rarityOrName }: Props) => {
  // const pushModal = useModalStore((state) => state.pushModal);
  const popModal = useModalStore((state) => state.popModal);
  const modalBg = useModalStore((state) => state.modalData.modalBg);
  const [isClosing, setIsClosing] = useState(false);
  const provideModalData = useModalStore((state) => state.provideModalData);
  const townhallLevel = useGameVarsStore((state) => state.townhallLevel);

  // const handleOpenConfirmationModal = useCallback(() => {
  //   pushModal(
  //     <ConfirmationModal
  //       message={confirmationMsg}
  //       onConfirm={() => {
  //         onConfirm();
  //       }}
  //       onCancel={() => {
  //         onCancel();
  //       }}
  //     />
  //   );
  // }, []);
  const handleClose = () => {
    setIsClosing(true);
    // let times = modalStack.length - 1 - index;
    setTimeout(() => {
      // while (times >= 0) {
      provideModalData({
        id: null,
        modalBg: null,
        modalLevel: null,
        modalRarityOrName: null,
        modalType: "standard",
      });
      popModal();

      // times--;
      // }
    }, 700); // Set timeout to match animation duration
  };

  // const _rarityOrName =
  // rarityOrName === "townhall" || rarityOrName === "factory" ? rarityOrName : rarity;

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

      {/* <ModalCloseBtn onCloseHandler={handleClose} isClosing={isClosing} />
      <ModalLevelIndicator isClosing={isClosing} level={townhallLevel} />
      <ModalRarityIndicator isClosing={isClosing} rarity={modalRarity} /> */}

      <div className={styles.anotherContainer}>
        <div className={styles.layoutContainer}>{children}</div>
        {actions !== undefined && (
          <div className={styles.actionButtonsContainer}>
            <ActionsSection actions={actions} />
          </div>
        )}
      </div>
      <div className={styles.modalElements}>
        <ModalCloseBtn onCloseHandler={handleClose} isClosing={isClosing} />
        <ModalLevelIndicator isClosing={isClosing} level={townhallLevel} />
        <ModalRarityIndicator
          isClosing={isClosing}
          rarityOrName={rarityOrName}
        />
      </div>
    </div>
  );
};

export default StandardModal;
