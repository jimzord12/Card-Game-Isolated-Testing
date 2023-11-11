import viteManifestJson from "../../../../dist/manifest.json";
import { CardNoShadowUrl } from "../../../types";
import { ViteManifest } from "../../../types/ViteManifest";

const viteManifest: ViteManifest = viteManifestJson;

const devModeCardUrls: CardNoShadowUrl = {
  buildings: {
    AmusementPark:
      "src/assets/imgs_new_convention/cards/cards-amusementParkCard.webp",
    ToolStore: "src/assets/imgs_new_convention/cards/cards-toolStoreCard.webp",
    Hospital: "src/assets/imgs_new_convention/cards/cards-hospitalCard.webp",
    RadioStation:
      "src/assets/imgs_new_convention/cards/cards-radioStationCard.webp",
  },
  reg: {
    SimpleWindTurbine:
      "src/assets/imgs_new_convention/cards/cards-simpleWindTurbineCard.webp",
    SimpleSolarPanel:
      "src/assets/imgs_new_convention/cards/cards-simpleSolarPanelCard.webp",
    SuperWindTurbine:
      "src/assets/imgs_new_convention/cards/cards-superWindTurbineCard.webp",
    SuperSolarPanel:
      "src/assets/imgs_new_convention/cards/cards-superSolarPanelCard.webp",
  },
  sps: {
    WallStreet:
      "src/assets/imgs_new_convention/cards/cards-stocksChartCard.webp",
    LoveApp: "src/assets/imgs_new_convention/cards/cards-heartPhoneCard.webp",
    SuperStrong:
      "src/assets/imgs_new_convention/cards/cards-energyDrinkCard.webp",
  },
};

const prodModeCardUrls: CardNoShadowUrl = {
  buildings: {
    AmusementPark: viteManifest[devModeCardUrls.buildings.AmusementPark].file,
    ToolStore: viteManifest[devModeCardUrls.buildings.ToolStore].file,
    Hospital: viteManifest[devModeCardUrls.buildings.Hospital].file,
    RadioStation: viteManifest[devModeCardUrls.buildings.RadioStation].file,
  },
  reg: {
    SimpleWindTurbine: viteManifest[devModeCardUrls.reg.SimpleWindTurbine].file,
    SimpleSolarPanel: viteManifest[devModeCardUrls.reg.SimpleSolarPanel].file,
    SuperWindTurbine: viteManifest[devModeCardUrls.reg.SuperWindTurbine].file,
    SuperSolarPanel: viteManifest[devModeCardUrls.reg.SuperSolarPanel].file,
  },
  sps: {
    WallStreet: viteManifest[devModeCardUrls.sps.WallStreet].file,
    LoveApp: viteManifest[devModeCardUrls.sps.LoveApp].file,
    SuperStrong: viteManifest[devModeCardUrls.sps.SuperStrong].file,
  },
};

export { devModeCardUrls, prodModeCardUrls };
