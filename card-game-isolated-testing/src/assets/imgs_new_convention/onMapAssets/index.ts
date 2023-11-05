// Buildings
import AmusementPark from "./onMapAssets-amusementPark.webp";
import Hospital from "./onMapAssets-hospital.webp";
import RadioStation from "./onMapAssets-radioStation.webp";
import ToolStore from "./onMapAssets-toolStore.webp";

// REGs
import SimpleSolarPanel from "./onMapAssets-simpleSolarPanel.webp";
import SimpleWindTurbine from "./onMapAssets-simpleWindTurbine.webp";
import SuperSolarPanel from "./onMapAssets-superSolarPanel.webp";
import SuperWindTurbine from "./onMapAssets-superWindTurbine.webp";

// Padlocks
import PadlockBuilding from "./onMapAssets-buildingPadLock.webp";
import PadlockREG from "./onMapAssets-REGPadlock.webp";

// Placeholders
import PlaceholderBuilding from "./onMapAssets-buildingPlaceholder.webp";
import PlaceholderREG from "./onMapAssets-REGPlaceholder.webp";

// Defauly Buildings
import DieselFactory from "./onMapAssets-dieselFactory.webp";
import TownHall from "./onMapAssets-townHall.webp";

// -> Trees & Bushes
// Single Tree
import Tree_01 from "./onMapAssets-tree_01.webp";
import Tree_02 from "./onMapAssets-tree_02.webp";
import Tree_03 from "./onMapAssets-tree_03.webp";
import Tree_04 from "./onMapAssets-tree_05.webp";

// With Shadow
import OrangeBushwithShadow from "./onMapAssets-orange_Bush_and_Shadow_01.webp";
import TreeWithShadowBig from "./onMapAssets-trees_and_Shadow_01_Big.webp";
import TreeWithShadowSmall from "./onMapAssets-trees_and_Shadow_01_Small.webp";

// Multiple Trees
import Trees_01 from "./onMapAssets-forest_01.webp";
import Trees_02 from "./onMapAssets-REG__01.webp";

export const singleTree = {
  tree_01: Tree_01,
  tree_02: Tree_02,
  tree_03: Tree_03,
  tree_04: Tree_04,
};
export const withShadow = {
  orangeBushShadow: OrangeBushwithShadow,
  treesShadowBig: TreeWithShadowBig,
  treesShadowSmall: TreeWithShadowSmall,
};
export const multipleTree = {
  trees_01: Trees_01,
  trees_02: Trees_02,
};

export const buildings = {
  amusementPark: AmusementPark,
  hospital: Hospital,
  radioStation: RadioStation,
  toolStore: ToolStore,
};
export const regs = {
  simpleWindTurbine: SimpleWindTurbine,
  superWindTurbine: SuperWindTurbine,
  simpleSolarPanel: SimpleSolarPanel,
  superSolarPanel: SuperSolarPanel,
};
export const placeholders = {
  padlockBuilding: PadlockBuilding,
  padlockREG: PadlockREG,
  placeholderBuilding: PlaceholderBuilding,
  placeholderREG: PlaceholderREG,
};
export const defaultBuildings = {
  townHall: TownHall,
  dieselFactory: DieselFactory,
};
