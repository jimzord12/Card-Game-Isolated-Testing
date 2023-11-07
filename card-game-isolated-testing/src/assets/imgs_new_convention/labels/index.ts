// Modals -> Utils -> Labels

import ColorfulLabel from "./labels-colorful.webp";
import GoldenSpecialLabel from "./labels-goldenSpecial.webp";
import GoldenStandardLabel from "./labels-goldenStandard.webp";
import GreenEnergyLabel from "./labels-greenEnergy.webp";
import LevelIndicatorLabel from "./labels-level.webp";
import AmountRustyLabel from "./labels-rusty.webp";
import WoodLabelType1 from "./labels-woodenGround.webp";
import WoodLabelType2_Long from "./labels-woodenLong.webp";
import WoodLabelType2_Normal from "./labels-woodenNormal.webp";
import WoodLabelType2_Short from "./labels-woodenShort.webp";

export const otherLabels = {
  rusty: AmountRustyLabel,
  colorful: ColorfulLabel,
  greenEnergy: GreenEnergyLabel,
  level: LevelIndicatorLabel,
};
export const golden = {
  special: GoldenSpecialLabel,
  standard: GoldenStandardLabel,
};
export const wooden = {
  type1: WoodLabelType1,
  type2_short: WoodLabelType2_Short,
  type2_normal: WoodLabelType2_Normal,
  type2_long: WoodLabelType2_Long,
};

export default {
  otherLabels,
  golden,
  wooden,
};
