// Game's Constants - Starting Values
const livingStandardsBase = 200; // 200% || 2.0 new Ctizens per hour
const startingHousingSpace = 60; // Max Population Limit
const startingBuildingsSpace = 4; // Max Buildings Limit
const startingGeneratorsSpace = 2; // Max Generators Limit

const startingPop = 30;
const startingResources = {
  gold: 100_000,
  concrete: 50_000,
  metals: 30_000,
  crystals: 25_000,
};

const baseMultis = {
  baseGoldMulti: 20,
  baseConcreteMulti: 5,
  baseMetalsMulti: 3,
  baseCrystalsMulti: 1,
};

export {
  livingStandardsBase,
  startingHousingSpace,
  startingBuildingsSpace,
  startingGeneratorsSpace,
  startingPop,
  startingResources,
  baseMultis,
};
