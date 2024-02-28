import { useState } from "react";
import TownHallConcreteQuarry from "./TownHallQuarrySections/TownHallConcreteQuarry";
import TownHallMetalsQuarry from "./TownHallQuarrySections/TownHallMetalsQuarry";
import TownHallCrystalsQuarry from "./TownHallQuarrySections/TownHallCrystalsQuarry";
import TownHallOilRigQuarry from "./TownHallQuarrySections/TownHallOilRigQuarry";
import QuarrySelector from "./TownHallQuarrySections/Parts/QuarrySelector/QuarrySelector";

const TownHallManageScreen = () => {
  const [selectedQuarry, setSelectedQuarry] = useState<QuarryType | null>(null);
  enum QuarryType {
    Concrete = "concrete",
    Crystals = "crystals",
    Metals = "metals",
    Diesel = "diesel",
  }

  const handleGoBack = () => {
    setSelectedQuarry(null);
  };

  if (selectedQuarry === null) {
    return (
      <div className="flex gap-4 tablet:gap-4 largeScreen:gap-14 justify-center items-center h-full">
        <QuarrySelector
          type="concrete"
          onClick={() => {
            setSelectedQuarry(QuarryType.Concrete);
          }}
        />
        <QuarrySelector
          type="metals"
          onClick={() => {
            setSelectedQuarry(QuarryType.Metals);
          }}
        />
        <QuarrySelector
          type="crystals"
          onClick={() => {
            setSelectedQuarry(QuarryType.Crystals);
          }}
        />
        <QuarrySelector
          type="diesel"
          onClick={() => {
            setSelectedQuarry(QuarryType.Diesel);
          }}
        />
      </div>
    );
  } else if (selectedQuarry === QuarryType.Concrete) {
    return <TownHallConcreteQuarry handleGoBack={handleGoBack} />;
  } else if (selectedQuarry === QuarryType.Metals) {
    return <TownHallMetalsQuarry handleGoBack={handleGoBack} />;
  } else if (selectedQuarry === QuarryType.Crystals) {
    return <TownHallCrystalsQuarry handleGoBack={handleGoBack} />;
  } else if (selectedQuarry === QuarryType.Diesel) {
    return <TownHallOilRigQuarry handleGoBack={handleGoBack} />;
  } else {
    return (
      <div className="flex justify-center items-center">
        <h2 className="text-white text-4xl">ERROR - ERROR</h2>
      </div>
    );
  }
};

export default TownHallManageScreen;
