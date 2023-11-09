/// <reference lib="WebWorker" />

const baseURL = self.location.origin; // This gives you the root of your domain
const originalImageUrls = [
  "src/assets/imgs_new_convention/appUtils/appUtils-rotateDeviceImgAppUtil.webp",
  "src/assets/imgs_new_convention/cards/cards-amusementParkCard.webp",
  "src/assets/imgs_new_convention/cards/cards-hospitalCard.webp",
  "src/assets/imgs_new_convention/cards/cards-radioStationCard.webp",
  "src/assets/imgs_new_convention/cards/cards-toolStoreCard.webp",
  "src/assets/imgs_new_convention/cards/cards-simpleSolarPanelCard.webp",
  "src/assets/imgs_new_convention/cards/cards-simpleWindTurbineCard.webp",
  "src/assets/imgs_new_convention/cards/cards-superSolarPanelCard.webp",
  "src/assets/imgs_new_convention/cards/cards-superWindTurbineCard.webp",
  "src/assets/imgs_new_convention/cards/cards-energyDrinkCard.webp",
  "src/assets/imgs_new_convention/cards/cards-heartPhoneCard.webp",
  "src/assets/imgs_new_convention/cards/cards-stocksChartCard.webp",
  "src/assets/imgs_new_convention/emblems/emblems-concreteEmblem.webp",
  "src/assets/imgs_new_convention/emblems/emblems-crystalsEmblem.webp",
  "src/assets/imgs_new_convention/emblems/emblems-islandStatsEmblem.webp",
  "src/assets/imgs_new_convention/emblems/emblems-metalsEmblem.webp",
  "src/assets/imgs_new_convention/emblems/emblems-oilRigEmblem.webp",
  "src/assets/imgs_new_convention/error/error-catBreakError.webp",
  "src/assets/imgs_new_convention/frames/frames-bambooFrame.webp",
  "src/assets/imgs_new_convention/frames/frames-goldFrame.webp",
  "src/assets/imgs_new_convention/frames/frames-greenLeavesFrame.webp",
  "src/assets/imgs_new_convention/frames/frames-metalFrame.webp",
  "src/assets/imgs_new_convention/frames/frames-rustyFrame.webp",
  "src/assets/imgs_new_convention/frames/frames-stefaniFrame.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-calendarGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-idGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-userGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-expensesGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-incomeGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-totalGoldGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-batteryGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-energyProductionGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-energyUtilizationGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-growthGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-angryFaceGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-happyFaceGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-neutralFaceGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-overjoyedFaceGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-sadFaceGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-rankGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-buildingsSpaceGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-citizensSpaceGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-regSpaceGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-citizenCircularGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-concreteCircularGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-crystalsCircularGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-dieselBarrelCircularGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-goldCircularGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-metalsCircularGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-concreteGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-crystalsGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-dieselBarrelGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-goldGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-metalsGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-blueLevelUpArrowGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-greenArrowUpgradeGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-greenWavyArrowGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-sideBarArrowGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-activateGradientGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-levelUpGradientGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-sellGradientGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-sliderBarGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-sliderDotGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-craftButtonGameIcon.webp",
  "src/assets/imgs_new_convention/gameIcons/gameIcons-woodenCloseModalGameIcon.webp",
  "src/assets/imgs_new_convention/labels/labels-colorfulLabel.webp",
  "src/assets/imgs_new_convention/labels/labels-goldenSpecialLabel.webp",
  "src/assets/imgs_new_convention/labels/labels-goldenStandardLabel.webp",
  "src/assets/imgs_new_convention/labels/labels-greenEnergyLabel.webp",
  "src/assets/imgs_new_convention/labels/labels-levelLabel.webp",
  "src/assets/imgs_new_convention/labels/labels-quarryLevelLabel.webp",
  "src/assets/imgs_new_convention/labels/labels-rustyLabel.webp",
  "src/assets/imgs_new_convention/labels/labels-woodenGroundLabel.webp",
  "src/assets/imgs_new_convention/labels/labels-woodenLongLabel.webp",
  "src/assets/imgs_new_convention/labels/labels-woodenNormalLabel.webp",
  "src/assets/imgs_new_convention/labels/labels-woodenShortLabel.webp",
  "src/assets/imgs_new_convention/maps/maps-townMap.webp",
  "src/assets/imgs_new_convention/menus/menus-buildingsMenu.webp",
  "src/assets/imgs_new_convention/menus/menus-regsMenu.webp",
  "src/assets/imgs_new_convention/menus/menus-spsMenu.webp",
  "src/assets/imgs_new_convention/modal_backgrounds/modal_backgrounds-dieselFactoryBG.webp",
  "src/assets/imgs_new_convention/modal_backgrounds/modal_backgrounds-townHallBG.webp",
  "src/assets/imgs_new_convention/modal_backgrounds/modal_backgrounds-amusementParkBG.webp",
  "src/assets/imgs_new_convention/modal_backgrounds/modal_backgrounds-hospitalBG.webp",
  "src/assets/imgs_new_convention/modal_backgrounds/modal_backgrounds-radioStationBG.webp",
  "src/assets/imgs_new_convention/modal_backgrounds/modal_backgrounds-toolStoreBG.webp",
  "src/assets/imgs_new_convention/modal_backgrounds/modal_backgrounds-solarPanelBG.webp",
  "src/assets/imgs_new_convention/modal_backgrounds/modal_backgrounds-windTurbineBG.webp",
  "src/assets/imgs_new_convention/modal_backgrounds/modal_backgrounds-quarryConcreteBG.webp",
  "src/assets/imgs_new_convention/modal_backgrounds/modal_backgrounds-quarryCrystalsBG.webp",
  "src/assets/imgs_new_convention/modal_backgrounds/modal_backgrounds-quarryMetalsBG.webp",
  "src/assets/imgs_new_convention/modal_backgrounds/modal_backgrounds-quarryOilRigBG.webp",
  "src/assets/imgs_new_convention/modal_backgrounds/modal_backgrounds-townExpansionBG.webp",
  "src/assets/imgs_new_convention/modal_backgrounds/modal_backgrounds-levelUpBuildingBG.webp",
  "src/assets/imgs_new_convention/modal_backgrounds/modal_backgrounds-levelUpRegBG.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-amusementParkOnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-hospitalOnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-radioStationOnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-toolStoreOnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-simpleSolarPanelOnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-simpleWindTurbineOnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-superSolarPanelOnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-superWindTurbineOnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-buildingPadLockOnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-REGPadlockOnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-buildingPlaceholderOnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-REGPlaceholderOnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-dieselFactoryOnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-townHallOnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-tree_01OnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-tree_02OnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-tree_03OnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-tree_05OnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-orange_Bush_and_Shadow_01OnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-trees_and_Shadow_01_BigOnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-trees_and_Shadow_01_SmallOnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-forest_01OnMapAsset.webp",
  "src/assets/imgs_new_convention/onMapAssets/onMapAssets-REG__01OnMapAsset.webp",
  "src/assets/imgs_new_convention/quarries/quarries-concreteIconQuarry.webp",
  "src/assets/imgs_new_convention/quarries/quarries-crystalsIconQuarry.webp",
  "src/assets/imgs_new_convention/quarries/quarries-metalsIconQuarry.webp",
  "src/assets/imgs_new_convention/quarries/quarries-oilRigIconQuarry.webp",
  "src/assets/imgs_new_convention/townExpansion/townExpansion-townExpansionEmblem.webp",
  "src/assets/imgs_new_convention/townExpansion/townExpansion-townExpansionIcon.webp",
  "src/assets/imgs_new_convention/workers/workers-concreteWorker.webp",
  "src/assets/imgs_new_convention/workers/workers-crystalsWorker.webp",
  "src/assets/imgs_new_convention/workers/workers-doctorWorker.webp",
  "src/assets/imgs_new_convention/workers/workers-metalsWorker.webp",
  "src/assets/imgs_new_convention/workers/workers-oilRigWorker.webp",
  "src/assets/imgs_new_convention/workers/workers-simpleCitizenWorker.webp",
];

self.addEventListener("install", (event: ExtendableEvent) => {
  const CACHE_NAME = "TEST-genera-game-cache";

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const urlsToCache = originalImageUrls.map((url) => baseURL + "/" + url);
      console.log("✅ Opened cache");
      console.log("TEST - BaseURL: ", baseURL);

      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event: FetchEvent) => {
  const CACHE_NAME = "TEST-genera-game-cache";

  event.respondWith(
    caches.match(event.request).then((response) => {
      console.log("AAAAAAAA: ", event.request);
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
