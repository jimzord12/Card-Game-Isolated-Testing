import { UseGlobalContext } from "../../../../../../../../context/GlobalContext/GlobalContext";
import { useGameVarsStore } from "../../../../../../../../stores/gameVars";
import RustyLabel from "../../../../../../../GameAssets/Labels/RustyLabel/RustyLabel";
import { useUtilsForStatsBars } from "../../../../../../../StatsBars/useUtilsForStatsBars";
import styles from "./resourcesSectionStyles.module.css";

const TotalResources = () => {
  const { images } = UseGlobalContext();
  if (images === undefined)
    throw new Error("⛔ ResourceGathRates, images is undefined!");

  const gameVars = useGameVarsStore((state) => state);
  const { shortenLongNum } = useUtilsForStatsBars();

  return (
    <>
      {/* >>> CONCRETE + METALS SECTION <<< */}
      <section className={styles.concreteMetalsSection}>
        <RustyLabel
          gameIcon={images?.gameIcons.concreteGameIcon}
          valueToDisplay={`${shortenLongNum(gameVars.player?.concrete ?? -1)}`}
          alt="Concrete Resources Section"
        />
        <RustyLabel
          gameIcon={images?.gameIcons.metalsGameIcon}
          valueToDisplay={`${shortenLongNum(gameVars.player?.metals ?? -1)}`}
          alt="Metals Resources ection"
        />
      </section>

      {/* >>> CRYSTALS + DIESEL SECTION <<< */}
      <section className={styles.crystalsDieselSection}>
        <RustyLabel
          gameIcon={images?.gameIcons.crystalsGameIcon}
          valueToDisplay={`${shortenLongNum(gameVars.player?.crystals ?? -1)}`}
          alt="Crystals Resources Section"
        />
        <RustyLabel
          gameIcon={images?.gameIcons.dieselBarrelGameIcon}
          valueToDisplay={`${shortenLongNum(gameVars.player?.diesel ?? -1)}`}
          alt="Diesel Resources Section"
        />
      </section>
    </>
  );
};

export default TotalResources;
