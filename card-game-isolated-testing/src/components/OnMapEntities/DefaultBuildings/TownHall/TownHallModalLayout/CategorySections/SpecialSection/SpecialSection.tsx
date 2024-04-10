import { useEffect, useState } from "react";
import { defaultBuildingsConfig } from "../../../../../../../constants/game";
import { UseGlobalContext } from "../../../../../../../context/GlobalContext/GlobalContext";
import { calcRank } from "../../../../../../../hooks/game/gameLoop/utils";
import { useGameVarsStore } from "../../../../../../../stores/gameVars";
import SpecialLabel from "../../../../../../GameAssets/Labels/SpecialLabel/SpecialLabel";
import styles from "./specialSectionStyles.module.css";
import { getMGSBalance } from "../../../../../../../../api/apiFns";
import { useToastError } from "../../../../../../../hooks/notifications";
import SimpleSpinner from "../../../../../../SimpleSpinner/SimpleSpinner";
import MGSTokenIcon from "../../../../../../../assets/newAdditions/MGS_Token_Icon.webp";

const SpecialSection = () => {
  const { images } = UseGlobalContext();
  const { energyProduced, player, factoryBarrels } = useGameVarsStore(
    (state) => state
  );

  const factoryEnergy =
    factoryBarrels * defaultBuildingsConfig.barrelToEnergyConversion;
  const onlyGreenEnergy = energyProduced - factoryEnergy;
  // const environment = useGameVarsStore((state) => state.environment); //TODO: Implement Environment

  const { showError } = useToastError();

  if (images === undefined)
    throw new Error("⛔ SpecialSection, images is undefined!");

  const [mgsBalance, setMgsBalance] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    (async () => {
      const { success, balance } = await getMGSBalance(
        player?.wallet ?? "XerrorX"
      );
      if (success) {
        timer = setTimeout(() => {
          setMgsBalance(balance);
        }, 1200);
        console.log("✅ MGS Balance: ", balance);
      } else {
        showError(
          "⛔ MGS Balance Problem",
          "We could not retrieve your MGS balance!"
        );
        setMgsBalance(-1);
      }
    })();

    return () => {
      setMgsBalance(null);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className={styles.specialSection}>
      <SpecialLabel
        gameIcon={images?.gameIcons.rankGameIcon}
        valueToDisplay={
          "Score: " + calcRank(player?.population ?? 0, onlyGreenEnergy) ??
          "XerrorX"
        }
        alt="Player Rank Score"
      />
      <SpecialLabel
        gameIcon={MGSTokenIcon}
        valueToDisplay={
          mgsBalance === null ? (
            <div className="w-full h-1/4 flex justify-center">
              <div className="w-1/4 h-1/4 translate-x-1">
                <SimpleSpinner />
              </div>
            </div>
          ) : (
            String(mgsBalance.toFixed(2))
          )
        }
        alt="MGS Token Balance"
      />
    </section>
  );
};

export default SpecialSection;
