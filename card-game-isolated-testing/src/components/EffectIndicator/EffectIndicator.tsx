import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// import { usePlayerContext } from "../../context/playerContext/PlayerContext";

import "react-tooltip/dist/react-tooltip.css";
import "./EffectIndicator.styles.css";
import { effectClass } from "../../classes";
import { gameConfig } from "../../constants/game";
import EffectClass from "../../classes/effectClass";
import { EffectOutput } from "../../types";
import { templateIdToTemplateDataSP } from "../../constants/templates";
import { useGameVarsStore } from "../../stores/gameVars";
import { updateCardData } from "../../../api/apiFns";
import { useToastError } from "../../hooks/notifications";

// Helper functions
function roundToDecimal(number: number, decimalPlaces: number) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
}

function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() returns 0-based index
  const year = date.getFullYear();
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function tooltipTextMaker(effect: EffectClass) {
  const expirationDate = formatDate(effect.expiresAtUnix);
  let text =
    "Expires: at: " +
    expirationDate +
    " <br/> - Boosted Gathering Rates - <br/>"; // I assgined a empty string, for VS Code intellisence 😎
  for (const multiplier in effect.output) {
    let type = "";
    // const rate = "";

    if (multiplier.startsWith("gold")) {
      type = "Gold";
      //   rate = "goldGathRate";
    }
    if (multiplier.startsWith("pop")) {
      type = "Population";
      //   rate = "popGrowthRate";
    }
    if (multiplier.startsWith("concrete")) {
      type = "Concrete";
      //   rate = "concreteGathRate";
    }
    if (multiplier.startsWith("metals")) {
      type = "Metals";
      //   rate = "metalsGathRate";
    }
    if (multiplier.startsWith("crystals")) {
      type = "Crystals";
      //   rate = "crystalsGathRate";
    }
    if (multiplier.startsWith("diesel")) {
      type = "Diesel";
      //   rate = "dieselGathRate";
    }
    text = text.concat(
      type,
      ": ",
      //   `${ratesObj[rate]}`,
      ` (+${roundToDecimal(
        (effect.output[multiplier as keyof EffectOutput] - 1) * 100,
        2
      )}%)`,
      "<br />"
    );
  }

  return text;
}

interface EffectIndicatorProps {
  activeEffect: effectClass | null;
}
const EffectIndicator = ({ activeEffect }: EffectIndicatorProps) => {
  const calculateElapsedPercentage = () => {
    if (activeEffect === null || activeEffect === undefined) return null;
    // console.log("calculateElapsedPercentage - activeEffect: ", activeEffect);
    // console.log(
    //   "calculateElapsedPercentage - expiresAtUnix: ",
    //   activeEffect.expiresAtUnix
    // );
    // console.log("calculateElapsedPercentage - Date.now()   : ", Date.now());
    // console.log(
    //   "elapsedTimeInMilliseconds: ",
    //   Date.now() - activeEffect.expiresAtUnix
    // );

    const elapsedTimeInMilliseconds = Date.now() - activeEffect.expiresAtUnix;
    const elapsedPercentage =
      (elapsedTimeInMilliseconds / gameConfig.effectDuration) * 100;
    // console.log(
    //   "elapsedTimeInMilliseconds: ",
    //   roundToDecimal(elapsedPercentage, 5) * -1
    // );
    return roundToDecimal(elapsedPercentage, 2) * -1;
  };

  const [rerender, setRerender] = useState(false);
  const [progress, setProgress] = useState(calculateElapsedPercentage() ?? 0);
  const [initComplete, setInitComplete] = useState(false);
  const [isEffectActive, setIsEffectActive] = useState(
    calculateElapsedPercentage() ?? 0 > 0
  );
  const setActiveEffect = useGameVarsStore((state) => state.setActiveEffect);
  const { showError } = useToastError();

  useEffect(() => {
    if (activeEffect === null || activeEffect === undefined) return;

    const interval = setInterval(() => {
      setProgress(calculateElapsedPercentage() ?? 0);
      setRerender((prev) => !prev);
    }, 1000);

    setInitComplete(true);

    if (progress < 0 && initComplete) {
      setIsEffectActive(false);
      handleEffectExpiration();
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [progress, rerender]);

  const handleEffectExpiration = () => {
    if (activeEffect === null)
      throw new Error(
        "⛔ - EffectIndicator.tsx:handleEffectExpiration: Active Effect is null!"
      );

    if (activeEffect.originatesFrom.id === null)
      throw new Error(
        "⛔ - EffectIndicator.tsx:handleEffectExpiration: SPCard's ID is null!"
      );

    showError("Effect Expired!", "The Special Effect has expired.");
    // // 🔷 1. Update the DB
    updateCardData({
      id: activeEffect.originatesFrom.id,
      state: 0,
      disabled: true,
    });

    // // 🔷 2. Update Client State - Zustang
    setActiveEffect(null);

    // // 🔷 3. Disable SPCard
    activeEffect.originatesFrom.disable();
  };

  const strokeDashoffset = 440 * (roundToDecimal(progress, 2) / 100);
  function colorPicker() {
    return progress > 60 ? "green" : progress < 60 ? "orange" : "red";
  }

  return (
    <>
      {activeEffect !== null && activeEffect !== undefined && initComplete && (
        <>
          <div
            className="duration-effect"
            data-tooltip-html={tooltipTextMaker(activeEffect)}
            data-tooltip-id="my-tooltip"
          >
            {isEffectActive && (
              <>
                <img
                  src={
                    templateIdToTemplateDataSP[
                      activeEffect.originatesFrom.templateId
                    ].image
                  }
                  alt="Workaholism"
                  className="background-image"
                />
                <svg className="progress-ring" viewBox="0 0 140 140">
                  <circle
                    className="progress-ring__circle"
                    stroke={colorPicker()}
                    strokeWidth="8"
                    fill="transparent"
                    r="66"
                    cx="70"
                    cy="70"
                    strokeDasharray="440"
                    strokeDashoffset={strokeDashoffset}
                  />
                </svg>
                <div className="glass-circle">
                  {roundToDecimal(progress, 2)}%
                </div>
              </>
            )}
          </div>
          <Tooltip id="my-tooltip" place="bottom" openOnClick />
        </>
      )}
    </>
  );
};

export default EffectIndicator;
