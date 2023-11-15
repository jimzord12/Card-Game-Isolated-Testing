import { UseGlobalContext } from "../../../../../../../context/GlobalContext/GlobalContext";
import StandardLabel from "../../../../../../GameAssets/Labels/StandardLabel/StandardLabel";
import styles from "./styles.module.css";

const CitizensSection = () => {
  const { images } = UseGlobalContext();
  if (images === undefined)
    throw new Error("⛔ CitizensSection, images is undefined!");

  return (
    <>
      <section className={styles.spaceSection}>
        <StandardLabel
          gameIcon={images?.gameIcons.citizensSpaceGameIcon}
          valueToDisplay={"45/60"}
          alt="CitizensSpace"
        />
        <StandardLabel
          gameIcon={images?.gameIcons.regSpaceGameIcon}
          valueToDisplay={"1/3"}
          alt="REGsSpace"
        />
        <StandardLabel
          gameIcon={images?.gameIcons.buildingsSpaceGameIcon}
          valueToDisplay={"235/468"}
          alt="BuildingsSpace"
        />
      </section>
      <section className={styles.economySection}>
        <StandardLabel
          gameIcon={images?.gameIcons.totalGoldGameIcon}
          valueToDisplay={"45/60"}
          alt="CitizensSpace"
        />
        <StandardLabel
          gameIcon={images?.gameIcons.incomeGameIcon}
          valueToDisplay={"1/3"}
          alt="REGsSpace"
        />
        <StandardLabel
          gameIcon={images?.gameIcons.expensesGameIcon}
          valueToDisplay={"235/468"}
          alt="BuildingsSpace"
        />
      </section>
      <section className={styles.CitizenStatsSection}>
        <StandardLabel
          gameIcon={images?.gameIcons.citizensSpaceGameIcon}
          valueToDisplay={"45/60"}
          alt="CitizensSpace"
        />
        <StandardLabel
          gameIcon={images?.gameIcons.growthGameIcon}
          valueToDisplay={"1/3"}
          alt="REGsSpace"
        />
      </section>
    </>
  );
};

export default CitizensSection;
