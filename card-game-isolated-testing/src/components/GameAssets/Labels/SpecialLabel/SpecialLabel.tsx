import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import styles from "./specialLabelStyles.module.css";

interface Props {
  gameIcon: string;
  valueToDisplay: string | JSX.Element;
  alt: string;
}

const SpecialLabel = ({ gameIcon, valueToDisplay, alt }: Props) => {
  const { images } = UseGlobalContext();
  if (images === undefined)
    throw new Error("⛔ SpecialLabel, images is undefined!");

  return (
    <div className={styles.labelContainer}>
      <div className={styles.gameIconContainer}>
        <img className={styles.gameIconImg} src={gameIcon} alt={alt} />
      </div>
      <div className={styles.label}>
        <img
          className={styles.labelImg}
          src={images?.labels.goldenSpecialLabel}
          alt="label"
        />
        <div className={styles.value}>{valueToDisplay}</div>
      </div>
    </div>
  );
};

export default SpecialLabel;
