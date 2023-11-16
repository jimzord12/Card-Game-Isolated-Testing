import { UseGlobalContext } from "../../../../../../../context/GlobalContext/GlobalContext";
import RustyLabel from "../../../../../../GameAssets/Labels/RustyLabel/RustyLabel";
import styles from "./resourcesSectionStyles.module.css";

const ResourcesSection = () => {
  const { images } = UseGlobalContext();
  if (images === undefined)
    throw new Error("⛔ ResourcesSection, images is undefined!");

  return (
    <>
      {/* >>> CONCRETE + METALS SECTION <<< */}
      <section className={styles.concreteMetalsSection}>
        <RustyLabel
          gameIcon={images?.gameIcons.concreteGameIcon}
          valueToDisplay={"250 /h"}
          alt="CitizensSpace"
        />
        <RustyLabel
          gameIcon={images?.gameIcons.metalsGameIcon}
          valueToDisplay={"175 /h"}
          alt="REGsSpace"
        />
      </section>

      {/* >>> CRYSTALS + DIESEL SECTION <<< */}
      <section className={styles.crystalsDieselSection}>
        <RustyLabel
          gameIcon={images?.gameIcons.crystalsGameIcon}
          valueToDisplay={"50 /h"}
          alt="CitizensSpace"
        />
        <RustyLabel
          gameIcon={images?.gameIcons.dieselBarrelGameIcon}
          valueToDisplay={"30 /h"}
          alt="REGsSpace"
        />
      </section>
    </>
  );
};

export default ResourcesSection;
