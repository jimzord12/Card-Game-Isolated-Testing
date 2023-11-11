import viteManifestJson from "../../../../dist/manifest.json";
import { CardWithShadowUrl } from "../../../types";
import { ViteManifest } from "../../../types/ViteManifest";

const viteManifest: ViteManifest = viteManifestJson;

const isProduction = import.meta.env.MODE === "production";

const devModeCardWithShadowUrls: CardWithShadowUrl = {
  buildings: {
    AmusementPark:
      "src/assets/imgs_new_convention/onMapAssets/onMapAssets-amusementParkOnMapAsset.webp",
    ToolStore:
      "src/assets/imgs_new_convention/onMapAssets/onMapAssets-toolStoreOnMapAsset.webp",
    Hospital:
      "src/assets/imgs_new_convention/onMapAssets/onMapAssets-hospitalOnMapAsset.webp",
    RadioStation:
      "src/assets/imgs_new_convention/onMapAssets/onMapAssets-radioStationOnMapAsset.webp",
  },
  reg: {
    SimpleWindTurbine:
      "src/assets/imgs_new_convention/onMapAssets/onMapAssets-simpleWindTurbineOnMapAsset.webp",
    SimpleSolarPanel:
      "src/assets/imgs_new_convention/onMapAssets/onMapAssets-simpleSolarPanelOnMapAsset.webp",
    SuperWindTurbine:
      "src/assets/imgs_new_convention/onMapAssets/onMapAssets-superWindTurbineOnMapAsset.webp",
    SuperSolarPanel:
      "src/assets/imgs_new_convention/onMapAssets/onMapAssets-superSolarPanelOnMapAsset.webp",
  },
};

const prodModeCardWithShadowUrls: CardWithShadowUrl = {
  buildings: {
    AmusementPark:
      viteManifest[devModeCardWithShadowUrls.buildings.AmusementPark].file,
    ToolStore: viteManifest[devModeCardWithShadowUrls.buildings.ToolStore].file,
    Hospital: viteManifest[devModeCardWithShadowUrls.buildings.Hospital].file,
    RadioStation:
      viteManifest[devModeCardWithShadowUrls.buildings.RadioStation].file,
  },
  reg: {
    SimpleWindTurbine:
      viteManifest[devModeCardWithShadowUrls.reg.SimpleWindTurbine].file,
    SimpleSolarPanel:
      viteManifest[devModeCardWithShadowUrls.reg.SimpleSolarPanel].file,
    SuperWindTurbine:
      viteManifest[devModeCardWithShadowUrls.reg.SuperWindTurbine].file,
    SuperSolarPanel:
      viteManifest[devModeCardWithShadowUrls.reg.SuperSolarPanel].file,
  },
};

const cardUrlsWithShadow = isProduction
  ? prodModeCardWithShadowUrls
  : devModeCardWithShadowUrls;

export { cardUrlsWithShadow };
