import { defaultBuildingsConfig } from "../../../../../../../constants/game";
import { UseGlobalContext } from "../../../../../../../context/GlobalContext/GlobalContext";
import { calcRank } from "../../../../../../../hooks/game/gameLoop/utils";
import { useGameVarsStore } from "../../../../../../../stores/gameVars";
import SpecialLabel from "../../../../../../GameAssets/Labels/SpecialLabel/SpecialLabel";
import styles from "./specialSectionStyles.module.css";

const SpecialSection = () => {
  const { images } = UseGlobalContext();
  const { energyProduced, player, factoryBarrels } = useGameVarsStore(
    (state) => state
  );

  const factoryEnergy =
    factoryBarrels * defaultBuildingsConfig.barrelToEnergyConversion;
  const onlyGreenEnergy = energyProduced - factoryEnergy;
  // const environment = useGameVarsStore((state) => state.environment); //TODO: Implement Environment

  if (images === undefined)
    throw new Error("⛔ SpecialSection, images is undefined!");

  return (
    <section className={styles.specialSection}>
      <SpecialLabel
        gameIcon={images?.gameIcons.rankGameIcon}
        valueToDisplay={
          "Score: " + calcRank(player?.population ?? 0, onlyGreenEnergy) ??
          "XerrorX"
        }
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
