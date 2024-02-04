import { CardRequirements, Level } from "../../types";

export const townhallRequirements: Record<Level, CardRequirements> = {
  1: {
    gold: 0,
    concrete: 0,
    metals: 0,
    crystals: 0,
    diesel: 0,
    population: 0,
  },
  2: {
    gold: 2500,
    concrete: 500,
    metals: 300,
    crystals: 250,
    diesel: 50,
    population: 0,
  },
  3: {
    gold: 5000,
    concrete: 1000,
    metals: 600,
    crystals: 500,
    diesel: 100,
    population: 0,
  },
  4: {
    gold: 10_000,
    concrete: 2000,
    metals: 1200,
    crystals: 1000,
    diesel: 200,
    population: 0,
  },
  5: {
    gold: 20_000,
    concrete: 4000,
    metals: 2400,
    crystals: 2000,
    diesel: 400,
    population: 0,
  },
};

export const townhallHousingLimitPerLevel = {
  1: 60,
  2: 120,
  3: 180,
  4: 240,
  5: 300,
};

export const factoryRequirements: Record<Level, CardRequirements> = {
  1: {
    gold: 0,
    concrete: 0,
    metals: 0,
    crystals: 0,
    diesel: 0,
    population: 0,
  },
  2: {
    gold: 2500,
    concrete: 500,
    metals: 300,
    crystals: 250,
    diesel: 50,
    population: 0,
  },
  3: {
    gold: 5000,
    concrete: 1000,
    metals: 600,
    crystals: 500,
    diesel: 100,
    population: 0,
  },
  4: {
    gold: 10_000,
    concrete: 2000,
    metals: 1200,
    crystals: 1000,
    diesel: 200,
    population: 0,
  },
  5: {
    gold: 20_000,
    concrete: 4000,
    metals: 2400,
    crystals: 2000,
    diesel: 400,
    population: 0,
  },
};
