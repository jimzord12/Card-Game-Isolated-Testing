import { UseGlobalContext } from "../../../../../../../context/GlobalContext/GlobalContext";
import { useGameVarsStore } from "../../../../../../../stores/gameVars";
import SpecialLabel from "../../../../../../GameAssets/Labels/SpecialLabel/SpecialLabel";
import styles from "./specialSectionStyles.module.css";

const SpecialSection = () => {
  const { images } = UseGlobalContext();
  const playerData = useGameVarsStore((state) => state.player);
  // const environment = useGameVarsStore((state) => state.environment); //TODO: Implement Environment

  if (images === undefined)
    throw new Error("⛔ SpecialSection, images is undefined!");

  return (
    <section className={styles.specialSection}>
      <SpecialLabel
        gameIcon={images?.gameIcons.rankGameIcon}
        valueToDisplay={"No. " + playerData?.rank ?? "XerrorX"}
        alt="CitizensSpace"
      />
      <SpecialLabel
        gameIcon={images?.gameIcons.calendarGameIcon}
        valueToDisplay={"Coming Soon"}
        alt="REGsSpace"
      />
    </section>
  );
};

export default SpecialSection;
