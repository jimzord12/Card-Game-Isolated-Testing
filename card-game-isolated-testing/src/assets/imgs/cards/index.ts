// Buildings
import AmusementPark from "./buildings/Entertainment_Center_OnMap_TRANS.webp";
import Hospital from "./buildings/Hospital_On_Map_TRANS.webp";
import RadioStation from "./buildings/Radio_Tower_Station_Card_TRANS.webp";
import ToolStore from "./buildings/Tool_Tech_Store_Card_TRANS.webp";

// REGs
import SolarPanelSimple from "./regs/Simple_Solar_Panel.webp";
import WindTurbineSimple from "./regs/Simple_Wind_Turbine.webp";
import SolarPanelSuper from "./regs/Super_Solar_Panel.webp";
import WindTurbineSuper from "./regs/Super_Wind_Turbine.webp";

// Special Effects (SPs)
import GatheringBoost from "./sps/Energy_Drink_with_Arms.webp";
import GrowthBoost from "./sps/Phone_Heart_TRANS.webp";
import EconomyBoost from "./sps/Stock_Chart_TRANS.webp";

const buildingCards = {
  toolStore: ToolStore,
  amusementPark: AmusementPark,
  hospital: Hospital,
  radioStation: RadioStation,
};

const regCards = {
  windTurbineSimple: WindTurbineSimple,
  windTurbineSuper: WindTurbineSuper,
  solarPanelSimple: SolarPanelSimple,
  solarPanelSuper: SolarPanelSuper,
};

const spCards = {
  gatheringBoost: GatheringBoost,
  growthBoost: GrowthBoost,
  economyBoost: EconomyBoost,
};

export { buildingCards, regCards, spCards };
