// Buildings
import AmusementParkOnMapAsset from "./onMapAssets-amusementParkOnMapAsset.webp";
import HospitalOnMapAsset from "./onMapAssets-hospitalOnMapAsset.webp";
import RadioStationOnMapAsset from "./onMapAssets-radioStationOnMapAsset.webp";
import ToolStoreOnMapAsset from "./onMapAssets-toolStoreOnMapAsset.webp";

// REGs
import SimpleSolarPanelOnMapAsset from "./onMapAssets-simpleSolarPanelOnMapAsset.webp";
import SimpleWindTurbineOnMapAsset from "./onMapAssets-simpleWindTurbineOnMapAsset.webp";
import SuperSolarPanelOnMapAsset from "./onMapAssets-superSolarPanelOnMapAsset.webp";
import SuperWindTurbineOnMapAsset from "./onMapAssets-superWindTurbineOnMapAsset.webp";

// Padlocks
import PadlockBuildingOnMapAsset from "./onMapAssets-buildingPadLockOnMapAsset.webp";
import PadlockREGOnMapAsset from "./onMapAssets-REGPadlockOnMapAsset.webp";

// Placeholders
import PlaceholderBuildingOnMapAsset from "./onMapAssets-buildingPlaceholderOnMapAsset.webp";
import PlaceholderREGOnMapAsset from "./onMapAssets-REGPlaceholderOnMapAsset.webp";

// Defauly Buildings
import DieselFactoryOnMapAsset from "./onMapAssets-dieselFactoryOnMapAsset.webp";
import TownHallOnMapAsset from "./onMapAssets-townHallOnMapAsset.webp";

// -> Trees & Bushes
// Single Tree
import Tree_01OnMapAsset from "./onMapAssets-tree_01OnMapAsset.webp";
import Tree_02OnMapAsset from "./onMapAssets-tree_02OnMapAsset.webp";
import Tree_03OnMapAsset from "./onMapAssets-tree_03OnMapAsset.webp";
import Tree_04OnMapAsset from "./onMapAssets-tree_05OnMapAsset.webp";

// With Shadow
import OrangeBushwithShadowOnMapAsset from "./onMapAssets-orange_Bush_and_Shadow_01OnMapAsset.webp";
import TreeWithShadowBigOnMapAsset from "./onMapAssets-trees_and_Shadow_01_BigOnMapAsset.webp";
import TreeWithShadowSmallOnMapAsset from "./onMapAssets-trees_and_Shadow_01_SmallOnMapAsset.webp";

// Multiple Trees
import Trees_01OnMapAsset from "./onMapAssets-forest_01OnMapAsset.webp";
import Trees_02OnMapAsset from "./onMapAssets-REG__01OnMapAsset.webp";

export const singleTree = {
  tree_01: Tree_01OnMapAsset,
  tree_02: Tree_02OnMapAsset,
  tree_03: Tree_03OnMapAsset,
  tree_04: Tree_04OnMapAsset,
};
export const withShadow = {
  orangeBushShadow: OrangeBushwithShadowOnMapAsset,
  treesShadowBig: TreeWithShadowBigOnMapAsset,
  treesShadowSmall: TreeWithShadowSmallOnMapAsset,
};
export const multipleTree = {
  trees_01: Trees_01OnMapAsset,
  trees_02: Trees_02OnMapAsset,
};

export const buildings = {
  amusementPark: AmusementParkOnMapAsset,
  hospital: HospitalOnMapAsset,
  radioStation: RadioStationOnMapAsset,
  toolStore: ToolStoreOnMapAsset,
};
export const regs = {
  simpleWindTurbine: SimpleWindTurbineOnMapAsset,
  superWindTurbine: SuperWindTurbineOnMapAsset,
  simpleSolarPanel: SimpleSolarPanelOnMapAsset,
  superSolarPanel: SuperSolarPanelOnMapAsset,
};
export const placeholders = {
  padlockBuilding: PadlockBuildingOnMapAsset,
  padlockREG: PadlockREGOnMapAsset,
  placeholderBuilding: PlaceholderBuildingOnMapAsset,
  placeholderREG: PlaceholderREGOnMapAsset,
};
export const defaultBuildings = {
  townHall: TownHallOnMapAsset,
  dieselFactory: DieselFactoryOnMapAsset,
};

export default {
  singleTree,
  withShadow,
  multipleTree,
  buildings,
  regs,
  placeholders,
  defaultBuildings,
};
