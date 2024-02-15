import { UseGlobalContext } from "../../../../../../../context/GlobalContext/GlobalContext";
import { useGameVarsStore } from "../../../../../../../stores/gameVars";
import GreenLabel from "../../../../../../GameAssets/Labels/GreenLabel/GreenLabel";
import styles from "./energySectionStyles.module.css";

const EnergySection = () => {
  const { images } = UseGlobalContext();
  const { energyProduced, energyConsumed } = useGameVarsStore((state) => state);

  if (images === undefined)
    throw new Error("⛔ EnergySection, images is undefined!");

  return (
    <section className={styles.energySection}>
      <GreenLabel
        gameIcon={images?.gameIcons.energyProductionGameIcon}
        valueToDisplay={`${energyProduced}`}
        alt="CitizensSpace"
      />
      <GreenLabel
        gameIcon={images?.gameIcons.energyUtilizationGameIcon}
        valueToDisplay={`${energyConsumed}`}
        alt="REGsSpace"
      />
    </section>
  );
};

export default EnergySection;
