import { useMediaQuery } from "usehooks-ts";

type ScreenSize = "mobile" | "largeMobile" | "tablet" | "desktop";

const useGetScreenSize = (): ScreenSize => {
  const isMobile = useMediaQuery("(min-height: 380px)");
  const isLargeMobile = useMediaQuery("(min-height: 410px)");
  const isTablet = useMediaQuery("(min-height: 736px)");
  const isLargeScreen = useMediaQuery("(min-height: 1023px)");

  // console.log("isMobile", isMobile);
  // console.log("isLargeScreen", isLargeScreen);
  // console.log("isTablet", isTablet);
  // console.log("isLargeMobile", isLargeMobile);

  if (isMobile) return "mobile";
  else if (isLargeScreen) return "desktop";
  else if (isTablet) return "tablet";
  else if (isLargeMobile) return "largeMobile";
  else {
    console.error("⛔ useGetScreenSize.tsx: Problem with useMediaQuery Hook!");
    return "mobile";
  }
};

export default useGetScreenSize;
