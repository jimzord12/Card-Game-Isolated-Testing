import { useRef, useState } from "react";
import BuildingCard from "../../../classes/buildingClass_V2";
import { hospitalConstants } from "../../../constants/game/buildingsConfig";
import { UseGlobalContext } from "../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../hooks/game/useGetLabelsSize";
import { useGameVarsStore } from "../../../stores/gameVars";
import { round4Decimal } from "../../../utils/game/roundToDecimal";
import CustomSlider from "../../CustomSlider/CustomSlider";
import LabelWithIcon from "../../Labels/LabelWithIcon/LabelWithIcon";

interface Props {
  card: BuildingCard;
}

const HospitalManageScreen = ({ card }: Props) => {
  const allWorkers = useGameVarsStore((state) => state.allWorkers);
  const setAllWorkers = useGameVarsStore((state) => state.setAllWorkers);
  const setHospitalWorkers = useGameVarsStore(
    (state) => state.setHospitalWorkers
  );
  const setPopGrowthRate = useGameVarsStore((state) => state.setPopGrowthRate);

  const setHappinessFromBuildings = useGameVarsStore(
    (state) => state.setHappinessFromBuildings
  );
  const happinessFromBuildings = useGameVarsStore(
    (state) => state.happinessFromBuildings
  );
  const popGrowthRate = useGameVarsStore((state) => state.popGrowthRate);

  const deviceSize = useGetLabelsSize();

  const { images } = UseGlobalContext();

  if (images?.maps === undefined || images?.onMapAssets === undefined)
    throw new Error("⛔ HopsitalLayoutManage.tsx: images are undefined!");

  // The conversion rate from citizens to doctors.

  //   const totalWorkers = allWorkers.privateSector + allWorkers.hospitalWorkers;

  // The maximum number of doctors based on the available citizens.
  const maxDoctors = useRef(
    Math.floor(
      allWorkers.privateSector / hospitalConstants.doctorsToCitizensRatio
    ) + allWorkers.hospitalWorkers
  );

  const [sliderValue, setSliderValue] = useState(allWorkers.hospitalWorkers);
  const [happinessFromHospital, setHappinessFromHospital] =
    useState(popGrowthRate);

  const handleSliderChange = (newValue: number) => {
    // Calculate the difference in the number of doctors.
    const differenceInDoctors = newValue - sliderValue;
    // Calculate the equivalent number of citizens based on the difference in doctors.
    const differenceInCitizens =
      differenceInDoctors * hospitalConstants.doctorsToCitizensRatio;

    const differenceInHappiness = differenceInDoctors * card.output.boost;
    // Update the state
    setAllWorkers({
      ...allWorkers,
      privateSector: allWorkers.privateSector - differenceInCitizens,
    });

    setHospitalWorkers(newValue, true);
    setHappinessFromHospital(
      round4Decimal(happinessFromHospital + differenceInHappiness)
    );
    setPopGrowthRate(
      round4Decimal(happinessFromHospital + differenceInHappiness)
    );
    setHappinessFromBuildings(
      round4Decimal(happinessFromBuildings + differenceInHappiness)
    );

    card.doctors = newValue; // IMPORTANT: For when deactivating the card.

    // Update the slider value
    setSliderValue(newValue);
  };

  const maxAvailDoctors = Math.min(
    maxDoctors.current,
    hospitalConstants.maxDoctors[card.level]
  );

  return (
    <div className="flex flex-col justify-center items-center w-full h-full ">
      {/* <h1 className="text-white text-4xl font-extrabold">
        This is the Hopsital Manage Screen/Layout
      </h1> */}
      <div className="flex flex-col items-center p-16 pb-24 bg-emerald-700/[.55] rounded-xl">
        <LabelWithIcon
          image={images.gameIcons.growthGameIcon}
          labelImages={images.labels}
          labelType="special"
          size={deviceSize}
          value={happinessFromHospital}
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
            image={images.workers.simpleCitizenWorker}
            labelImages={images.labels}
            labelType="special"
            size={deviceSize}
            value={allWorkers.privateSector}
            valueType={{
              color: "black",
            }}
            position="top"
            desc={{
              text: "Available Citizens",
              style: "white",
            }}
          />
          <CustomSlider
            max={maxAvailDoctors}
            initValue={allWorkers.hospitalWorkers}
            onChange={handleSliderChange}
            size={deviceSize}
          />
          <LabelWithIcon
            image={images.workers.doctorWorker}
            labelImages={images.labels}
            labelType="special"
            size={deviceSize}
            value={allWorkers.hospitalWorkers}
            valueType={{
              type: "maxLimit",
              limit: maxAvailDoctors,
              color: "black",
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

export default HospitalManageScreen;
