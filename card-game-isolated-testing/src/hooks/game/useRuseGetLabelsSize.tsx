import { useMediaQuery } from "usehooks-ts";
import { LabelSize } from "../../types";

const useGetLabelsSize = (): LabelSize => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  console.log("isMobile: ", isMobile);
  console.log("isTablet: ", isTablet);

  if (isMobile) return "extraSmall";
  else if (isTablet) return "small";
  else {
    console.error("⛔ useResponsive.tsx: Problem with useMediaQuery Hook!");
    return "large";
  }
};

export default useGetLabelsSize;
