import { UseGlobalContext } from "../../../../../../../../context/GlobalContext/GlobalContext";
import { useGameVarsStore } from "../../../../../../../../stores/gameVars";
import RustyLabel from "../../../../../../../GameAssets/Labels/RustyLabel/RustyLabel";
import styles from "./resourcesSectionStyles.module.css";

const ResourceGathRates = () => {
  const { images } = UseGlobalContext();
  if (images === undefined)
    throw new Error("⛔ ResourceGathRates, images is undefined!");

  const gameVars = useGameVarsStore();

  return (
    <>
      {/* >>> CONCRETE + METALS SECTION <<< */}
      <section className={styles.concreteMetalsSection}>
        <RustyLabel
          gameIcon={images?.gameIcons.concreteGameIcon}
          valueToDisplay={`${gameVars.concreteGathRate} /h`}
          alt="Concrete Section"
        />
        <RustyLabel
          gameIcon={images?.gameIcons.metalsGameIcon}
          valueToDisplay={`${gameVars.metalsGathRate} /h`}
          alt="MetalsS ection"
        />
      </section>

      {/* >>> CRYSTALS + DIESEL SECTION <<< */}
      <section className={styles.crystalsDieselSection}>
        <RustyLabel
          gameIcon={images?.gameIcons.crystalsGameIcon}
          valueToDisplay={`${gameVars.crystalsGathRate} /h`}
          alt="Crystals Section"
        />
        <RustyLabel
          gameIcon={images?.gameIcons.dieselBarrelGameIcon}
          valueToDisplay={`${gameVars.dieselGathRate} /h`}
          alt="Diesel Section"
        />
      </section>
    </>
  );
};

export default ResourceGathRates;
