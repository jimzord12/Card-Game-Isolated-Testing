import styles from "./loadingModalStyles.module.css";
import { ProgressBar } from "react-loader-spinner";
type Props = {
  title?: string;
  message?: string;
  message2?: string;
};

const LoadingModal = ({
  title = "Server Communication",
  message = "Please wait while we process your request...",
  message2,
}: Props) => {
  return (
    <div className={styles.loadingModal}>
      <div className={styles.background}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.message}>{message}</p>
          <p className={styles.message}>{message2}</p>
          <div className={styles.spinner}>
            <ProgressBar
              visible={true}
              height="120"
              width="120"
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
