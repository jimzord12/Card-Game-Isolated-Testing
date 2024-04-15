import styles from "./loadingModalMPStyles.module.css";
import { ProgressBar } from "react-loader-spinner";

const LoadingModalMP = ({
  title = "Server Communication",
  message = "Please wait while we process your request...",
  message2,
}) => {
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

export default LoadingModalMP;
