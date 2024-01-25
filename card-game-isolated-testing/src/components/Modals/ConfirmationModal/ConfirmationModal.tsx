import { useCallback } from "react";
import { useModalStore } from "../../../stores/modalStore";
import styles from "./confirmationModalStyles.module.css";
import CustomButton from "../../Buttons/CustomButton/CustomButton";

type Props = {
  message?: string;
  title: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

const ConfirmationModal = ({
  title,
  message = "Are you sure you want to perform this action?",
  onConfirm,
  onCancel = () => {},
}: Props) => {
  // const [isClosing, setIsClosing] = useState(false);

  const popModal = useModalStore((state) => state.popModal);
  // const provideModalData = useModalStore((state) => state.provideModalData);

  // const handleClose = useCallback(() => {
  //   setIsClosing(true);
  //   setTimeout(() => {
  //     popModal();
  //   }, 700); // Set timeout to match animation duration
  // }, []);

  const confirmHandler = useCallback(() => {
    onConfirm();
    // provideModalData({ modalType: "standard" });
    popModal();
    // handleClose();
  }, [onConfirm, popModal]);

  const cancelHandler = useCallback(() => {
    onCancel();
    // provideModalData({ modalType: "standard" });
    popModal();
    // handleClose();
  }, [onCancel, popModal]);

  // const modalClass = isClosing
  //   ? `${styles.confirmationModal} ${styles.slideOutEllipticTopBck}`
  //   : styles.confirmationModal;

  // TODO: Needs Styling! But it works! 👌
  return (
    <div className={styles.confirmationModal}>
      <div className={styles.background}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.message}>{message}</p>
          <div className={styles.buttons}>
            <CustomButton title="Yes" handleClick={confirmHandler} />
            <CustomButton
              title="No"
              handleClick={cancelHandler}
              restStyles="bg-red-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
