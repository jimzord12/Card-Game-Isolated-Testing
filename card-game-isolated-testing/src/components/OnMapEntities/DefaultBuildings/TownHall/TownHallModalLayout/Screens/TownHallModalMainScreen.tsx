import CitizensSection from "../CategorySections/CitizensSection/CitizensSection";
import EnergySection from "../CategorySections/EnergySection/EnergySection";
import ResourcesSection from "../CategorySections/ResoursesSection/ResourcesSection";
import SpecialSection from "../CategorySections/SpecialSection/SpecialSection";
import styles from "./townHallModalStyles.module.css";

const TownHallModalMainScreen = () => {
  return (
    <div className={styles.townHallModalLayout}>
      <div className={styles.citizenSectionContainer}>
        <CitizensSection />
      </div>
      <div className={styles.theRestSectionContainer}>
        <div className={styles.resourcesSectionContainer}>
          <ResourcesSection />
        </div>
        <div className={styles.energySectionContainer}>
          <EnergySection />
        </div>
        <div className={styles.specialSectionContainer}>
          <SpecialSection />
        </div>
      </div>
    </div>
  );
};

export default TownHallModalMainScreen;
