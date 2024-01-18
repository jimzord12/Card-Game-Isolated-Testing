// Modals -> Workers

import ConcreteWorker from "./workers-concreteWorker.webp";
import CrystalsWorker from "./workers-crystalsWorker.webp";
import Doctor from "./workers-doctorWorker.webp";
import MetalsWorker from "./workers-metalsWorker.webp";
import OilRigWorker from "./workers-oilRigWorker.webp";
import SimpleCitizen from "./workers-simpleCitizenWorker.webp";

export const resourceWorkers = {
  concrete: ConcreteWorker,
  crystals: CrystalsWorker,
  metals: MetalsWorker,
  oilRig: OilRigWorker,
};
export const other = {
  simpleCitizen: SimpleCitizen,
  doctor: Doctor,
};

export default {
  resourceWorkers,
  other,
};
