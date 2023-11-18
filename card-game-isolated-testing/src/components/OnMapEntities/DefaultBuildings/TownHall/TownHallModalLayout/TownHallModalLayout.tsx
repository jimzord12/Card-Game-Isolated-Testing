import { useEffect } from "react";
import { useModalStore } from "../../../../../stores/modalStore";
import CitizensSection from "./CategorySections/CitizensSection/CitizensSection";
import EnergySection from "./CategorySections/EnergySection/EnergySection";
import ResourcesSection from "./CategorySections/ResoursesSection/ResourcesSection";
import SpecialSection from "./CategorySections/SpecialSection/SpecialSection";
import styles from "./townHallModalStyles.module.css";

interface Props {
  isMainMenu: boolean;
  // setIsMainMenu: (isMainMenu: boolean) => void;
}

const TownHallModalLayout = ({ isMainMenu }: Props) => {
  const rerender = useModalStore((state) => state.rerender);

  useEffect(() => {
    console.log("TownHallModalLayout :: RE-RENDERED! => ", isMainMenu);
  }, [rerender, isMainMenu]);

  return (
    <>
      {isMainMenu ? (
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
      ) : (
        <div
          style={{
            color: "white",
            minWidth: "100%",
            minHeight: "100%",
            // backgroundColor: "red",
            position: "absolute",
            fontSize: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Coming Soon!
        </div>
      )}
    </>
  );
};

export default TownHallModalLayout;
