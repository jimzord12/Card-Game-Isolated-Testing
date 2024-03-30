import { GameIconsImageGroup } from "../../types";

export const faceFinder = (
  popGrowthRate: number
): keyof Partial<GameIconsImageGroup> => {
  if (popGrowthRate < 0) return "angryFaceGameIcon";
  if (popGrowthRate >= 0 && popGrowthRate < 1) return "sadFaceGameIcon";
  if (popGrowthRate >= 1 && popGrowthRate < 1.49) return "neutralFaceGameIcon";
  if (popGrowthRate >= 1.5 && popGrowthRate < 2.99) return "happyFaceGameIcon";
  if (popGrowthRate >= 3) return "overjoyedFaceGameIcon";
  console.error(
    "⛔ CircularGoldenLabel: popGrowthRate is invalid!",
    popGrowthRate
  );
  return "calendarGameIcon";
};
