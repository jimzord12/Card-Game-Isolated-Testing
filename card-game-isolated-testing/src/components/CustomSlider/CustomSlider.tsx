import { useState, useRef, useCallback } from "react";
import { isMouseEvent } from "../../types/TypeGuardFns/isMouseEvent";
import sliderBarImage from "../../assets/imgs_new_convention/gameIcons/gameIcons-sliderBarGameIcon.webp";
import sliderThumbImage from "../../assets/imgs_new_convention/gameIcons/gameIcons-sliderDotGameIcon.webp";
import { sliderSizes } from "./sliderConstants";
import React from "react";

type Size = "small" | "medium" | "large";

interface CustomSliderProps {
  step?: number;
  max: number;
  size?: Size;
  initValue?: number;
  onChange: (newValue: number) => void;
  // changeInitValue?: () => number;
}

// For ChatGPT Reference
// export const sliderSizes = {
//     sliderBar: {
//       small: { width: 300, height: 36 },
//       medium: { width: 420, height: 51 },
//       large: { width: 917, height: 111 },
//     },
//     sliderThumb: {
//       small: { width: 30, height: 30 },
//       medium: { width: 48, height: 48 },
//       large: { width: 90, height: 90 },
//     },
//   };

const CustomSlider = ({
  step = 1,
  max,
  size = "medium",
  initValue,
  onChange,
}: CustomSliderProps) => {
  const sliderRef = useRef<HTMLImageElement>(null);

  const sliderBarSize = sliderSizes.sliderBar[size];
  const sliderThumpSize = sliderSizes.sliderThumb[size];
  const halfThumbWidth = sliderThumpSize.width / 2;
  const usableWidth = sliderBarSize.width * 0.845;

  const [value, setValue] = useState(
    // changeInitValue !== undefined ? changeInitValue!() : 1
    initValue !== undefined ? initValue : 1
  );
  // const [internalInitState, setinternalInitState] = useState(second)

  // useEffect(() => {
  //   console.log(initValue, "Initial");
  //   // console.log(currentValue, "CurrentValue");
  //   console.log(value, "Value");
  //   onChange(value);
  // }, [initValue, value]);

  let currentValue = initValue || 0;

  if (step <= 0 || step > max / 2)
    throw new Error(
      "⛔ CustomSlider: Step must be greater than 0 AND less than half the max value."
    );

  // Event listeners
  const startDragging = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", stopDragging);
      document.addEventListener("touchmove", onDrag);
      document.addEventListener("touchend", stopDragging);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onDrag = (e: MouseEvent | TouchEvent) => {
    const slider = sliderRef.current;
    if (slider === null) return;
    const { left, width } = slider.getBoundingClientRect();

    const clientX = isMouseEvent(e) ? e.clientX : e.touches[0].clientX;
    const usableWidth = width * 0.965;

    const diffX = clientX - halfThumbWidth - left;

    // Calculate the usable width for the thumb's movement (95% of the total width)

    // Calculate the proportion of the usable width that has been selected
    const proportion = diffX / usableWidth;

    // Adjust proportion to account for the thumb width, relative to the usable width
    // const thumbWidthProportion = sliderThumpSize.width / usableWidth;

    // proportion = Math.max(
    //   thumbWidthProportion / 2,
    //   Math.min(proportion, 1 - thumbWidthProportion / 2)
    // );
    // console.log(thumbWidthProportion, "thumbWidthProportion");
    // console.log(proportion, "NEW proportion");

    // Calculate the raw value based on the proportion within the usable width
    const rawValue = proportion * max;

    // Adjust the value to the nearest step
    let newValue = Math.round(rawValue / step) * step;

    // Ensure newValue is within the slider's range
    newValue = Math.max(0, Math.min(newValue, max));

    currentValue = newValue;

    setValue(newValue);
  };

  const stopDragging = () => {
    console.log("TEST: Slider Value: ", currentValue);
    onChange(currentValue);

    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDragging);
    document.removeEventListener("touchmove", onDrag);
    document.removeEventListener("touchend", stopDragging);
  };

  return (
    <div about="Main Slider DIV" className="w-fit h-fit">
      <div
        ref={sliderRef}
        className="relative h-5"
        style={{
          width: `${sliderBarSize.width}px`,
          height: `${sliderBarSize.height}px`,
        }}
      >
        {/* <div className="absolute w-[700px] h-[100px] z-10"> */}
        <img
          src={sliderThumbImage}
          alt="Slider Thumb"
          //   className={`absolute w-[20px] h-[20px] bg-red-800 cursor-pointer top-1 rounded-full`}
          className={`absolute w-[${sliderThumpSize.width}px] h-[${sliderThumpSize.height}px] bg-red-800 cursor-pointer  rounded-full`}
          style={{
            left: `calc(${(value / max) * usableWidth}px - ${0}px + ${
              sliderBarSize.width * 0.025
            }px)`,
          }}
          onMouseDown={startDragging}
          onTouchStart={startDragging}
          onDragStart={(e) => e.preventDefault()} // Prevent the default drag behavior
        />
        {/* </div> */}
        <img
          src={sliderBarImage}
          alt="Slider Bar"
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
};
export default CustomSlider;