import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import styles from "./modalCloseBtn.module.css";

interface Props {
  onCloseHandler?: () => void;
  isClosing?: boolean;
}

const ModalCloseBtn = ({ onCloseHandler, isClosing }: Props) => {
  const { images } = UseGlobalContext();

  const modalCloseIconClass = isClosing
    ? `${styles.modalCloseIconContainer} ${styles.slideOutEllipticTopBck}`
    : `${styles.modalCloseIconContainer} ${styles.bounceInTop}`;

  if (images === undefined)
    throw new Error("⛔ ModalCloseBtn, images is undefined!");

  return (
    <div className={modalCloseIconClass} onClick={onCloseHandler}>
      <img
        className={styles.modalCloseIconImg}
        src={images.gameIcons.woodenCloseModalGameIcon}
        alt="close modal Icon"
      />
    </div>
  );
};

export default ModalCloseBtn;
