import CitizensSection from "./CategorySections/CitizensSection/CitizensSection";
import styles from "./styles.module.css";

// interface Props {
//   // Define props here
// }

const TownHallModalLayout = () => {
  // Component logic here

  return (
    <div className={styles.townHallModalLayout}>
      <div className={styles.citizenSectionContainer}>
        <CitizensSection />
      </div>
    </div>
  );
};

export default TownHallModalLayout;
