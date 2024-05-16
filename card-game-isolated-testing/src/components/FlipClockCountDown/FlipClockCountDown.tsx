import { useState, useEffect } from "react";
import "./FlipClockCountDown.styles.css"; // Assuming you have your styles in a separate CSS file

interface TimeRemainingProps {
  targetDate: Date;
  textColor?: string;
}

interface TimeRemainingState {
  complete: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getTimeRemaining = (targetDateTime: number): TimeRemainingState => {
  const nowTime = Date.now();
  const complete = nowTime >= targetDateTime;

  if (complete) {
    return {
      complete,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const secondsRemaining = Math.floor((targetDateTime - nowTime) / 1000);
  const days = Math.floor(secondsRemaining / 86400); // 86400 seconds in a day
  const hours = Math.floor((secondsRemaining % 86400) / 3600); // 3600 seconds in an hour
  const minutes = Math.floor((secondsRemaining % 3600) / 60); // 60 seconds in a minute
  const seconds = secondsRemaining % 60;

  const result = {
    complete,
    days,
    hours,
    minutes,
    seconds,
  };

  //   console.log("⏰ getTimeRemaining: ", result);

  return result;
};

const FlipClockCountDown = ({
  targetDate,
  textColor = "black",
}: TimeRemainingProps) => {
  const [isFirstRender, setIsFirstRender] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemainingState>(
    getTimeRemaining(targetDate.getTime())
  );

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      const timeBits = getTimeRemaining(targetDate.getTime());
      setTimeRemaining(timeBits);

      if (timeBits.complete) {
        clearInterval(countdownTimer);
      }
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, [targetDate]);

  const getTimeSegmentElements = (segmentElement: HTMLElement) => {
    const segmentDisplay = segmentElement.querySelector(
      ".segment-display"
    ) as HTMLElement;
    if (!segmentDisplay) {
      console.log("⛔ getTimeSegmentElements: Segment display not found");
      return null;
    }

    const segmentDisplayTop = segmentDisplay.querySelector(
      ".segment-display__top"
    ) as HTMLElement;
    const segmentDisplayBottom = segmentDisplay.querySelector(
      ".segment-display__bottom"
    ) as HTMLElement;

    const segmentOverlay = segmentDisplay.querySelector(
      ".segment-overlay"
    ) as HTMLElement;
    if (!segmentOverlay) {
      console.log("⛔ getTimeSegmentElements: Segment overlay not found");
      return null;
    }
    const segmentOverlayTop = segmentOverlay.querySelector(
      ".segment-overlay__top"
    ) as HTMLElement;
    const segmentOverlayBottom = segmentOverlay.querySelector(
      ".segment-overlay__bottom"
    ) as HTMLElement;

    return {
      segmentDisplayTop,
      segmentDisplayBottom,
      segmentOverlay,
      segmentOverlayTop,
      segmentOverlayBottom,
    };
  };

  const updateSegmentValues = (
    displayElement: HTMLElement,
    overlayElement: HTMLElement,
    value: string | number
  ) => {
    displayElement.textContent = String(value);
    overlayElement.textContent = String(value);
  };

  const updateTimeSegment = (
    segmentElement: HTMLElement,
    timeValue: number
  ) => {
    const segmentElements = getTimeSegmentElements(segmentElement);
    if (!segmentElements) return;

    // console.log(
    //   "⭐ updateTimeSegment: ",
    //   timeValue,
    //   segmentElements.segmentDisplayTop.textContent
    // );

    // if

    if (
      parseInt(segmentElements.segmentDisplayTop.textContent || "0") ===
        timeValue &&
      isFirstRender
    ) {
      return;
    }

    segmentElements.segmentOverlay.classList.add("flip");

    updateSegmentValues(
      segmentElements.segmentDisplayTop,
      segmentElements.segmentOverlayBottom,
      timeValue
    );

    const finishAnimation = () => {
      segmentElements.segmentOverlay.classList.remove("flip");
      updateSegmentValues(
        segmentElements.segmentDisplayBottom,
        segmentElements.segmentOverlayTop,
        timeValue
      );
      segmentElements.segmentOverlay.removeEventListener(
        "animationend",
        finishAnimation
      );
    };

    segmentElements.segmentOverlay.addEventListener(
      "animationend",
      finishAnimation
    );
  };

  const updateTimeSection = (sectionID: string, timeValue: number) => {
    const sectionElement = document.getElementById(sectionID) as HTMLElement;
    const timeSegments = sectionElement.querySelectorAll(
      ".time-segment"
    ) as NodeListOf<HTMLElement>;

    const paddedValue = String(timeValue).padStart(2, "0");
    // console.log("🕒 updateTimeSection: ", sectionID, timeValue);
    updateTimeSegment(timeSegments[0], parseInt(paddedValue[0]));
    updateTimeSegment(timeSegments[1], parseInt(paddedValue[1]));
  };

  useEffect(() => {
    updateAllSegments();
    if (!isFirstRender) setIsFirstRender(true);
  }, [timeRemaining]);

  const updateAllSegments = () => {
    updateTimeSection("days", timeRemaining.days);
    updateTimeSection("hours", timeRemaining.hours);
    updateTimeSection("minutes", timeRemaining.minutes);
    updateTimeSection("seconds", timeRemaining.seconds);
  };

  return (
    <div className="countdown">
      <div className="time-section" id="days">
        <div className="time-group">
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top"></div>
              <div className="segment-display__bottom"></div>
              <div className="segment-overlay">
                <div className="segment-overlay__top"></div>
                <div className="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top"></div>
              <div className="segment-display__bottom"></div>
              <div className="segment-overlay">
                <div className="segment-overlay__top"></div>
                <div className="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
        </div>
        <p style={{ color: textColor }}>Days</p>
      </div>

      <div className="time-section" id="hours">
        <div className="time-group">
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top"></div>
              <div className="segment-display__bottom"></div>
              <div className="segment-overlay">
                <div className="segment-overlay__top"></div>
                <div className="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top"></div>
              <div className="segment-display__bottom"></div>
              <div className="segment-overlay">
                <div className="segment-overlay__top"></div>
                <div className="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
        </div>
        <p style={{ color: textColor }}>Hours</p>
      </div>

      <div className="time-section" id="minutes">
        <div className="time-group">
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top"></div>
              <div className="segment-display__bottom"></div>
              <div className="segment-overlay">
                <div className="segment-overlay__top"></div>
                <div className="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top"></div>
              <div className="segment-display__bottom"></div>
              <div className="segment-overlay">
                <div className="segment-overlay__top"></div>
                <div className="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
        </div>
        <p style={{ color: textColor }}>Minutes</p>
      </div>

      <div className="time-section" id="seconds">
        <div className="time-group">
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top"></div>
              <div className="segment-display__bottom"></div>
              <div className="segment-overlay">
                <div className="segment-overlay__top"></div>
                <div className="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
          <div className="time-segment">
            <div className="segment-display">
              <div className="segment-display__top"></div>
              <div className="segment-display__bottom"></div>
              <div className="segment-overlay">
                <div className="segment-overlay__top"></div>
                <div className="segment-overlay__bottom"></div>
              </div>
            </div>
          </div>
        </div>
        <p style={{ color: textColor }}>Seconds</p>
      </div>
    </div>
  );
};

export default FlipClockCountDown;
