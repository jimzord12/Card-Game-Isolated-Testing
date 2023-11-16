import { UseGlobalContext } from "../../../../../../../context/GlobalContext/GlobalContext";
import GreenLabel from "../../../../../../GameAssets/Labels/GreenLabel/GreenLabel";
import styles from "./energySectionStyles.module.css";

const EnergySection = () => {
  const { images } = UseGlobalContext();
  if (images === undefined)
    throw new Error("⛔ EnergySection, images is undefined!");

  return (
    <section className={styles.energySection}>
      <GreenLabel
        gameIcon={images?.gameIcons.energyProductionGameIcon}
        valueToDisplay={"30 MWh"}
        alt="CitizensSpace"
      />
      <GreenLabel
        gameIcon={images?.gameIcons.energyUtilizationGameIcon}
        valueToDisplay={"25 MWh"}
        alt="REGsSpace"
      />
    </section>
  );
};

export default EnergySection;
