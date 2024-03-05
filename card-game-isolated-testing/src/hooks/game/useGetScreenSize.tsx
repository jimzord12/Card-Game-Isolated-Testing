import { useMediaQuery } from "usehooks-ts";

type ScreenSize = "mobile" | "largeMobile" | "tablet" | "desktop";

const useGetScreenSize = (): ScreenSize => {
  const isMobile = useMediaQuery("(max-height: 735px)");
  const isLargeMobile = useMediaQuery("(min-height: 410px)");
  const isTablet = useMediaQuery("(min-height: 736px)");
  const isLargeScreen = useMediaQuery("(min-height: 1023px)");

  console.log("isMobile", isMobile);
  console.log("isLargeMobile", isLargeMobile);
  console.log("isTablet", isTablet);
  console.log("isLargeScreen", isLargeScreen);

  if (isMobile) return "mobile";
  else if (isLargeMobile) return "largeMobile";
  else if (isTablet) return "tablet";
  else if (isLargeScreen) return "desktop";
  else {
    console.error("⛔ useGetScreenSize.tsx: Problem with useMediaQuery Hook!");
    return "mobile";
  }
};

export default useGetScreenSize;
