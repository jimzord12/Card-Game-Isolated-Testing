// import { useCallback } from "react";
// import { useModalStore } from "../../../stores/modalStore";
import styles from "./loadingModalStyles.module.css";
import { ProgressBar } from "react-loader-spinner";
type Props = {
  message?: string;
  title?: string;
  // onConfirm: () => void;
  // onCancel?: () => void;
};

const LoadingModal = ({
  title = "Server Communication",
  message = "Please wait while we process your request...",
}: // onConfirm,
// onCancel = () => {},
Props) => {
  // const [isClosing, setIsClosing] = useState(false);

  // const popModal = useModalStore((state) => state.popModal);
  // const provideModalData = useModalStore((state) => state.provideModalData);

  // const handleClose = useCallback(() => {
  //   setIsClosing(true);
  //   setTimeout(() => {
  //     popModal();
  //   }, 700); // Set timeout to match animation duration
  // }, []);

  // const confirmHandler = useCallback(() => {
  //   onConfirm();
  //   // provideModalData({ modalType: "standard" });
  //   popModal();
  //   // handleClose();
  // }, [onConfirm, popModal]);

  // const cancelHandler = useCallback(() => {
  //   onCancel();
  //   // provideModalData({ modalType: "standard" });
  //   popModal();
  //   // handleClose();
  // }, [onCancel, popModal]);

  // const modalClass = isClosing
  //   ? `${styles.LoadingModal} ${styles.slideOutEllipticTopBck}`
  //   : styles.LoadingModal;

  // TODO: Needs Styling! But it works! 👌
  return (
    <div className={styles.loadingModal}>
      <div className={styles.background}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.message}>{message}</p>
          <div className={styles.spinner}>
            <ProgressBar
              visible={true}
              height="120"
              width="120"
              // color="#4fa94d"
              ariaLabel="progress-bar-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
