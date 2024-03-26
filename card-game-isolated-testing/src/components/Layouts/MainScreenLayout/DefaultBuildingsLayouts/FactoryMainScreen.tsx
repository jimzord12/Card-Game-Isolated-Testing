import { useEffect, useState } from "react";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../hooks/game/useGetLabelsSize";
import { round2Decimal } from "../../../../utils/game/roundToDecimal";
import CustomSlider from "../../../CustomSlider/CustomSlider";
import LabelWithIcon from "../../../Labels/LabelWithIcon/LabelWithIcon";
import { useGameVarsStore } from "../../../../stores/gameVars";
import {
  barrelToEnergyConversion,
  factoryBarrelsPerLevel,
} from "../../../../constants/game/defaultBuildingsConfig";
import { calcPopGrowthRate } from "../../../../hooks/game/gameLoop/calculators/gathRatesCalculators";
import { useToastError } from "../../../../hooks/notifications";

const FactoryMainScreen = () => {
  const { images } = UseGlobalContext();
  const deviceSize = useGetLabelsSize();
  const { showError } = useToastError();

  const gameVars = useGameVarsStore();
  // console.log("[1] - Population: ", gameVars.player?.population);
  // console.log(
  //   "[2] - Happiness From Buildings: ",
  //   gameVars.happinessFromBuildings
  // );
  // console.log("[3] - Factory Unhappiness: ", gameVars.factoryUnhappiness);
  const currentPopGrowth = round2Decimal(
    calcPopGrowthRate(
      gameVars.player?.population ?? 0,
      gameVars.happinessFromBuildings,
      gameVars.factoryUnhappiness
    )
  );
  // const currentHappyFromBuildings = round2Decimal(
  //   gameVars.happinessFromBuildings
  // );
  const currentEnergyProduced = round2Decimal(gameVars.energyProduced);

  const [sliderValue, setSliderValue] = useState(gameVars.factoryBarrels); // init: 80
  const [lastSafeValue, setLastSafeValue] = useState(gameVars.factoryBarrels);
  //   const [sadnessFromFactory, setSadnessFromFactory] = useState(
  //     currentPopGrowth - barrelToSadnessConversion * sliderValue
  //   );
  const [energyFromBarrels, setEnergyFromBarrels] = useState(
    gameVars.factoryBarrels * barrelToEnergyConversion
  );

  const handleSliderChange = (newValue: number) => {
    // console.log("1 - New Slider Value", newValue);
    const differenceInBarrels = newValue - sliderValue;
    // console.log("2 - Difference in Barrels", differenceInBarrels);
    // console.log("=========================================");

    const differenceInEnergyFromBarrelsToDisplay =
      energyFromBarrels + differenceInBarrels * barrelToEnergyConversion;

    const differenceInEnergyFromBarrelsForCalc =
      differenceInBarrels * barrelToEnergyConversion;
    // console.log("4 - Factory - Energy Produced", currentEnergyProduced);

    // console.log("=========================================");

    // console.log("5 - Current PopGrowth", currentPopGrowth);
    // const differenceInHappiness =
    //   differenceInBarrels * barrelToSadnessConversion;
    // console.log(
    //   "6 - Difference in Happiness",
    //   round2Decimal(differenceInHappiness)
    // );
    // console.log("=========================================");

    const newProducedEnergy = round2Decimal(
      differenceInEnergyFromBarrelsForCalc + currentEnergyProduced
    );
    const currentEnergyConsumed = gameVars.energyConsumed;

    if (currentEnergyConsumed > newProducedEnergy) {
      console.log(
        "🔴 FactoryMainScreen: Energy Consumed is greater than Energy Produced!"
      );
      showError(
        "Invalid Action!",
        "You cannot decrease the Barrels, because it will cause an energy shortage!",
        "First, deactivate some Buildings."
      );

      // ✨ A lot is happening in "setFactoryBarrels" at gameVars, go check it out for debugging.
      gameVars.setFactoryBarrels(lastSafeValue);
      setEnergyFromBarrels(
        round2Decimal(lastSafeValue * barrelToEnergyConversion)
      );
      gameVars.setEnergyProduced(
        currentEnergyProduced + lastSafeValue * barrelToEnergyConversion
      );

      return false;
    }

    // Update the Global State
    // ✨ A lot is happening in "setFactoryBarrels" at gameVars, go check it out for debugging.
    gameVars.setFactoryBarrels(newValue);
    setLastSafeValue(newValue);

    // Local State (useState)
    setEnergyFromBarrels(round2Decimal(differenceInEnergyFromBarrelsToDisplay));

    // // Updating the Game State
    // gameVars.setPopGrowthRate(
    //   round2Decimal(
    //     calcPopGrowthRate(
    //       gameVars.player?.population ?? 0,
    //       gameVars.happinessFromBuildings,
    //       gameVars.factoryUnhappiness
    //     )
    //   )
    // );
    // gameVars.setHappinessFromBuildings(
    //   currentHappyFromBuildings - differenceInHappiness
    // );

    gameVars.setEnergyProduced(newProducedEnergy);

    // Update the slider value
    setSliderValue(newValue);
  };

  const maxSliderBarrelLimit = Math.min(
    gameVars.player?.diesel ?? 0,
    factoryBarrelsPerLevel[gameVars.factoryLevel]
  );

  if (images?.maps === undefined || images?.onMapAssets === undefined)
    throw new Error("⛔ HopsitalLayoutManage.tsx: images are undefined!");

  const faceFinder = (popGrowthRate: number): string => {
    if (popGrowthRate < 0) return images.gameIcons.angryFaceGameIcon;
    if (popGrowthRate >= 0 && popGrowthRate < 1)
      return images.gameIcons.sadFaceGameIcon;
    if (popGrowthRate >= 1 && popGrowthRate < 2)
      return images.gameIcons.neutralFaceGameIcon;
    if (popGrowthRate >= 2 && popGrowthRate < 3.5)
      return images.gameIcons.happyFaceGameIcon;
    if (popGrowthRate >= 3.5) return images.gameIcons.overjoyedFaceGameIcon;
    console.error(
      "⛔ CircularGoldenLabel: popGrowthRate is invalid!",
      popGrowthRate
    );
    return "calendarGameIcon";
  };

  useEffect(() => {
    setEnergyFromBarrels(round2Decimal(sliderValue * barrelToEnergyConversion));
  }, [sliderValue]);

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="flex flex-col items-center p-16 pb-20 bt-12 bg-emerald-700/[.55] rounded-xl border-2 tablet:border-4">
        <div className="h-0 superSmall:h-12" />
        <LabelWithIcon
          image={faceFinder(currentPopGrowth)}
          labelImages={images.labels}
          labelType="special"
          size={deviceSize}
          value={currentPopGrowth}
          valueType={{
            type: "/h",
            color: "black",
          }}
          position="top"
          desc={{
            text: "Total Growth Rate",
            style: "white",
          }}
        />
        <div className="flex items-center gap-3">
          <LabelWithIcon
            image={images.gameIcons.dieselBarrelGameIcon}
            labelImages={images.labels}
            labelType="special"
            size={deviceSize}
            value={Math.ceil(gameVars.factoryBarrels)}
            valueType={{
              color: "black",
            }}
            position="top"
            desc={{
              text: "Diesel Barrels per hour",
              style: "white",
            }}
          />
          <CustomSlider
            max={maxSliderBarrelLimit}
            initValue={Math.ceil(gameVars.factoryBarrels)}
            onChange={handleSliderChange}
            size={deviceSize}
            lastSafeValue={lastSafeValue}
          />
          <LabelWithIcon
            image={images.gameIcons.energyUtilizationGameIcon}
            labelImages={images.labels}
            labelType="special"
            size={deviceSize}
            value={energyFromBarrels}
            valueType={{
              color: "black",
              addSepiaFilter: true,
            }}
            position="top"
            desc={{
              text: "Energy From Diesel Barrels",
              style: "white",
            }}
          />
        </div>
      </div>
      <div className="h-16" />
    </div>
  );
};

export default FactoryMainScreen;
