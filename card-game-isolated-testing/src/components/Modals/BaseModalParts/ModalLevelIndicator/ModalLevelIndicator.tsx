import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import styles from "./modalLevel.module.css";

interface Props {
  isClosing?: boolean;
  level: number | null | undefined;
}

const ModalLevelIndicator = ({ isClosing, level }: Props) => {
  const { images } = UseGlobalContext();

  const modalLevelIconClass = isClosing
    ? `${styles.modalLevelIconContainer} ${styles.slideOutEllipticTopBck}`
    : `${styles.modalLevelIconContainer}`;

  if (images === undefined)
    throw new Error("⛔ ModalLevelIndicator, images is undefined!");

  return (
    <div className={modalLevelIconClass}>
      {level !== null && (
        <>
          <img
            className={styles.modalLevelIconImg}
            src={images.labels.levelLabel}
            alt="modal Level Icon"
          />
          <h3 className={styles.levelText}>{level}</h3>
        </>
      )}
    </div>
  );
};

export default ModalLevelIndicator;
