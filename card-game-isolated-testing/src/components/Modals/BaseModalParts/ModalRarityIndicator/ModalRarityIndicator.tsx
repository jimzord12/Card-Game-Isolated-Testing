import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import styles from "./modalRarity.module.css";

interface Props {
  isClosing: boolean;
  rarity: number | null | undefined;
}

const rarityMapping = ["Common", "Special", "Rare", "Mythic", "Legendary"];
const rarityColors = ["#fff", "#39fc03", "#064ed4", "#ac1dcc", "#fc8403"];

const ModalRarityIndicator = ({ isClosing, rarity }: Props) => {
  const { images } = UseGlobalContext();
  const rarityText = rarity ? rarityMapping[rarity - 1] : null;
  const rarityColor = rarity ? rarityColors[rarity - 1] : "#fff";

  const modalRarityClass = isClosing
    ? `${styles.modalRarityContainer} ${styles.slideOutEllipticTopBck}`
    : `${styles.modalRarityContainer} ${styles.bounceInTop}`;

  if (images === undefined)
    throw new Error("⛔ ModalRarityIndicator, images is undefined!");

  return (
    <div className={modalRarityClass}>
      {rarity !== null && (
        <>
          <img
            className={styles.modalRarityImg}
            src={images.labels.goldenStandardLabel}
            alt="Rarity Label"
          />
          <h3 className={styles.rarityText} style={{ color: rarityColor }}>
            {rarityText}
          </h3>
        </>
      )}
    </div>
  );
};

export default ModalRarityIndicator;
