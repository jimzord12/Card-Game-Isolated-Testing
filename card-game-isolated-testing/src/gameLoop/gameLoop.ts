// import BuildingCard from "../classes/buildingClass_V2";
// import RegCard from "../classes/regClass_V2";
// import SPCard from "../classes/spClass_V2";
// import { townhallHousingLimitPerLevel } from "../constants/game/defaultBuildingsConfig";
// import {
//   effectDuration,
//   cardsWithStats,
//   catchUpLoopDuration,
//   defaultBuildings,
//   gamePace,
// } from "../constants/game/gameConfig";

// import {
//   livingStandardsBase,
//   baseMultis,
//   startingResources,
// } from "../constants/game/startingStats";
// import { nameToTemplateDataBuilding } from "../constants/templates";
// import { BuildingStats } from "../types";
// import {
//   alertFlagsTypes,
//   valueCheckerParams,
//   valueCheckerReturnType,
// } from "../types/GameLoopTypes/GameLoopTypes";
// import { isBuildingCard } from "../types/TypeGuardFns/BuildingGuards";
// import { isRegCard } from "../types/TypeGuardFns/RegGuards";

// import {
//   calcTimeUnits,
//   convertToMySQLDatetime,
//   datesDelta,
//   hoursToSecRates,
//   needCatchUp,
//   removeObjectWithId,
//   roundToDecimal,
//   calcMultiplier,
//   calcProduction,
//   calcRank,
//   calcSpacing,
//   calcUpdatedGathValue,
//   calcPrivSector,
//   calcLivingStandards,
//   filterCardCategory,
//   calcSum,
//   cardsStateManager,
// } from "./utils";

// function valueChecker(
//   isSecondRun = false,
//   {
//     population,
//     activeCards,
//     EffectRef,
//     workers,
//     townhallLevel,
//     popGrowthRate,
//     energyRemaining,
//   }: valueCheckerParams
// ): void {
//   // Caching some values...
//   const techStoresCards = activeCards.filter(
//     (card) => card.templateId === nameToTemplateDataBuilding.ToolStore.id
//   ) as BuildingCard[];
//   // const EffectRef = specialEffectsRef.current; //TODO: When Effects are created
//   const buildings = activeCards.filter((card) =>
//     isBuildingCard(card)
//   ) as BuildingCard[];
//   const regs = activeCards.filter((card) => isRegCard(card)) as RegCard[];
//   const totalWorkers =
//     workers.privateSector +
//     workers.concreteWorkers +
//     workers.metalsWorkers +
//     workers.crystalsWorkers;

//   let buildingsToDeactivate: BuildingCard[] = [];
//   const regToDeactivate: RegCard[] = [];
//   let spToDeactivate: SPCard[] = [];
//   const alertFlags: alertFlagsTypes[] = [];

//   // Check #1 - When Population reached the max limit, stop popGrowth
//   if (population > townhallHousingLimitPerLevel[townhallLevel]) {
//     console.log(
//       "%c ⚙ Value Checker - Adjusted (Population) ⚙",
//       "background: #222; color: #bada55; font-size: 16px"
//     );
//     population = townhallHousingLimitPerLevel[townhallLevel];
//     popGrowthRate = 0;
//     // alertFlags.push("Insufficient Energy");
//     console.warn("⚠ Population has reached the maximum limit! Adjusted.");
//   }

//   // Check #2 - Available Pop & Workers Checker
//   if (totalWorkers > population) {
//     console.log(
//       "%c ⚙ Value Checker - Adjusted (Workers) ⚙",
//       "background: #222; color: #bada55; font-size: 16px"
//     );
//     workers = {
//       privateSector: population,
//       concreteWorkers: 0,
//       metalsWorkers: 0,
//       crystalsWorkers: 0,
//     };
//   }

//   // Check #3 - Sufficient Energy Checker
//   if (energyRemaining < 0) {
//     buildingsToDeactivate = buildings;
//     // cardsStateManager(buildings, "deactivate", updateCardData);
//     // setActiveCards([...regs]);
//     // setInventoryCards((prev) => [...prev, ...buildingCards]);

//     alertFlags.push("Insufficient Energy");
//     // toastError.showError(
//     //   "Insufficient Energy",
//     //   "⚡ Insufficient Energy! Your Buildings have been deactived. Consider Upgrading your REGs"
//     // );
//   }

//   // Check #4 - Check that TechStore's Tools are not above the Card's level
//   techStoresCards.forEach((techStore: BuildingCard) => {
//     const techstoreStats = ["gold", "concrete", "metals", "crystals"];

//     const tools = techStore.stats;
//     for (const tool in tools) {
//       if (techstoreStats.includes(tool) && tools !== undefined) {
//         if (Object.hasOwnProperty.call(tools, tool)) {
//           const tool_lvl = tools[tool as keyof BuildingStats];
//           if (tool_lvl > techStore.level) {
//             console.log(
//               "%c ⚙ Value Checker - Adjusted (Tools in TechStore) ⚙",
//               "background: #222; color: #bada55; font-size: 16px"
//             );
//             tools[tool as keyof BuildingStats] = techStore.level;
//           }
//         }
//       }
//     }
//   });

//   // Check #5 - if the Special Effect has finished
//   if (EffectRef.isEffectActive)
//     console.log("ValueChecker::The Effect Data: ", EffectRef);
//   if (
//     EffectRef.isEffectActive && // if Effect is active AND
//     // Returns false when the Effect expires
//     !datesDelta(EffectRef.endDate + effectDuration, Date.now())
//   ) {
//     specialEffectsRef.current = {
//       isEffectActive: false,
//       endDate: 0,
//       goldGathRate: 1,
//       popGrowthRate: 1,
//       concreteGathRate: 1,
//       metalsGathRate: 1,
//       crystalsGathRate: 1,
//     };
//     const [SE_Card] = filterCardCategory(activeCards, "sp") as [SPCard]; // There should be only one.
//     SE_Card.disable();
//     spToDeactivate = [SE_Card];
//     // cardsStateManager([SE_Card], "deactivate", updateCardData);
//     // setActiveCards([...removeObjectWithId(activeCards, SE_Card.id)]);
//     // setInventoryCards((prev) => [...prev, SE_Card]);
//     // alert('⏳ Your Special Effect Card expired!');
//     alertFlags.push("Effect Expired");
//     // toastError.showError(
//     //   "Effect Expired",
//     //   "⏳ Your Special Effect Card expired!"
//     // );
//   }

//   // // Check #6 - if The active cards exceed the maximum Space Limits
//   // if (
//   //   (!isSecondRun && regs.length > spaceLimitsRef.generatorsSpace) ||
//   //   buildings.length > spaceLimitsRef.buildingsSpace
//   // ) {
//   //   if (regs.length > spaceLimitsRef.generatorsSpace) {
//   //     cardsStateManager(activeCards, "deactivate", updateCardData);
//   //     setInventoryCards((prev) => [...prev, ...activeCards]);
//   //     setActiveCards([]);
//   //   } else if (buildings.length > spaceLimitsRef.buildingsSpace) {
//   //     cardsStateManager(buildings, "deactivate", updateCardData);
//   //     setActiveCards([...regs]);
//   //     setInventoryCards((prev) => [...prev, ...buildings]);
//   //   }
//   // }
// }

// function maintenanceSubtracker() {
//   const regCards = activeCards.filter(
//     (card) => card.type.toLowerCase() === "reg"
//   );
//   console.log("🏭💸 Total Costs (/hour): ", maintenanceRef.current.gold);

//   // If there are not any REG Cards don't waste processing power
//   if (regCards.length === 0) {
//     maintenanceRef.current.gold = 0;
//     return;
//   }
//   const playerGold = materialResourcesRef.current.gold;
//   const totalMaintenanceGold = regCards.reduce((acc, card) => {
//     return acc + card.maintenance.gold;
//   }, 0);

//   maintenanceRef.current.gold = roundToDecimal(totalMaintenanceGold, 4); // Update global state

//   if (totalMaintenanceGold > playerGold) {
//     // setActiveCards((prev) => prev.filter((card) => !regCards.includes(card)));
//     // setInventoryCards((prev) => [...prev, ...regCards]);
//     cardsStateManager(activeCards, "deactivate", updateCardData);
//     setInventoryCards((prev) => [...prev, ...activeCards]);
//     setActiveCards([]);
//     // alert(
//     //   `😱 Your current Gold is not enough to pay for the maintenance of your Generators! Therefore, your Generators will be deactivated.`
//     // );
//     toastError.showError(
//       "Low on Gold",
//       "😱 Your current Gold is not enough to pay for the maintenance of your Generators! Therefore, your Generators will be deactivated."
//     );
//   } else {
//     console.log("======== Maintenance ========");
//     console.log("🏭💸 Generators: ", regCards);
//     console.log("🏭💸 Total Costs (/hour): ", totalMaintenanceGold);
//     console.log(
//       "🏭💸 Total Costs (/5sec): ",
//       hoursToSecRates(totalMaintenanceGold, gamePace)
//     );
//     console.log("🏭💸 Old Balance: ", materialResourcesRef.current.gold);

//     //@Important: This Line subtracts gold from the resources
//     materialResourcesRef.current.gold -= hoursToSecRates(
//       totalMaintenanceGold,
//       gamePace,
//       catchUp
//     );
//     console.log("🏭💸 New Balance: ", materialResourcesRef.current.gold);
//     console.log("======== ======== ========");
//   }
// }

// function gameLoop(isCatchUp = false, _loopCounter) {
//   console.log("♦♥♦♥ 🕕 $$ Start of Loop $$ 🕕 ♦♥♦♥");

//   valueChecker();
//   const isSecondRun = true; // Needed in 2nd ValueChecker in the end of the gameLoop func
//   if (testingMode) {
//     boostGathRates4Testing(100)();
//   }

//   console.log("♦♥♦♥ 🧪 Testing Mode 🧪: ", testingMode);
//   console.log("♦♥♦♥ $$ Active Cards $$: ", activeCards);
//   console.log("♦♥♦♥ $$ Inventory Cards Amount $$: ", inventoryCards);
//   console.log("======== Gath Rates ========");
//   console.log("💰 1 - Gath Gold: ", gatheringRatesRef.current.goldGathRate);
//   console.log("👨‍🔧 2 - Gath Pop: ", gatheringRatesRef.current.popGrowthRate);
//   console.log(
//     "🧱 3 - Gath Concrete: ",
//     gatheringRatesRef.current.concreteGathRate
//   );
//   console.log("⚙  4 - Gath Metals: ", gatheringRatesRef.current.metalsGathRate);
//   console.log(
//     "🔍 5 - Gath Crystals: ",
//     gatheringRatesRef.current.crystalsGathRate
//   );

//   // Resources
//   // - Non Material
//   //   - Population
//   nonMaterialResourcesRef.current.population = roundToDecimal(
//     calcUpdatedGathValue(
//       nonMaterialResourcesRef.current.population,
//       hoursToSecRates(
//         gatheringRatesRef.current.popGrowthRate,
//         gamePace,
//         catchUp
//       )
//     ),
//     4
//   );

//   // - Material
//   //   - Gold
//   materialResourcesRef.current.gold = roundToDecimal(
//     calcUpdatedGathValue(
//       materialResourcesRef.current.gold,
//       hoursToSecRates(gatheringRatesRef.current.goldGathRate, gamePace, catchUp)
//     ),
//     4
//   );
//   //   - Concrete
//   materialResourcesRef.current.concrete = roundToDecimal(
//     calcUpdatedGathValue(
//       materialResourcesRef.current.concrete,
//       hoursToSecRates(
//         gatheringRatesRef.current.concreteGathRate,
//         gamePace,
//         catchUp
//       )
//     ),
//     4
//   );
//   //   - Metals
//   materialResourcesRef.current.metals = roundToDecimal(
//     calcUpdatedGathValue(
//       materialResourcesRef.current.metals,
//       hoursToSecRates(
//         gatheringRatesRef.current.metalsGathRate,
//         gamePace,
//         catchUp
//       )
//     ),
//     4
//   );
//   //   - Crystals
//   materialResourcesRef.current.crystals = roundToDecimal(
//     calcUpdatedGathValue(
//       materialResourcesRef.current.crystals,
//       hoursToSecRates(
//         gatheringRatesRef.current.crystalsGathRate,
//         gamePace,
//         catchUp
//       )
//     ),
//     4
//   );

//   // Spacing Limitations
//   maxLimitsRef.current.housingSpace = calcSpacing(
//     townHallLevelRef.current,
//     "housing"
//   );
//   maxLimitsRef.current.buildingsSpace = calcSpacing(
//     townHallLevelRef.current,
//     "buildings"
//   );
//   maxLimitsRef.current.generatorsSpace = calcSpacing(
//     townHallLevelRef.current,
//     "generators"
//   );

//   // Energy
//   energyRef.current.prodEnergy = calcSum(
//     filterCardCategory(activeCards, "reg"),
//     "output",
//     "energy"
//   );
//   energyRef.current.requiredEnergy = calcSum(
//     filterCardCategory(activeCards, "building"),
//     "maintenance",
//     "energy"
//   );
//   energyRef.current.delta =
//     energyRef.current.prodEnergy - energyRef.current.requiredEnergy;

//   // Rank
//   nonMaterialResourcesRef.current.rank = calcRank(
//     nonMaterialResourcesRef.current.population,
//     energyRef.current.prodEnergy
//   );

//   // Living Standards
//   livingStandardsRef.current = roundToDecimal(
//     calcLivingStandards(
//       livingStandardsBase,
//       nonMaterialResourcesRef.current.population,
//       //@Note: Add the Cards which play a factor (give a bonus) in the array
//       calcSum([], "output"),
//       maxLimitsRef.current.housingSpace
//     ),
//     4
//   );

//   // Multipliers
//   const techStoresCards = activeCards.filter((card) => card.templateId === 13);
//   multipliersRef.current.goldMultiplier = roundToDecimal(
//     calcMultiplier(techStoresCards, "gold", baseMultis.baseGoldMulti),
//     4
//   );
//   multipliersRef.current.concreteMultiplier =
//     multipliersRef.current.concreteMultiplier = roundToDecimal(
//       calcMultiplier(techStoresCards, "concrete", baseMultis.baseConcreteMulti),
//       4
//     );
//   multipliersRef.current.metalsMultiplier =
//     multipliersRef.current.metalsMultiplier = roundToDecimal(
//       calcMultiplier(techStoresCards, "metals", baseMultis.baseMetalsMulti),
//       4
//     );
//   multipliersRef.current.crystalsMultiplier =
//     multipliersRef.current.crystalsMultiplier = roundToDecimal(
//       calcMultiplier(techStoresCards, "crystals", baseMultis.baseCrystalsMulti),
//       4
//     );

//   // Rates
//   // - Pop Growth
//   gatheringRatesRef.current.popGrowthRate =
//     roundToDecimal(Number(livingStandardsRef.current) / 100, 4) *
//     specialEffectsRef.current.popGrowthRate;

//   // - Gold Gather Rate
//   gatheringRatesRef.current.goldGathRate =
//     roundToDecimal(
//       calcProduction(
//         workersRef.current.privateSector,
//         multipliersRef.current.goldMultiplier
//       ),
//       4
//     ) * specialEffectsRef.current.goldGathRate;

//   // - Concrete Gather Rate
//   gatheringRatesRef.current.concreteGathRate =
//     roundToDecimal(
//       calcProduction(
//         workersRef.current.concreteWorkers,
//         multipliersRef.current.concreteMultiplier
//       ),
//       4
//     ) * specialEffectsRef.current.concreteGathRate;

//   // - Metals Gather Rate
//   gatheringRatesRef.current.metalsGathRate =
//     roundToDecimal(
//       calcProduction(
//         workersRef.current.metalsWorkers,
//         multipliersRef.current.metalsMultiplier
//       ),
//       4
//     ) * specialEffectsRef.current.metalsGathRate;

//   // - Crystals Gather Rate
//   gatheringRatesRef.current.crystalsGathRate =
//     roundToDecimal(
//       calcProduction(
//         workersRef.current.crystalsWorkers,
//         multipliersRef.current.crystalsMultiplier
//       ),
//       4
//     ) * specialEffectsRef.current.crystalsGathRate;

//   if (specialEffectsRef.current.isEffectActive) {
//     console.log("======== Effect Boosts ========");
//     console.log(
//       "Is any Effect Active: ",
//       specialEffectsRef.current.isEffectActive
//     );
//     console.log(
//       "Expires In (ms): ",
//       specialEffectsRef.current.endDate + effectDuration
//     );
//     console.log(
//       "Expires In (date): ",
//       new Date(specialEffectsRef.current.endDate + effectDuration)
//     );
//     console.log(
//       "1 - Concrete: ",
//       roundToDecimal(specialEffectsRef.current.concreteGathRate - 1, 4)
//     );
//     console.log(
//       "2 - Metals: ",
//       roundToDecimal(specialEffectsRef.current.metalsGathRate - 1, 4)
//     );
//     console.log(
//       "3 - Crystals: ",
//       roundToDecimal(specialEffectsRef.current.crystalsGathRate - 1, 4)
//     );
//   }

//   // Workers (a.k.a Citizen)
//   // - Private Sector
//   workersRef.current.privateSector = roundToDecimal(
//     calcPrivSector(
//       nonMaterialResourcesRef.current.population,
//       workersRef.current.concreteWorkers,
//       workersRef.current.metalsWorkers,
//       workersRef.current.crystalsWorkers
//     ),
//     4
//   );

//   valueChecker(isSecondRun); // The anti-cheat system 🤣
//   maintenanceSubtracker();
//   if (!isCatchUp) {
//     // Stores Changes to DB
//     updatePlayerData({
//       id: fetchedPlayer.id,
//       townhall_lvl: townHallLevelRef.current,
//       workers_concrete: workersRef.current.concreteWorkers,
//       workers_metals: workersRef.current.metalsWorkers,
//       workers_crystals: workersRef.current.crystalsWorkers,
//       concrete: materialResourcesRef.current.concrete,
//       metals: materialResourcesRef.current.metals,
//       crystals: materialResourcesRef.current.crystals,
//       gold: materialResourcesRef.current.gold,
//       population: nonMaterialResourcesRef.current.population,
//       rank: nonMaterialResourcesRef.current.rank,
//       timestamp: convertToMySQLDatetime(Date.now()),
//     });
//   }
//   console.log("♦♥♦♥ 🕕 $$ End of Loop $$ 🕕 ♦♥♦♥");
// }
