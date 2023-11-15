import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import styles from "./styles.module.css";

interface Props {
  gameIcon: string;
  valueToDisplay: string;
  alt: string;
}

const StandardLabel = ({ gameIcon, valueToDisplay, alt }: Props) => {
  const { images } = UseGlobalContext();
  if (images === undefined)
    throw new Error("⛔ StandardLabel, images is undefined!");

  return (
    <div className={styles.labelContainer}>
      <div className={styles.gameIconContainer}>
        <img className={styles.gameIconImg} src={gameIcon} alt={alt} />
      </div>
      <div className={styles.label}>
        <img
          className={styles.labelImg}
          src={images?.labels.goldenStandardLabel}
          alt="label"
        />
        <div className={styles.value}>{valueToDisplay}</div>
      </div>
    </div>
  );
};

export default StandardLabel;
