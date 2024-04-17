import { useEffect } from "react";
import {
  townhallAvailSpacePerLevel,
  townhallHousingLimitPerLevel,
} from "../../../../../../../constants/game/defaultBuildingsConfig";
import { UseGlobalContext } from "../../../../../../../context/GlobalContext/GlobalContext";
import { calcIncome } from "../../../../../../../hooks/game/gameLoop/utils";
import { useAllCardsStore } from "../../../../../../../stores/allCards";
import { useGameVarsStore } from "../../../../../../../stores/gameVars";
import { useGeneralVariablesStore } from "../../../../../../../stores/generalVariables";
import { round2Decimal } from "../../../../../../../utils/game/roundToDecimal";
import CircularGoldenLabel from "../../../../../../GameAssets/Labels/CircularGoldenLabel/CircularGoldenLabel";
import StandardLabel from "../../../../../../GameAssets/Labels/StandardLabel/StandardLabel";
import { useUtilsForStatsBars } from "../../../../../../StatsBars/useUtilsForStatsBars";
import styles from "./citizensSectionStyles.module.css";

const CitizensSection = () => {
  const { images } = UseGlobalContext();

  const popGrowthRate = useGameVarsStore((state) => state.popGrowthRate);
  const totalPop = useGameVarsStore((state) => state.player?.population);
  const playerGold = useGameVarsStore((state) => state.player?.gold);
  const activeEffect = useGameVarsStore((state) => state.activeEffect);
  const goldMultiplier = useGameVarsStore(
    (state) => state.multipliers.goldMultiplier
  );
  const privateSector = useGameVarsStore(
    (state) => state.allWorkers.privateSector
  );
  console.log("🔵 CitizensSection: privateSector: ", privateSector);
  console.log("🔵 CitizensSection: goldMultiplier: ", goldMultiplier);
  const income = calcIncome(privateSector, goldMultiplier, activeEffect);
  const expenses = useGameVarsStore((state) => state.expences);
  // const expenses = maintenanceSubtracker();

  useEffect(() => {
    console.log("🔵 CitizensSection: income: ", income);
  }, [income]);

  const allActiveRegCards = useAllCardsStore((state) => state.activeRegCards);
  const allActiveBuildingCards = useAllCardsStore(
    (state) => state.activeBuildingCards
  );

  const ratesResourcesToggler = useGeneralVariablesStore(
    (state) => state.ratesResourcesToggler
  );

  const townHallLevel = useGameVarsStore((state) => state.townhallLevel);
  const { shortenLongNum } = useUtilsForStatsBars();

  if (images === undefined)
    throw new Error("⛔ CitizensSection, images is undefined!");

  if (totalPop === undefined || totalPop === null)
    throw new Error("⛔ CitizensSection, totalPop is undefined or null!");

  return (
    // IMPORTANT: StandardLabel and other Labels from GameAssets are NOT the official ones.
    // They were created for the first presensation of the game's new Graphics.
    // But, as they work fine, they will NOT be replaced by the official ones (in /components/Labels).
    <>
      {/* >>> TOWN-SPACE SECTION <<< */}
      <section className={styles.spaceSection}>
        <>
          {ratesResourcesToggler ? (
            <StandardLabel
              gameIcon={images?.workers.simpleCitizenWorker}
              valueToDisplay={`${Math.floor(privateSector)}/${Math.floor(
                totalPop
              )}`}
              alt="CitizensSpace-Private Sector / Total Citizens"
            />
          ) : (
            // THIS IS DISPLAYED FRIST
            <StandardLabel
              gameIcon={images?.gameIcons.citizensSpaceGameIcon}
              valueToDisplay={`${Math.floor(totalPop)}/${
                townhallHousingLimitPerLevel[townHallLevel]
              }`}
              alt="CitizensSpace-Total Citizen Space"
            />
          )}
        </>
        <StandardLabel
          gameIcon={images?.gameIcons.regSpaceGameIcon}
          valueToDisplay={`${allActiveRegCards.length}/${townhallAvailSpacePerLevel[townHallLevel].regs}`}
          alt="REGsSpace"
        />
        <StandardLabel
          gameIcon={images?.gameIcons.buildingsSpaceGameIcon}
          valueToDisplay={`${allActiveBuildingCards.length}/${townhallAvailSpacePerLevel[townHallLevel].buildings}`}
          alt="BuildingsSpace"
        />
      </section>

      {/* >>> TOWN-ECONOMY SECTION <<< */}
      <section className={styles.economySection}>
        <StandardLabel
          gameIcon={images?.gameIcons.totalGoldGameIcon}
          valueToDisplay={`${shortenLongNum(round2Decimal(playerGold ?? -1))}`}
          alt="CitizensSpace"
        />
        <StandardLabel
          gameIcon={images?.gameIcons.incomeGameIcon}
          valueToDisplay={`${round2Decimal(income)} /h`}
          alt="REGsSpace"
        />
        <StandardLabel
          gameIcon={images?.gameIcons.expensesGameIcon}
          valueToDisplay={`${round2Decimal(expenses)} /h`}
          alt="BuildingsSpace"
        />
      </section>

      {/* >>> TOWN-CITIZEN-STATS SECTION <<< */}
      <section className={styles.citizenStatsSection}>
        <div className={styles.citizenHappiness}>
          <CircularGoldenLabel
            popGrowthRate={popGrowthRate}
            alt="CitizensSpace"
          />
        </div>
        <div className={styles.citizenGrowth}>
          <StandardLabel
            gameIcon={images?.gameIcons.growthGameIcon}
            valueToDisplay={`${round2Decimal(popGrowthRate)} /h`}
            alt="REGsSpace"
          />
        </div>
      </section>
    </>
  );
};

export default CitizensSection;
