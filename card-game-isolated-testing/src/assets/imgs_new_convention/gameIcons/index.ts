// -> Details
// Card_Info
import CalenderIcon from "./gameIcons-calendar.webp";
import IdIcon from "./gameIcons-id.webp";
import UserIcon from "./gameIcons-user.webp";

// Economy
import ExpensesIcon from "./gameIcons-expenses.webp";
import IncomeIcon from "./gameIcons-income.webp";
import TotalGold from "./gameIcons-totalGold.webp";

// Green_Energy
import BatteryIcon from "./gameIcons-battery.webp";
import GreenEnergyProdIcon from "./gameIcons-energyProduction.webp";
import GreenEnergyUtilizationIcon from "./gameIcons-energyUtilization.webp";

// Growth
import GrowthIcon from "./gameIcons-growth.webp";

// Happiness
import AngryIcon from "./gameIcons-angryFace.webp";
import HappyIcon from "./gameIcons-happyFace.webp";
import NeutralIcon from "./gameIcons-neutralFace.webp";
import OverjoyedIcon from "./gameIcons-overjoyedFace.webp";
import SadIcon from "./gameIcons-sadFace.webp";

// Score
import RankIcon from "./gameIcons-rank.webp";
//TODO: Clean Env Meter!

// Spacing
import BuildingsSpaceIcon from "./gameIcons-buildingsSpace.webp";
import CitizensSpaceIcon from "./gameIcons-citizensSpace.webp";
import RegsSpaceIcon from "./gameIcons-regSpace.webp";
//////////////////////////////////////////////////////////////////////////

// -> Resources
// Circular
import CitizenCircularIcon from "./gameIcons-citizenCircular.webp";
import ConcreteCircularIcon from "./gameIcons-concreteCircular.webp";
import CrystalsCircularIcon from "./gameIcons-crystalsCircular.webp";
import DieselBarrelCircularIcon from "./gameIcons-dieselBarrelCircular.webp";
import GoldCircularIcon from "./gameIcons-goldCircular.webp";
import MetalsCircularIcon from "./gameIcons-metalsCircular.webp";

// Default
import ConcreteIcon from "./gameIcons-concrete.webp";
import CrystalsIcon from "./gameIcons-crystals.webp";
import DieselBarrelIcon from "./gameIcons-dieselBarrel.webp";
import GoldIcon from "./gameIcons-gold.webp";
import MetalsIcon from "./gameIcons-metals.webp";
///////////////////////////////////////////////////////////////////////////

// -> Utility
// Arrows
import {
  default as BlueLevelUpArrow,
  default as GreenArrowUpgrade,
} from "./gameIcons-blueLevelUpArrow.webp";
import GreenWavyArrow from "./gameIcons-greenWavyArrow.webp";
import BlueSideBarArrow from "./gameIcons-sideBarArrow.webp";

// Card_Actions
import ActivateGradient3D from "./gameIcons-activateGradient.webp";
import LevelUpGradient3D from "./gameIcons-levelUpGradient.webp";
import SellGradient3D from "./gameIcons-sellGradient.webp";

// Custom_Slider
import SliderBar from "./gameIcons-sliderBar.webp";
import SliderDot from "./gameIcons-sliderDot.webp";

// other
import CraftBtn from "./gameIcons-craftButton.webp";
import ModalCloseWoodenSign from "./gameIcons-woodenCloseModal.webp";

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
  citizen: CitizenCircularIcon,
  gold: GoldCircularIcon,
  concrete: ConcreteCircularIcon,
  crystals: CrystalsCircularIcon,
  metals: MetalsCircularIcon,
  dieselbarrel: DieselBarrelCircularIcon,
};

const resourcesDefaultIcons = {
  gold: GoldIcon,
  concrete: ConcreteIcon,
  crystals: CrystalsIcon,
  metals: MetalsIcon,
  dieselbarrel: DieselBarrelIcon,
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
  buildings: BuildingsSpaceIcon,
  regs: RegsSpaceIcon,
  citizens: CitizensSpaceIcon,
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
