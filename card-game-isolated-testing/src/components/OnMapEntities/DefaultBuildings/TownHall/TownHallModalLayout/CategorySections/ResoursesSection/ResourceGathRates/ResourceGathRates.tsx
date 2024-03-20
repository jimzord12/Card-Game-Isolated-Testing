import { UseGlobalContext } from "../../../../../../../../context/GlobalContext/GlobalContext";
import { useGameVarsStore } from "../../../../../../../../stores/gameVars";
import { round2Decimal } from "../../../../../../../../utils/game/roundToDecimal";
import RustyLabel from "../../../../../../../GameAssets/Labels/RustyLabel/RustyLabel";
import styles from "./resourcesSectionStyles.module.css";

const ResourceGathRates = () => {
  const { images } = UseGlobalContext();
  if (images === undefined)
    throw new Error("⛔ ResourceGathRates, images is undefined!");

  const concreteGathRate = useGameVarsStore.getState().concreteGathRate;
  const metalsGathRate = useGameVarsStore.getState().metalsGathRate;
  const crystalsGathRate = useGameVarsStore.getState().crystalsGathRate;
  const dieselGathRate = useGameVarsStore.getState().dieselGathRate;
  console.log(
    "ResourceGathRates: ",
    concreteGathRate,
    metalsGathRate,
    crystalsGathRate,
    dieselGathRate
  );

  return (
    <>
      {/* >>> CONCRETE + METALS SECTION <<< */}
      <section className={styles.concreteMetalsSection}>
        <RustyLabel
          gameIcon={images?.gameIcons.concreteGameIcon}
          valueToDisplay={`${round2Decimal(concreteGathRate)} /h`}
          alt="Concrete Section"
        />
        <RustyLabel
          gameIcon={images?.gameIcons.metalsGameIcon}
          valueToDisplay={`${round2Decimal(metalsGathRate)} /h`}
          alt="MetalsS ection"
        />
      </section>

      {/* >>> CRYSTALS + DIESEL SECTION <<< */}
      <section className={styles.crystalsDieselSection}>
        <RustyLabel
          gameIcon={images?.gameIcons.crystalsGameIcon}
          valueToDisplay={`${round2Decimal(crystalsGathRate)} /h`}
          alt="Crystals Section"
        />
        <RustyLabel
          gameIcon={images?.gameIcons.dieselBarrelGameIcon}
          valueToDisplay={`${round2Decimal(dieselGathRate)} /h`}
          alt="Diesel Section"
        />
      </section>
    </>
  );
};

export default ResourceGathRates;
