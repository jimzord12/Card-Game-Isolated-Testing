// Buildings
import AmusementPark from "./buildings/Amusement_Park.webp";
import Hospital from "./buildings/Hospital.webp";
import RadioStation from "./buildings/Radio_Station.webp";
import ToolStore from "./buildings/Tool_Store.webp";

// REGs
import SimpleSolarPanel from "./regs/Simple_Solar_Panel.webp";
import SimpleWindTurbine from "./regs/Simple_Wind_Turbine.webp";
import SuperSolarPanel from "./regs/Super_Solar_Panel.webp";
import SuperWindTurbine from "./regs/Super_Wind_Turbine.webp";

// Placeholders
import PadlockBuilding from "./placeholders/Building_PadLock.webp";
import PlaceholderBuilding from "./placeholders/Building_Placeholder.webp";
import PadlockREG from "./placeholders/REG_Padlock.webp";
import PlaceholderREG from "./placeholders/REG_Placeholder.webp";

// Defauly Buildings
import DieselFactory from "./defaultBuildings/Diesel_Factory.webp";
import TownHall from "./defaultBuildings/TownHall.webp";

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
