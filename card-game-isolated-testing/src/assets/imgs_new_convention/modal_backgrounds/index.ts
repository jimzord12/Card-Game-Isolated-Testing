// Modals -> Backgrounds_BG

// Defaults
import DieselFactoryBG from "./modal_backgrounds-dieselFactoryBG.webp";
import TownHallBG from "./modal_backgrounds-townHallBG.webp";

// Buildings
import AmusementParkBG from "./modal_backgrounds-amusementParkBG.webp";
import HospitalBG from "./modal_backgrounds-hospitalBG.webp";
import RadioStationBG from "./modal_backgrounds-radioStationBG.webp";
import ToolStoreBG from "./modal_backgrounds-toolStoreBG.webp";

// REGs
import SolarPanelBG from "./modal_backgrounds-solarPanelBG.webp";
import WindTurbineBG from "./modal_backgrounds-windTurbineBG.webp";

// Quarries
import ConcreteQuarryBG from "./modal_backgrounds-quarryConcreteBG.webp";
import CrystalsQuarryBG from "./modal_backgrounds-quarryCrystalsBG.webp";
import MetalsQuarryBG from "./modal_backgrounds-quarryMetalsBG.webp";
import OilRigQuarryBG from "./modal_backgrounds-quarryOilRigBG.webp";

// Town_Expansion
import TownExpansionBG from "./modal_backgrounds-townExpansionBG.webp";

// Level_Up
import BuildingLevelUp from "./modal_backgrounds-levelUpBuildingBG.webp";
import REGLevelUp from "./modal_backgrounds-levelUpRegBG.webp";

export const _defaultBG = {
  townHallBG: TownHallBG,
  dieselFactoryBG: DieselFactoryBG,
};
export const buildingsBG = {
  amusementPark: AmusementParkBG,
  hospital: HospitalBG,
  radioStation: RadioStationBG,
  toolStore: ToolStoreBG,
};
export const regsBG = {
  solarPanel: SolarPanelBG,
  windTurbine: WindTurbineBG,
};
export const quarriesBG = {
  concrete: ConcreteQuarryBG,
  crystals: CrystalsQuarryBG,
  metals: MetalsQuarryBG,
  oilRig: OilRigQuarryBG,
};
export const townExpansionBG = {
  townExpansion: TownExpansionBG,
};
export const levelUpBG = {
  building: BuildingLevelUp,
  reg: REGLevelUp,
};

export default {
  _defaultBG,
  buildingsBG,
  regsBG,
  quarriesBG,
  townExpansionBG,
  levelUpBG,
};
