import React, { useState } from "react";
import GameButton from "../../../Buttons/GameButton/GameButton";
import { QuarryType } from "../../../../types";
import ConcreteQuarrySliderSection from "../../QuarriesLayout/QuarrySliderSections/ConcreteQuarrySliderSection";

const TownHallManageScreen = () => {
  const [selectedQuarry, setSelectedQuarry] = useState<QuarryType | null>(null);

  if (selectedQuarry === null) {
    return (
      <div className="z-[401] absolute top-[336px] left-20">
        <GameButton
          onClick={() => {
            setSelectedQuarry("concrete");
          }}
          text="Concrete Quarry"
          btnType="primary"
        />
      </div>
    );
  } else if (selectedQuarry === "concrete") {
    return (
      <div className="flex">
        <div className="w-[400px] h-[400px] bg-slate-500" />
        <ConcreteQuarrySliderSection />
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center">
        <h2 className="text-white text-4xl">AAAAAAAAAAAAAAAAAAAAA</h2>
      </div>
    );
  }
  return <div></div>;
};

export default TownHallManageScreen;
