import { useCallback } from "react";
import { useModalStore } from "../../../stores/modalStore";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import styles from "./standardModalStyles.module.css";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
};

const StandardModal = ({ onConfirm, onCancel, message }: Props) => {
  const pushModal = useModalStore((state) => state.pushModal);
  // const popModal = useModalStore((state) => state.popModal);

  const handleOpenConfirmationModal = useCallback(() => {
    pushModal(
      <ConfirmationModal
        message="Are you sure you want to perform this action?"
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => {
          onCancel();
        }}
      />
    );
  }, []);

  return (
    <div className={styles.standardModalContainer}>
      <p>{message}</p>
      <div>
        <button onClick={handleOpenConfirmationModal}>
          lvl Up - Open Confirmation Modal
        </button>
      </div>
    </div>
  );
};

export default StandardModal;
