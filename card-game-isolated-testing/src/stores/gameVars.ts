import { create } from "zustand";
import { Level } from "../types";
import { IPlayerDB } from "../types/PlayerTypes/Player";
import { effectClass } from "../classes";
import { Multipliers, Workers } from "../types/GameLoopTypes/GameLoopTypes";
import {
  defaultQuarryLevels,
  defaultRates,
  defaultRatesMultipliers,
  defaultWorkers,
} from "../constants/game/gameConfig";
import { defaultBuildingsConfig } from "../constants/game";
import { calcPopGrowthRate } from "../hooks/game/gameLoop/calculators/gathRatesCalculators";
import { round4Decimal } from "../utils/game/roundToDecimal";

export type GameVarsState = {
  player: IPlayerDB | null;
  townhallLevel: Level;
  factoryLevel: Level;
  factoryBarrels: number;
  factoryUnhappiness: number;
  happinessFromBuildings: number;
  expences: number; // In Old Code is Maintanance
  needsCatchUp: boolean;
  rank: number;

  // Quarries
  quarryLevels: {
    concrete: number;
    metals: number;
    crystals: number;
    diesel: number;
  };

  // Rates
  popGrowthRate: number;
  goldGathRate: number;
  concreteGathRate: number;
  metalsGathRate: number;
  crystalsGathRate: number;
  dieselGathRate: number;

  // Multipliers (only from ToolStore)
  multipliers: Multipliers;

  // Energy
  energyProduced: number;
  energyConsumed: number;
  energyRemaining: number;

  // Workers
  allWorkers: Workers;

  // Ecomnomy
  // TODO: Add Special Effect, and create Types for it
  // To see if an Effact is active, we check if the effect's state is true
  // TODO: Create Game Initialiazation. This will be called when the Game Compoenent is mounted.
  activeEffect: effectClass | null;
  radioStationEffectBoost: number | null;

  setPlayer: (player: IPlayerDB) => void;
  updatePlayerData: (playerData: Partial<IPlayerDB>) => void;
  setRank: (rank: number) => void;
  // setTotalPop: (totalPop: number) => void;
  setHappinessFromBuildings: (currentHappiness: number) => void;
  setPopGrowthRate: (rate: number) => void;
  setNeedsCatchUp: (needsCatchUp: boolean) => void;

  // Default Buildings
  setTownhallLevel: (fn: Level | ((currentTHLevel: Level) => Level)) => void;
  setFactoryLevel: (
    fn: Level | ((currentFactoryLevel: Level) => Level)
  ) => void;
  setFactoryBarrels: (barrels: number) => void;
  setFactoryUnhappiness: (unhappiness: number) => void;

  // Quarries
  setQuarryLevel: (
    quarry: keyof GameVarsState["quarryLevels"],
    level: number
  ) => void;
  setQuarryLevels: (quarryLevels: GameVarsState["quarryLevels"]) => void;

  // Economy
  setExpences: (expences: number) => void;

  // Rates
  setGoldGathRate: (rate: number) => void;
  setConcreteGathRate: (rate: number) => void;
  setMetalsGathRate: (rate: number) => void;
  setCrystalsGathRate: (rate: number) => void;
  setDieselGathRate: (rate: number) => void;

  // Workers
  setAllWorkers: (workers: Workers) => void;
  setHospitalWorkers: (hospitalWorkers: number, isHospital: boolean) => void;

  // Multipliers
  setMultipliers: (multipliers: Multipliers) => void;

  // Energy
  setEnergyProduced: (energyProduced: number) => void;
  setEnergyConsumed: (energyConsumed: number) => void;
  setEnergyRemaining: (energy: number) => void;

  // Effects
  setActiveEffect: (effect: effectClass | null) => void;
  setRadioStationEffectBoost: (boost: number) => void;
  removeRadioStationEffectBoost: () => void;
};

// This store manages the global game variables.
// TODO: Manage workers and resources here too.

export const useGameVarsStore = create<GameVarsState>((set /*, get */) => ({
  player: null,
  rank: 0,
  townhallLevel: 1,
  factoryLevel: 1,
  factoryBarrels: 0,
  factoryUnhappiness: 0,
  happinessFromBuildings: 0,
  expences: 0,
  needsCatchUp: false,

  // Quarries
  quarryLevels: defaultQuarryLevels,

  // Rates
  popGrowthRate: defaultRates.popGrowthRate,
  goldGathRate: defaultRates.goldGathRate,
  concreteGathRate: defaultRates.concreteGathRate,
  metalsGathRate: defaultRates.metalsGathRate,
  crystalsGathRate: defaultRates.crystalsGathRate,
  dieselGathRate: defaultRates.dieselGathRate,

  // Workers
  allWorkers: defaultWorkers,

  // Multipliers
  multipliers: defaultRatesMultipliers,

  // Energy
  energyProduced: 0,
  energyConsumed: 0,
  energyRemaining: 0,

  // Effects
  activeEffect: null,
  radioStationEffectBoost: null,

  // Setters
  setPlayer: (player: IPlayerDB) => set({ player }),
  updatePlayerData: (playerData: Partial<IPlayerDB>) =>
    set((state) => ({
      player: state.player ? { ...state.player, ...playerData } : null,
    })),
  setRank: (rank: number) => set({ rank }),
  setExpences: (expences: number) => set({ expences }),
  setNeedsCatchUp: (needsCatchUp: boolean) => set({ needsCatchUp }),
  setHappinessFromBuildings: (currentHappiness: number) =>
    set({ happinessFromBuildings: currentHappiness }),
  setTownhallLevel: (fn: Level | ((currentTHLevel: Level) => Level)) =>
    set((state) => ({
      townhallLevel: typeof fn === "function" ? fn(state.townhallLevel) : fn,
    })),
  setFactoryLevel: (fn: Level | ((currentFactoryLevel: Level) => Level)) => {
    set((state) => ({
      factoryLevel: typeof fn === "function" ? fn(state.factoryLevel) : fn,
    }));
  },
  setFactoryUnhappiness: (unhappiness: number) =>
    set({ factoryUnhappiness: unhappiness }),
  setFactoryBarrels: (barrels: number) => {
    set((state) => {
      const newFactoryUnhappiness = round4Decimal(
        barrels * defaultBuildingsConfig.barrelToSadnessConversion
      );

      // 1. Updating the Factory Unhappiness
      state.setFactoryUnhappiness(newFactoryUnhappiness);

      // 2. Updating the Pop Growth Rate
      state.setPopGrowthRate(
        calcPopGrowthRate(
          state.player?.population ?? 0,
          state.happinessFromBuildings,
          newFactoryUnhappiness
        )
      );

      return { factoryBarrels: barrels };
    });
  },

  // Quarries ✨ //TODO: Set it up in usePlayerInit
  setQuarryLevel: (
    quarry: keyof GameVarsState["quarryLevels"],
    level: number
  ) =>
    set((state) => ({
      quarryLevels: { ...state.quarryLevels, [quarry]: level },
    })),
  setQuarryLevels: (quarryLevels: GameVarsState["quarryLevels"]) =>
    set((state) => ({
      quarryLevels: { ...state.quarryLevels, ...quarryLevels },
    })),

  // Rates
  setPopGrowthRate: (rate: number) => set({ popGrowthRate: rate }),
  setGoldGathRate: (rate: number) => set({ goldGathRate: rate }),
  setConcreteGathRate: (rate: number) => set({ concreteGathRate: rate }),
  setMetalsGathRate: (rate: number) => set({ metalsGathRate: rate }),
  setCrystalsGathRate: (rate: number) => set({ crystalsGathRate: rate }),
  setDieselGathRate: (rate: number) => set({ dieselGathRate: rate }),

  // Energy
  setEnergyProduced: (energyProduced: number) =>
    set((state) => {
      state.setEnergyRemaining(energyProduced - state.energyConsumed);
      return {
        energyProduced: energyProduced,
        // energyRemaining: state.energyProduced - state.energyConsumed,
      };
    }),
  setEnergyConsumed: (energyConsumed: number) =>
    set((state) => {
      state.setEnergyRemaining(state.energyProduced - energyConsumed);

      return {
        energyConsumed: energyConsumed,
        // energyRemaining: state.energyProduced - state.energyConsumed,
      };
    }),
  setEnergyRemaining: (energy: number) => set({ energyRemaining: energy }),

  // Effects
  // setActiveEffect: (effect: effectClass) => set({ activeEffect: effect }),
  setActiveEffect: (effect: effectClass | null) => {
    set((state) => {
      // Check if effectBoost is not null and apply it to the new effect
      if (state.radioStationEffectBoost !== null && effect !== null) {
        // Assuming effectClass can take a third parameter for the boost
        const updatedEffect = new effectClass(
          effect.originatesFrom,
          effect.expiresAtUnix,
          state.radioStationEffectBoost // Pass the existing effectBoost to the constructor
        );
        return {
          ...state,
          activeEffect: updatedEffect,
          // Optionally reset effectBoost if required, or leave it to maintain the boost value
        };
      } else {
        // If effectBoost is null, just set the effect without modification
        return {
          ...state,
          activeEffect: effect,
        };
      }
    });
  },

  // ✨ This is used ONLY from RadioStation enchances SP Cards' output
  setRadioStationEffectBoost: (boostFromBuilding: number) => {
    set((state) => {
      if (state.activeEffect !== null) {
        // Create a new effect object with the updated boost value
        // This avoids directly mutating the state
        const updatedEffect = new effectClass(
          state.activeEffect.originatesFrom,
          state.activeEffect.expiresAtUnix,
          boostFromBuilding
        );

        // Return the new state with the updated effect and effectboost
        return {
          ...state,
          activeEffect: updatedEffect,
          effectBoost: boostFromBuilding,
        };
      } else {
        // If there is no active effect, just update the effectboost
        return { ...state, effectBoost: boostFromBuilding };
      }
    });
  },

  // ✨ This is used ONLY from RadioStation enchances SP Cards' output
  removeRadioStationEffectBoost: () =>
    set((state) => {
      // If there is an activeEffect, update it by creating a new effect instance
      // without an additional boost. This assumes the effectClass constructor
      // defaults to a base boost value if the third parameter is omitted or handles it gracefully.
      const updatedEffect = state.activeEffect
        ? new effectClass(
            state.activeEffect.originatesFrom,
            state.activeEffect.expiresAtUnix
            // No need to pass the third parameter if we're removing the boost effect
          )
        : state.activeEffect;

      // Return the updated state with effectBoost set to null
      // and activeEffect updated if it was previously set.
      return {
        ...state,
        activeEffect: updatedEffect,
        effectBoost: null,
      };
    }),

  setAllWorkers: (workers: Partial<Workers>) =>
    set((state) => ({
      // ...state,
      allWorkers: { ...state.allWorkers, ...workers },
    })),

  setHospitalWorkers: (hospitalWorkers: number, isHospital: boolean) =>
    set((state) => {
      if (!isHospital)
        return {
          allWorkers: { ...state.allWorkers },
        };

      // const prevBoost =
      //   state.allWorkers.hospitalWorkers *
      //   hospitalConstants.doctorsBoostToGrowthRate;
      // const newBoost =
      //   hospitalWorkers * hospitalConstants.doctorsBoostToGrowthRate;
      // const diff = newBoost - prevBoost;
      // console.log("🐱‍👤 Hopsital: diff: ", diff);
      // console.log("🐱‍👤 Hopsital: prevBoost: ", prevBoost);
      // console.log("🐱‍👤 Hopsital: newBoost: ", newBoost);

      // state.setHappinessFromBuildings(
      //   state.happinessFromBuildings +
      //     hospitalWorkers * hospitalConstants.doctorsBoostToGrowthRate
      // );

      // state.setPopGrowthRate(
      //   state.popGrowthRate +
      //     hospitalWorkers * hospitalConstants.doctorsBoostToGrowthRate
      // );
      return {
        allWorkers: { ...state.allWorkers, hospitalWorkers },
      };
    }),
  // setMultipliers: (multipliers: Multipliers) => set({ multipliers }),
  setMultipliers: (multipliers: Multipliers) =>
    set((state) => {
      // This is Done for the ToolStore
      state.setConcreteGathRate(
        state.allWorkers.concreteWorkers * multipliers.concreteMultiplier
      );
      state.setMetalsGathRate(
        state.allWorkers.metalsWorkers * multipliers.metalsMultiplier
      );
      state.setCrystalsGathRate(
        state.allWorkers.crystalsWorkers * multipliers.crystalsMultiplier
      );
      state.setDieselGathRate(
        state.allWorkers.dieselWorkers * multipliers.dieselMultiplier
      );
      return { multipliers: { ...state.multipliers, ...multipliers } };
    }),
}));
