import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import styles from "./rustyLabelStyles.module.css";

interface Props {
  gameIcon: string;
  valueToDisplay: string;
  alt: string;
}

const RustyLabel = ({ gameIcon, valueToDisplay, alt }: Props) => {
  const { images } = UseGlobalContext();
  if (images === undefined)
    throw new Error("⛔ RustyLabel, images is undefined!");

  return (
    <div className={styles.labelContainer}>
      <div className={styles.gameIconContainer}>
        <img className={styles.gameIconImg} src={gameIcon} alt={alt} />
      </div>
      <div className={styles.label}>
        <img
          className={styles.labelImg}
          src={images?.labels.rustyLabel}
          alt="label"
        />
        <div className={styles.value}>{valueToDisplay}</div>
      </div>
    </div>
  );
};

export default RustyLabel;
