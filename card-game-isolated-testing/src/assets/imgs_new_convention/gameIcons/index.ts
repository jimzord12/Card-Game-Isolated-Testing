// -> Details
// Card_Info
import CalenderIcon from "./gameIcons-calendarGameIcon.webp";
import IdIcon from "./gameIcons-idGameIcon.webp";
import UserIcon from "./gameIcons-userGameIcon.webp";

// Economy
import ExpensesIcon from "./gameIcons-expensesGameIcon.webp";
import IncomeIcon from "./gameIcons-incomeGameIcon.webp";
import TotalGold from "./gameIcons-totalGoldGameIcon.webp";

// Green_Energy
import BatteryIcon from "./gameIcons-batteryGameIcon.webp";
import GreenEnergyProdIcon from "./gameIcons-energyProductionGameIcon.webp";
import GreenEnergyUtilizationIcon from "./gameIcons-energyUtilizationGameIcon.webp";

// Growth
import GrowthIcon from "./gameIcons-growthGameIcon.webp";

// Happiness
import AngryIcon from "./gameIcons-angryFaceGameIcon.webp";
import HappyIcon from "./gameIcons-happyFaceGameIcon.webp";
import NeutralIcon from "./gameIcons-neutralFaceGameIcon.webp";
import OverjoyedIcon from "./gameIcons-overjoyedFaceGameIcon.webp";
import SadIcon from "./gameIcons-sadFaceGameIcon.webp";

// Score
import RankIcon from "./gameIcons-rankGameIcon.webp";
//TODO: ADD -> Clean Env Meter!

// Spacing
import BuildingsSpaceIcon from "./gameIcons-buildingsSpaceGameIcon.webp";
import CitizensSpaceIcon from "./gameIcons-citizensSpaceGameIcon.webp";
import RegsSpaceIcon from "./gameIcons-regSpaceGameIcon.webp";
//////////////////////////////////////////////////////////////////////////

// -> Resources
// Circular
import CitizenCircularIcon from "./gameIcons-citizenCircularGameIcon.webp";
import ConcreteCircularIcon from "./gameIcons-concreteCircularGameIcon.webp";
import CrystalsCircularIcon from "./gameIcons-crystalsCircularGameIcon.webp";
import DieselBarrelCircularIcon from "./gameIcons-dieselBarrelCircularGameIcon.webp";
import GoldCircularIcon from "./gameIcons-goldCircularGameIcon.webp";
import MetalsCircularIcon from "./gameIcons-metalsCircularGameIcon.webp";

// Default
import ConcreteIcon from "./gameIcons-concreteGameIcon.webp";
import CrystalsIcon from "./gameIcons-crystalsGameIcon.webp";
import DieselBarrelIcon from "./gameIcons-dieselBarrelGameIcon.webp";
import GoldIcon from "./gameIcons-goldGameIcon.webp";
import MetalsIcon from "./gameIcons-metalsGameIcon.webp";
///////////////////////////////////////////////////////////////////////////

// -> Utility
// Arrows
import BlueLevelUpArrow from "./gameIcons-blueLevelUpArrowGameIcon.webp";
import GreenArrowUpgrade from "./gameIcons-greenArrowUpgradeGameIcon.webp";
import GreenWavyArrow from "./gameIcons-greenWavyArrowGameIcon.webp";
import BlueSideBarArrow from "./gameIcons-sideBarArrowGameIcon.webp";

// Card_Actions
import ActivateGradient3D from "./gameIcons-activateGradientGameIcon.webp";
import LevelUpGradient3D from "./gameIcons-levelUpGradientGameIcon.webp";
import SellGradient3D from "./gameIcons-sellGradientGameIcon.webp";

// Custom_Slider
import SliderBar from "./gameIcons-sliderBarGameIcon.webp";
import SliderDot from "./gameIcons-sliderDotGameIcon.webp";

// other
import CraftBtn from "./gameIcons-craftButtonGameIcon.webp";
import ModalCloseWoodenSign from "./gameIcons-woodenCloseModalGameIcon.webp";

const arrows = {
  levelUpArrow: BlueLevelUpArrow,
  greenArrowUpgrade: GreenArrowUpgrade,
  wavyArrow: GreenWavyArrow,
  sidebarArrow: BlueSideBarArrow,
};
const cardActions = {
  activate: ActivateGradient3D,
  levelup: LevelUpGradient3D,
  sell: SellGradient3D,
};
const customSlider = {
  bar: SliderBar,
  dot: SliderDot,
};
const other = {
  craftBtn: CraftBtn,
  modalClose: ModalCloseWoodenSign,
};

const resourcesCircularIcons = {
  citizenCircular: CitizenCircularIcon,
  goldCircular: GoldCircularIcon,
  concreteCircular: ConcreteCircularIcon,
  crystalsCircular: CrystalsCircularIcon,
  metalsCircular: MetalsCircularIcon,
  dieselbarrelCircular: DieselBarrelCircularIcon,
};

const resourcesDefaultIcons = {
  goldResourceIcon: GoldIcon,
  concreteResourceIcon: ConcreteIcon,
  crystalsResourceIcon: CrystalsIcon,
  metalsResourceIcon: MetalsIcon,
  dieselbarrelResourceIcon: DieselBarrelIcon,
};

// Circular

const cardInfo = {
  calendar: CalenderIcon,
  id: IdIcon,
  user: UserIcon,
};
const economy = {
  expenses: ExpensesIcon,
  totalGold: TotalGold,
  income: IncomeIcon,
};
const greenEnergy = {
  battery: BatteryIcon,
  production: GreenEnergyProdIcon,
  utilization: GreenEnergyUtilizationIcon,
};
const growth = {
  icon: GrowthIcon,
};
const happiness = {
  angry: AngryIcon,
  happy: HappyIcon,
  neutral: NeutralIcon,
  overjoyed: OverjoyedIcon,
  sad: SadIcon,
};
const score = {
  rank: RankIcon,
};

const spacing = {
  buildingsSpace: BuildingsSpaceIcon,
  regsSpace: RegsSpaceIcon,
  citizensSpace: CitizensSpaceIcon,
};

export const detailsIcons = {
  ...cardInfo,
  ...economy,
  ...greenEnergy,
  ...growth,
  ...happiness,
  ...score,
  ...spacing,
};
export const resourcesIcons = {
  ...resourcesCircularIcons,
  ...resourcesDefaultIcons,
};
export const utilityIcons = {
  ...arrows,
  ...cardActions,
  ...customSlider,
  ...other,
};
export default {
  detailsIcons,
  resourcesIcons,
  utilityIcons,
};
