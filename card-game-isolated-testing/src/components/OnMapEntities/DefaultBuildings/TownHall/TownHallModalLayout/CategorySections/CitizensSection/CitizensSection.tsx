import { UseGlobalContext } from "../../../../../../../context/GlobalContext/GlobalContext";
import CircularGoldenLabel from "../../../../../../GameAssets/Labels/CircularGoldenLabel/CircularGoldenLabel";
import StandardLabel from "../../../../../../GameAssets/Labels/StandardLabel/StandardLabel";
import styles from "./citizensSectionStyles.module.css";

const CitizensSection = () => {
  const { images } = UseGlobalContext();
  //TODO: When a Store is Created that hold the Player's Stats fix this!

  if (images === undefined)
    throw new Error("⛔ CitizensSection, images is undefined!");

  return (
    <>
      {/* >>> TOWN-SPACE SECTION <<< */}
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

      {/* >>> TOWN-ECONOMY SECTION <<< */}
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

      {/* >>> TOWN-CITIZEN-STATS SECTION <<< */}
      <section className={styles.citizenStatsSection}>
        <div className={styles.citizenHappiness}>
          <CircularGoldenLabel
            totalPop={100}
            happinessValue={80}
            alt="CitizensSpace"
          />
        </div>
        <div className={styles.citizenGrowth}>
          <StandardLabel
            gameIcon={images?.gameIcons.growthGameIcon}
            valueToDisplay={"1/3"}
            alt="REGsSpace"
          />
        </div>
      </section>
    </>
  );
};

export default CitizensSection;
