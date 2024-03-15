import { useMemo, useState } from "react";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../hooks/game/useGetLabelsSize";
import CustomSlider from "../../../CustomSlider/CustomSlider";
import LabelWithIcon from "../../../Labels/LabelWithIcon/LabelWithIcon";
import { useGameVarsStore } from "../../../../stores/gameVars";
import {
  concreteQuarryConstants,
  dieselQuarryConstants,
} from "../../../../constants/game/quarriesConfig";
import { Level } from "../../../../types";

const DieselQuarrySliderSection = () => {
  const { images } = UseGlobalContext();
  const deviceSize = useGetLabelsSize();
  const gameVars = useGameVarsStore();
  if (images === undefined)
    throw new Error("⛔ DieselQuarrySliderSection.tsx: images are undefined!");

  const allWorkers = gameVars.allWorkers;

  const workers = gameVars.allWorkers.dieselWorkers; // ✨ ✅
  const mulitplier = gameVars.multipliers.dieselMultiplier; // ✨ ✅

  const [sliderValue, setSliderValue] = useState(workers);
  const [gatherRate, setGatherRate] = useState(workers * mulitplier);

  const handleSliderChange = (newValue: number) => {
    const differenceInWorkers = newValue - sliderValue;

    const differenceInGatherRate = differenceInWorkers * mulitplier;
    const newPrivateSector = allWorkers.privateSector - differenceInWorkers;

    setGatherRate(gatherRate + differenceInGatherRate);
    gameVars.setDieselGathRate(gatherRate + differenceInGatherRate); // ✨ ✅
    gameVars.setAllWorkers({
      ...allWorkers,
      privateSector: newPrivateSector,
      dieselWorkers: newValue, // ✨ ✅
    });

    // Update the slider value
    setSliderValue(newValue);
  };

  const maxAvailWorkers = useMemo(
    () =>
      Math.min(
        allWorkers.privateSector + allWorkers.dieselWorkers, // ✨ ✅
        dieselQuarryConstants.maxWorkers[ // ✨ ✅
          gameVars.quarryLevels.diesel as Level // ✨ ✅
        ]
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  console.log("maxAvailWorkers", maxAvailWorkers);
  console.log("allWorkers.privateSector", allWorkers.privateSector);
  console.log(
    "concreteQuarryConstants.maxWorkers[gameVars.quarryLevels.concrete as Level]",
    concreteQuarryConstants.maxWorkers[gameVars.quarryLevels.concrete as Level]
  );

  return (
    <div className="flex flex-col justify-center items-center w-fit h-fit ">
      {/* <h1 className="text-white text-4xl font-extrabold">
    This is the Hopsital Manage Screen/Layout
  </h1> */}
      <div className="flex flex-col items-center p-16 pb-24 bg-emerald-700/[.55] rounded-xl">
        <LabelWithIcon
          image={images.gameIcons.dieselBarrelGameIcon} // ✨ ✅
          labelImages={images.labels}
          labelType="special"
          size={deviceSize}
          value={gatherRate}
          valueType={{
            type: "/h",
            color: "black",
          }}
          position="top"
          desc={{
            text: "Gather Rate",
            style: "white",
          }}
        />
        <div className="flex items-center gap-3">
          <LabelWithIcon
            image={images.workers.simpleCitizenWorker}
            labelImages={images.labels}
            labelType="rusty"
            size={deviceSize}
            value={Math.ceil(allWorkers.privateSector)}
            valueType={{
              color: "rusty",
            }}
            position="top"
            desc={{
              text: "Citizens",
              style: "white",
            }}
          />
          <CustomSlider
            max={Math.ceil(maxAvailWorkers)}
            initValue={Math.ceil(allWorkers.dieselWorkers)} // ✨ ✅
            onChange={handleSliderChange}
            size={deviceSize}
          />
          <LabelWithIcon
            image={images.workers.oilRigWorker} // ✨ ✅
            labelImages={images.labels}
            labelType="rusty"
            size={deviceSize}
            value={allWorkers.dieselWorkers} // ✨ ✅
            valueType={{
              type: "maxLimit",
              limit: maxAvailWorkers,
              color: "rusty",
            }}
            position="top"
            desc={{
              text: "Workers",
              style: "white",
            }}
          />
        </div>
      </div>
      <div className="h-16" />
    </div>
  );
};

export default DieselQuarrySliderSection;
