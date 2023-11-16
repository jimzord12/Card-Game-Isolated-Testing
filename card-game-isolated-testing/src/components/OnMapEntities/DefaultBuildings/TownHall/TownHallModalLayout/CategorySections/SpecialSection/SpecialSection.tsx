import { UseGlobalContext } from "../../../../../../../context/GlobalContext/GlobalContext";
import SpecialLabel from "../../../../../../GameAssets/Labels/SpecialLabel/SpecialLabel";
import styles from "./specialSectionStyles.module.css";

const SpecialSection = () => {
  const { images } = UseGlobalContext();
  if (images === undefined)
    throw new Error("⛔ SpecialSection, images is undefined!");

  return (
    <section className={styles.specialSection}>
      <SpecialLabel
        gameIcon={images?.gameIcons.rankGameIcon}
        valueToDisplay={"125th"}
        alt="CitizensSpace"
      />
      <SpecialLabel
        gameIcon={images?.gameIcons.rankGameIcon}
        valueToDisplay={"Coming Soon"}
        alt="REGsSpace"
      />
    </section>
  );
};

export default SpecialSection;
