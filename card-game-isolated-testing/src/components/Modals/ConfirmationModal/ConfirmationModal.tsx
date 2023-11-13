import { useCallback } from "react";
import { useModalStore } from "../../../stores/modalStore";
import styles from "./confirmationModalStyles.module.css";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
};

const ConfirmationModal = ({ onConfirm, onCancel, message }: Props) => {
  // const [isClosing, setIsClosing] = useState(false);
  const popModal = useModalStore((state) => state.popModal);

  // const handleClose = useCallback(() => {
  //   setIsClosing(true);
  //   setTimeout(() => {
  //     popModal();
  //   }, 700); // Set timeout to match animation duration
  // }, []);

  const confirmHandler = useCallback(() => {
    onConfirm();
    popModal();
    // handleClose();
  }, [onConfirm]);

  const cancelHandler = useCallback(() => {
    onCancel();
    popModal();
    // handleClose();
  }, [onCancel]);

  // const modalClass = isClosing
  //   ? `${styles.confirmationModal} ${styles.slideOutEllipticTopBck}`
  //   : styles.confirmationModal;

  return (
    <div className={styles.confirmationModal}>
      <p>{message}</p>
      <button onClick={confirmHandler}>Confirm</button>
      <button onClick={cancelHandler}>Cancel</button>
    </div>
  );
};

export default ConfirmationModal;
