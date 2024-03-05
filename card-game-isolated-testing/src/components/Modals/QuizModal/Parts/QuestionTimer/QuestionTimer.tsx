import { useState, useEffect } from "react";

interface QuestionTimerProps {
  duration: number;
  height?: string;
  //   color: string;
  reset: boolean;
  start: boolean;
}

const QuestionTimer = ({
  duration,
  height = "20px",
  //   color = "#ddd",
  reset,
  start,
}: QuestionTimerProps) => {
  const [width, setWidth] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("white");

  useEffect(() => {
    if (start === false) return;
    setWidth(0); // Reset width to 0 when the key changes
    const interval = setInterval(() => {
      setWidth((oldWidth) => {
        const increment = 100 / (duration * 10);
        const nextWidth = oldWidth + increment;
        if (nextWidth < 45) {
          setBackgroundColor("limegreen");
        } else if (nextWidth >= 45) {
          setBackgroundColor("yellow");
        }
        if (nextWidth >= 75) {
          setBackgroundColor("red");
        }
        if (nextWidth >= 100) {
          clearInterval(interval);
          return 100;
        }
        return nextWidth;
      });
    }, 100); // Update width every 100ms

    return () => clearInterval(interval);
  }, [duration, reset]);

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#334155",
        borderRadius: "5px",
        // borderTop: "1px solid #ddd",
        height: height,
      }}
    >
      <div
        style={{
          width: `${width}%`,
          height: "100%",
          backgroundColor: backgroundColor,
          borderRadius: "5px",
          transitionProperty: "width, background-color",
          transitionDuration: "100ms, 1s",
        }}
      />
    </div>
  );
};

export default QuestionTimer;
