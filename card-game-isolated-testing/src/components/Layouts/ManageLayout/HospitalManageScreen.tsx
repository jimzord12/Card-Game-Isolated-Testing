import { useRef, useState } from "react";
import BuildingCard from "../../../classes/buildingClass_V2";
import { hospitalConstants } from "../../../constants/game/buildingsConfig";
import { UseGlobalContext } from "../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../hooks/game/useGetLabelsSize";
import { useGameVarsStore } from "../../../stores/gameVars";
import {
  round2Decimal,
  round4Decimal,
} from "../../../utils/game/roundToDecimal";
import CustomSlider from "../../CustomSlider/CustomSlider";
import LabelWithIcon from "../../Labels/LabelWithIcon/LabelWithIcon";
import { useToastError } from "../../../hooks/notifications";
import { calcPopGrowthRate } from "../../../hooks/game/gameLoop/calculators/gathRatesCalculators";

interface Props {
  card: BuildingCard;
}

const HospitalManageScreen = ({ card }: Props) => {
  const allWorkers = useGameVarsStore((state) => state.allWorkers);
  const gameVars = useGameVarsStore();
  const { showError } = useToastError();

  const setAllWorkers = useGameVarsStore((state) => state.setAllWorkers);
  const setHospitalWorkers = useGameVarsStore(
    (state) => state.setHospitalWorkers
  );
  // const setPopGrowthRate = useGameVarsStore((state) => state.setPopGrowthRate);

  const setHappinessFromBuildings = useGameVarsStore(
    (state) => state.setHappinessFromBuildings
  );
  const happinessFromBuildings = useGameVarsStore(
    (state) => state.happinessFromBuildings
  );
  const popGrowthRate = useGameVarsStore((state) => state.popGrowthRate);

  const deviceSize = useGetLabelsSize();

  const { images } = UseGlobalContext();

  const currentPopGrowth = round2Decimal(
    calcPopGrowthRate(
      gameVars.player?.population ?? 0,
      gameVars.happinessFromBuildings,
      gameVars.factoryUnhappiness
    )
  );

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

  const [lastSafeValue, setLastSafeValue] = useState(
    gameVars.allWorkers.hospitalWorkers
  );

  const handleSliderChange = (newValue: number) => {
    // Calculate the difference in the number of doctors.
    const differenceInDoctors = newValue - sliderValue;
    // Calculate the equivalent number of citizens based on the difference in doctors.
    const differenceInCitizens =
      differenceInDoctors * hospitalConstants.doctorsToCitizensRatio;

    const differenceInHappiness = differenceInDoctors * card.output.boost;

    const newPrivateSector = allWorkers.privateSector - differenceInCitizens;

    const newGoldIncome =
      newPrivateSector * gameVars.multipliers.goldMultiplier;
    const currentExpences = gameVars.expences;

    if (currentExpences > newGoldIncome) {
      showError(
        "You cannot afford more Doctors",
        "Descrease your Expenses or Increase your Gold Income!"
      );

      gameVars.setHospitalWorkers(lastSafeValue, true);
      gameVars.setPopGrowthRate(
        calcPopGrowthRate(
          gameVars.player?.population ?? 0,
          happinessFromBuildings + lastSafeValue * card.output.boost,
          gameVars.factoryUnhappiness
        )
      );
      gameVars.setAllWorkers({
        ...allWorkers,
        privateSector: allWorkers.privateSector,
        hospitalWorkers: lastSafeValue, // ✨ ✅
      });

      return false;
    }

    // Update the state
    setAllWorkers({
      ...allWorkers,
      privateSector: newPrivateSector,
    });

    setHospitalWorkers(newValue, true);

    setHappinessFromHospital(
      round4Decimal(happinessFromHospital + differenceInHappiness)
    );

    const newHappinessFromBuildings =
      happinessFromBuildings + differenceInHappiness;

    gameVars.setPopGrowthRate(
      calcPopGrowthRate(
        gameVars.player?.population ?? 0,
        newHappinessFromBuildings,
        gameVars.factoryUnhappiness
      )
    );
    // setPopGrowthRate(
    //   round4Decimal(happinessFromHospital + differenceInHappiness)
    // );
    setHappinessFromBuildings(round4Decimal(newHappinessFromBuildings));

    card.doctors = newValue; // IMPORTANT: For when deactivating the card.

    // Update the slider value
    setSliderValue(newValue);
    setLastSafeValue(newValue);
  };

  const maxAvailDoctors = Math.min(
    maxDoctors.current,
    hospitalConstants.maxDoctors[card.level]
  );

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
    <div className="flex flex-col justify-center items-center w-full h-full ">
      {/* <h1 className="text-white text-4xl font-extrabold">
        This is the Hopsital Manage Screen/Layout
      </h1> */}
      <div className="flex flex-col items-center p-16 pb-24 bg-emerald-700/[.55] rounded-xl">
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
            max={Math.ceil(maxAvailDoctors)}
            initValue={Math.ceil(allWorkers.hospitalWorkers)}
            onChange={handleSliderChange}
            size={deviceSize}
            lastSafeValue={lastSafeValue}
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
