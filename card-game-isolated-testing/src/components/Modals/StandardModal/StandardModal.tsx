import { ReactNode } from "react";
import { ActionsSectionAction } from "../../../types/ModalTypes/ActionsSectionTypes";
import ActionsSection from "../ActionsSection/ActionsSection";
import styles from "./standardModalStyles.module.css";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
  confirmationMsg: string;
  children: ReactNode;
  actions: ActionsSectionAction[];
};

const StandardModal = ({
  // onConfirm,
  // onCancel,
  // confirmationMsg,
  children,
  actions,
}: Props) => {
  // const pushModal = useModalStore((state) => state.pushModal);
  // const popModal = useModalStore((state) => state.popModal);

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

  return (
    <div className={styles.standardModalContainer}>
      <div className={styles.anotherContainer}>
        <div className={styles.layoutContainer}>{children}</div>
        <div className={styles.actionButtonsContainer}>
          <ActionsSection actions={actions} />
        </div>
        {/* <button onClick={handleOpenConfirmationModal}>
        lvl Up - Open Confirmation Modal
      </button> */}
      </div>
    </div>
  );
};

export default StandardModal;
