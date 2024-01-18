// Modals -> Utils -> Labels

import ColorfulLabel from "./labels-colorfulLabel.webp";
import GoldenSpecialLabel from "./labels-goldenSpecialLabel.webp";
import GoldenStandardLabel from "./labels-goldenStandardLabel.webp";
import GreenEnergyLabel from "./labels-greenEnergyLabel.webp";
import LevelIndicatorLabel from "./labels-levelLabel.webp";
import QuarryLevelLabel from "./labels-quarryLevelLabel.webp";
import AmountRustyLabel from "./labels-rustyLabel.webp";
import WoodLabelType1Label from "./labels-woodenGroundLabel.webp";
import WoodLabelType2_LongLabel from "./labels-woodenLongLabel.webp";
import WoodLabelType2_NormalLabel from "./labels-woodenNormalLabel.webp";
import WoodLabelType2_ShortLabel from "./labels-woodenShortLabel.webp";

export const otherLabels = {
  rusty: AmountRustyLabel,
  colorful: ColorfulLabel,
  greenEnergy: GreenEnergyLabel,
  level: LevelIndicatorLabel,
  quarry: QuarryLevelLabel,
};
export const golden = {
  special: GoldenSpecialLabel,
  standard: GoldenStandardLabel,
};
export const wooden = {
  type1: WoodLabelType1Label,
  type2_short: WoodLabelType2_ShortLabel,
  type2_normal: WoodLabelType2_NormalLabel,
  type2_long: WoodLabelType2_LongLabel,
};

export default {
  otherLabels,
  golden,
  wooden,
};
