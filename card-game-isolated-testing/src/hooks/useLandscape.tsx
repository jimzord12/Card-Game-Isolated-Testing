import { useEffect, useState } from "react";

const UseLandscape = () => {
  // State to keep track of whether the device is in portrait mode
  const [isPortrait, setIsPortrait] = useState<boolean>(
    window.matchMedia("(orientation: portrait)").matches
  );

  // Effect to add event listeners for orientation changes
  useEffect(() => {
    const checkOrientation = () => {
      // Check the current orientation and update state accordingly
      const isPortraitNow = window.matchMedia(
        "(orientation: portrait)"
      ).matches;
      setIsPortrait(isPortraitNow);
    };

    // Add event listener for orientation changes
    window.addEventListener("resize", checkOrientation);
    // Call the function to set the initial state
    checkOrientation();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);
  return isPortrait;
};

export default UseLandscape;
