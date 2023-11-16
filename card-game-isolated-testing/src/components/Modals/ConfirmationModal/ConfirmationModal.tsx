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
  const provideModalData = useModalStore((state) => state.provideModalData);

  // const handleClose = useCallback(() => {
  //   setIsClosing(true);
  //   setTimeout(() => {
  //     popModal();
  //   }, 700); // Set timeout to match animation duration
  // }, []);

  const confirmHandler = useCallback(() => {
    onConfirm();
    provideModalData({ modalType: "standard" });
    popModal();
    // handleClose();
  }, []);

  const cancelHandler = useCallback(() => {
    onCancel();
    provideModalData({ modalType: "standard" });
    popModal();
    // handleClose();
  }, []);

  // const modalClass = isClosing
  //   ? `${styles.confirmationModal} ${styles.slideOutEllipticTopBck}`
  //   : styles.confirmationModal;

  return (
    <div className={styles.confirmationModal}>
      <div className={styles.background}>
        <div className={styles.content}>
          <p>{message}</p>
          <div className={styles.buttons}>
            <button onClick={confirmHandler}>Confirm</button>
            <button onClick={cancelHandler}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
