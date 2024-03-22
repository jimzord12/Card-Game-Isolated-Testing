import { useState } from "react";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../hooks/game/useGetLabelsSize";
import { round2Decimal } from "../../../../utils/game/roundToDecimal";
import CustomSlider from "../../../CustomSlider/CustomSlider";
import LabelWithIcon from "../../../Labels/LabelWithIcon/LabelWithIcon";
import { useGameVarsStore } from "../../../../stores/gameVars";
import {
  barrelToEnergyConversion,
  barrelToSadnessConversion,
  factoryBarrelsPerLevel,
} from "../../../../constants/game/defaultBuildingsConfig";

const FactoryMainScreen = () => {
  const { images } = UseGlobalContext();
  const deviceSize = useGetLabelsSize();

  const gameVars = useGameVarsStore();
  const currentPopGrowth = round2Decimal(gameVars.popGrowthRate);
  const currentEnergyProduced = round2Decimal(gameVars.energyProduced);

  const [sliderValue, setSliderValue] = useState(gameVars.factoryBarrels); // init: 80
  //   const [sadnessFromFactory, setSadnessFromFactory] = useState(
  //     currentPopGrowth - barrelToSadnessConversion * sliderValue
  //   );
  const [energyFromBarrels, setEnergyFromBarrels] = useState(
    gameVars.factoryBarrels * barrelToEnergyConversion
  ); // init: 800

  const handleSliderChange = (newValue: number) => {
    console.log("New Slider Value", newValue);
    const differenceInBarrels = newValue - sliderValue;
    console.log("Difference in Barrels", differenceInBarrels);

    const differenceInEnergyFromBarrelsToDisplay =
      energyFromBarrels + differenceInBarrels * barrelToEnergyConversion;

    const differenceInEnergyFromBarrelsForCalc =
      differenceInBarrels * barrelToEnergyConversion;

    console.log("=========================================");

    console.log("Current PopGrowth", currentPopGrowth);
    const differenceInHappiness =
      differenceInBarrels * barrelToSadnessConversion;
    console.log(
      "Difference in Happiness",
      round2Decimal(differenceInHappiness)
    );
    console.log("=========================================");

    setEnergyFromBarrels(round2Decimal(differenceInEnergyFromBarrelsToDisplay));
    gameVars.setPopGrowthRate(
      round2Decimal(currentPopGrowth - differenceInHappiness)
    );

    gameVars.setEnergyProduced(
      round2Decimal(
        differenceInEnergyFromBarrelsForCalc + currentEnergyProduced
      )
    );
    gameVars.setFactoryBarrels(newValue);

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
