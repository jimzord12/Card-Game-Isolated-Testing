import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import styles from "./modalRarity.module.css";

interface Props {
  isClosing: boolean;
  label: number | string;
}

const rarityMapping = ["Common", "Special", "Rare", "Mythic", "Legendary"];
const rarityColors = ["#fff", "#39fc03", "#064ed4", "#ac1dcc", "#fc8403"];

const ModalCenterLabel = ({ isClosing, label }: Props) => {
  const { images } = UseGlobalContext();
  let rarityText = null;
  let rarityColor = "#fff";
  if (typeof label === "number") {
    rarityText = label ? rarityMapping[label - 1] : null;
    rarityColor = rarityColors[label - 1];
  }

  const modalRarityClass = isClosing
    ? `${styles.modalRarityContainer} ${styles.slideOutEllipticTopBck}`
    : `${styles.modalRarityContainer} ${styles.bounceInTop}`;

  if (images === undefined)
    throw new Error("⛔ ModalCenterLabel, images is undefined!");

  return (
    <div className={modalRarityClass}>
      {label !== null && (
        <>
          <img
            className={styles.modalRarityImg}
            src={images.labels.goldenStandardLabel}
            alt="Rarity Label"
          />
          {typeof label === "string" ? (
            <h3 className={styles.rarityText} style={{ color: rarityColor }}>
              {label}
            </h3>
          ) : (
            <h3 className={styles.rarityText} style={{ color: rarityColor }}>
              {rarityText}
            </h3>
          )}
        </>
      )}
    </div>
  );
};

export default ModalCenterLabel;
