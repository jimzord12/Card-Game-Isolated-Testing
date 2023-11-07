// Building - Cards
import AmusementPark from "./cards-amusementPark.webp";
import Hospital from "./cards-hospital.webp";
import RadioStation from "./cards-radioStation.webp";
import ToolStore from "./cards-toolStore.webp";

// REG - Cards
import SimpleSolarPanel from "./cards-simpleSolarPanel.webp";
import SimpleWindTurbine from "./cards-simpleWindTurbine.webp";
import SuperSolarPanel from "./cards-superSolarPanel.webp";
import SuperWindTurbine from "./cards-superWindTurbine.webp";

// SP - Cards
import EnergyDrink from "./cards-energyDrink.webp";
import HeartPhone from "./cards-heartPhone.webp";
import StocksChart from "./cards-stocksChart.webp";

export const buildingCards = {
  amusementPark: AmusementPark,
  hospital: Hospital,
  toolStore: ToolStore,
  radioStation: RadioStation,
};

export const regCards = {
  simpleWindTurbine: SimpleWindTurbine,
  simpleSolarPanel: SimpleSolarPanel,
  superWindTurbine: SuperWindTurbine,
  superSolarPanel: SuperSolarPanel,
};

export const spCards = {
  energyDrink: EnergyDrink,
  heartPhone: HeartPhone,
  stocksChart: StocksChart,
};

export default {
  buildingCards,
  regCards,
  spCards,
};