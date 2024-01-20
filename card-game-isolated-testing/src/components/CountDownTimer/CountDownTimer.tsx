import React, { useState, useEffect, SetStateAction } from "react";

const CountdownTimer = ({
  initialCount,
  setWaitingServer,
}: {
  initialCount: number;
  setWaitingServer: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    // Return early if countdown is finished
    if (count <= 0) {
      setWaitingServer(false);

      return;
    }

    // Decrease count every second
    const timerId = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    // Clear interval on component unmount
    return () => {
      clearInterval(timerId);
    };
  }, [count]);

  return (
    <div>
      <p className="text-2xl">
        Auto Retry in <span className="font-bold">{count}</span> seconds
      </p>
    </div>
  );
};

export default CountdownTimer;
