import CustomSlider from "../../../CustomSlider/CustomSlider";
import { useGameVarsStore } from "../../../../stores/gameVars";
import LabelWithIcon from "../../../Labels/LabelWithIcon/LabelWithIcon";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { useState } from "react";

const HospitalLayoutManage = () => {
  const allWorkers = useGameVarsStore((state) => state.allWorkers);
  const setAllWorkers = useGameVarsStore((state) => state.setAllWorkers);
  const popGrowthRate = useGameVarsStore((state) => state.popGrowthRate);

  const { images } = UseGlobalContext();

  if (images?.maps === undefined || images?.onMapAssets === undefined)
    throw new Error("⛔ HopsitalLayoutManage.tsx: images are undefined!");

  // The conversion rate from citizens to doctors.
  const citizenToDocsConvertionRate = 4;
  let localPopGrowthRate = popGrowthRate;

  //   const totalWorkers = allWorkers.privateSector + allWorkers.hospitalWorkers;

  // The maximum number of doctors based on the available citizens.
  const maxDoctors = Math.floor(
    allWorkers.privateSector / citizenToDocsConvertionRate
  );

  const [sliderValue, setSliderValue] = useState(allWorkers.hospitalWorkers);

  const handleSliderChange = (newValue: number) => {
    // Calculate the difference in the number of doctors.
    const differenceInDoctors = newValue - sliderValue;
    // Calculate the equivalent number of citizens based on the difference in doctors.
    const differenceInCitizens =
      differenceInDoctors * citizenToDocsConvertionRate;
    // Update the state
    setAllWorkers({
      ...allWorkers,
      hospitalWorkers: newValue,
      privateSector: allWorkers.privateSector - differenceInCitizens,
    });

    localPopGrowthRate += newValue * 0.1;
    // Update the slider value
    setSliderValue(newValue);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full ">
      <h1 className="text-white text-4xl font-extrabold">
        This is the Hopsital Manage Screen/Layout
      </h1>
      <div className="h-8" />
      <div className="flex flex-col items-center p-16 pb-24 bg-emerald-700/[.55] rounded-xl">
        <LabelWithIcon
          image={images.gameIcons.growthGameIcon}
          labelImages={images.labels}
          labelType="special"
          size="small"
          value={localPopGrowthRate}
          valueType={{
            type: "/h",
          }}
          position="top"
          desc={{
            text: "Growth Rate",
            style: "white",
          }}
        />
        <div className="flex items-center">
          <LabelWithIcon
            image={images.workers.simpleCitizenWorker}
            labelImages={images.labels}
            labelType="special"
            size="small"
            value={allWorkers.privateSector}
            position="top"
            desc={{
              text: "Available Citizens",
              style: "white",
            }}
          />
          <CustomSlider
            max={maxDoctors}
            initValue={allWorkers.hospitalWorkers}
            onChange={handleSliderChange}
          />
          <LabelWithIcon
            image={images.workers.doctorWorker}
            labelImages={images.labels}
            labelType="special"
            size="small"
            value={allWorkers.hospitalWorkers}
            valueType={{
              type: "maxLimit",
              limit: maxDoctors,
            }}
            position="top"
            desc={{
              text: "Doctors",
              style: "white",
            }}
          />
        </div>
      </div>
      <div className="h-16" />
    </div>
  );
};

export default HospitalLayoutManage;
