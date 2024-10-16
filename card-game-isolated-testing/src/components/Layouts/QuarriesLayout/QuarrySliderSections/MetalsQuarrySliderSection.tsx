import { useMemo, useState } from "react";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../hooks/game/useGetLabelsSize";
import CustomSlider from "../../../CustomSlider/CustomSlider";
import LabelWithIcon from "../../../Labels/LabelWithIcon/LabelWithIcon";
import { useGameVarsStore } from "../../../../stores/gameVars";
import {
  concreteQuarryConstants,
  metalsQuarryConstants,
} from "../../../../constants/game/quarriesConfig";
import { Level } from "../../../../types";
// import { useToastError } from "../../../../hooks/notifications";

const MetalsQuarrySliderSection = () => {
  const { images } = UseGlobalContext();
  const deviceSize = useGetLabelsSize();
  const gameVars = useGameVarsStore();
  if (images === undefined)
    throw new Error("⛔ MetalsQuarrySliderSection.tsx: images are undefined!");

  // const [lastSafeValue, setLastSafeValue] = useState(
  //   gameVars.allWorkers.metalsWorkers
  // );
  // const { showError } = useToastError();

  const allWorkers = gameVars.allWorkers;

  const workers = gameVars.allWorkers.metalsWorkers; // ✨ ✅
  const mulitplier = gameVars.multipliers.metalsMultiplier; // ✨ ✅

  const [sliderValue, setSliderValue] = useState(workers);
  const [gatherRate, setGatherRate] = useState(workers * mulitplier);

  const handleSliderChange = (newValue: number) => {
    const differenceInWorkers = newValue - sliderValue;

    const differenceInGatherRate = differenceInWorkers * mulitplier;
    const newPrivateSector = allWorkers.privateSector - differenceInWorkers;

    // const newGoldIncome =
    //   newPrivateSector * gameVars.multipliers.goldMultiplier;
    // const currentExpences = gameVars.expences;
    // if (currentExpences > newGoldIncome) {
    //   showError(
    //     "You cannot afford more Workers",
    //     "Descrease your Expenses or Increase your Gold Income!"
    //   );

    //   setGatherRate(lastSafeValue * mulitplier);
    //   gameVars.setMetalsGathRate(lastSafeValue * mulitplier); // ✨ ✅
    //   gameVars.setAllWorkers({
    //     ...allWorkers,
    //     privateSector: allWorkers.privateSector,
    //     metalsWorkers: lastSafeValue, // ✨ ✅
    //   });

    //   return false;
    // }

    setGatherRate(gatherRate + differenceInGatherRate);
    gameVars.setMetalsGathRate(gatherRate + differenceInGatherRate); // ✨ ✅
    gameVars.setAllWorkers({
      ...allWorkers,
      privateSector: newPrivateSector,
      metalsWorkers: newValue, // ✨ ✅
    });

    // Update the slider value
    setSliderValue(newValue);
    // setLastSafeValue(newValue);
  };

  const quarryLevel = gameVars.quarryLevels.metals as Level; // ✨ ✅

  const maxAvailWorkers = useMemo(
    () =>
      Math.min(
        allWorkers.privateSector + allWorkers.metalsWorkers, // ✨ ✅
        metalsQuarryConstants.maxWorkers[ // ✨ ✅
          gameVars.quarryLevels.metals as Level // ✨ ✅
        ]
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [quarryLevel]
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
          image={images.gameIcons.metalsGameIcon} // ✨ ✅
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
            value={Math.floor(allWorkers.privateSector)}
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
            max={Math.floor(maxAvailWorkers)}
            initValue={Math.floor(allWorkers.metalsWorkers)} // ✨ ✅
            onChange={handleSliderChange}
            size={deviceSize}
            // lastSafeValue={lastSafeValue}
          />
          <LabelWithIcon
            image={images.workers.metalsWorker} // ✨ ✅
            labelImages={images.labels}
            labelType="rusty"
            size={deviceSize}
            value={Math.floor(allWorkers.metalsWorkers)} // ✨ ✅
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

export default MetalsQuarrySliderSection;
