import { CardRequirements, Level } from "../../types";

export const townhallRequirements: Record<Level, CardRequirements> = {
  1: {
    gold: 2500,
    concrete: 500,
    metals: 300,
    crystals: 250,
    diesel: 50,
    population: 0,
  },
  2: {
    gold: 5000,
    concrete: 1000,
    metals: 600,
    crystals: 500,
    diesel: 100,
    population: 0,
  },
  3: {
    gold: 10_000,
    concrete: 2000,
    metals: 1200,
    crystals: 1000,
    diesel: 200,
    population: 0,
  },
  4: {
    gold: 20_000,
    concrete: 4000,
    metals: 2400,
    crystals: 2000,
    diesel: 400,
    population: 0,
  },
  5: {
    gold: 1_000_000,
    concrete: 1_000_000,
    metals: 1_000_000,
    crystals: 1_000_000,
    diesel: 1_000_000,
    population: 1_000_000,
  },
};

export const townhallAvailSpacePerLevel = {
  1: {
    buildings: 2,
    regs: 0,
  },
  2: {
    buildings: 3,
    regs: 1,
  },
  3: {
    buildings: 5,
    regs: 3,
  },
  4: {
    buildings: 6,
    regs: 4,
  },
  5: {
    buildings: 7,
    regs: 6,
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
    gold: 2500,
    concrete: 500,
    metals: 300,
    crystals: 250,
    diesel: 50,
    population: 0,
  },
  2: {
    gold: 5000,
    concrete: 1000,
    metals: 600,
    crystals: 500,
    diesel: 100,
    population: 0,
  },
  3: {
    gold: 10_000,
    concrete: 2000,
    metals: 1200,
    crystals: 1000,
    diesel: 200,
    population: 0,
  },
  4: {
    gold: 20_000,
    concrete: 4000,
    metals: 2400,
    crystals: 2000,
    diesel: 400,
    population: 0,
  },
  5: {
    gold: 1_000_000,
    concrete: 1_000_000,
    metals: 1_000_000,
    crystals: 1_000_000,
    diesel: 1_000_000,
    population: 1_000_000,
  },
};
