import { useEffect, useState } from "react";

const useViewportWidthGreaterThan320 = () => {
  const [isGreaterThan320, setIsGreaterThan320] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 320px)");
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsGreaterThan320(e.matches);
    };

    // Set initial value
    setIsGreaterThan320(mediaQuery.matches);

    // Add listener
    mediaQuery.addListener(handleMediaQueryChange);

    // Clean up listener on component unmount
    return () => mediaQuery.removeListener(handleMediaQueryChange);
  }, []);

  return isGreaterThan320;
};

export default useViewportWidthGreaterThan320;
