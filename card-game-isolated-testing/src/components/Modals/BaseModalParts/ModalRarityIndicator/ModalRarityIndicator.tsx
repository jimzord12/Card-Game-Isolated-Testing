import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import styles from "./modalRarity.module.css";

interface Props {
  isClosing: boolean;
  rarityOrName: number | string;
}

const rarityMapping = ["Common", "Special", "Rare", "Mythic", "Legendary"];
const rarityColors = ["#fff", "#39fc03", "#064ed4", "#ac1dcc", "#fc8403"];

const ModalRarityIndicator = ({ isClosing, rarityOrName }: Props) => {
  const { images } = UseGlobalContext();
  let rarityText = null;
  let rarityColor = "#fff";
  if (typeof rarityOrName === "number") {
    rarityText = rarityOrName ? rarityMapping[rarityOrName - 1] : null;
    rarityColor = rarityColors[rarityOrName - 1];
  }

  const modalRarityClass = isClosing
    ? `${styles.modalRarityContainer} ${styles.slideOutEllipticTopBck}`
    : `${styles.modalRarityContainer} ${styles.bounceInTop}`;

  if (images === undefined)
    throw new Error("⛔ ModalRarityIndicator, images is undefined!");

  return (
    <div className={modalRarityClass}>
      {rarityOrName !== null && (
        <>
          <img
            className={styles.modalRarityImg}
            src={images.labels.goldenStandardLabel}
            alt="Rarity Label"
          />
          {typeof rarityOrName === "string" ? (
            <h3 className={styles.rarityText} style={{ color: rarityColor }}>
              {rarityOrName}
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

export default ModalRarityIndicator;
