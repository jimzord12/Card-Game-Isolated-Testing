// src/store/index.ts
import { create } from "zustand";
import { CardClass } from "../types/CardTypes/CardTypes";
import BuildingCard from "../classes/buildingClass_V2";
import RegCard from "../classes/regClass_V2";
import SPCard from "../classes/spClass_V2";

import { useGameVarsStore } from "./gameVars"; // Adjust the path accordingly
import {
  updateBuildingRelatedGameVars,
  updateREG_RelatedGameVars,
  update_B_GameVars_Removal,
  update_R_GameVars_Removal,
} from "./utils";

// This probably manages all the cards in the game, in the sense what the players owns.
// When a Card is crafted, it is added to this store.
// When a Card is sold, it is removed from this store.
// If a Card's state is changed, it is updated in this store.

interface AllCardsState {
  cards: CardClass[];
  inventory: CardClass[];
  activeCards: CardClass[];
  activeBuildingCards: BuildingCard[];
  activeRegCards: RegCard[];
  spCards: SPCard[];
  // TODO: Active Effect
  templateCards: CardClass[];
  toolStoreCards: BuildingCard[];
  addCard: (card: CardClass) => void;
  addAllCards: (cards: CardClass[]) => void;
  removeCard: (card: CardClass) => void;
  addCardToInventory: (card: CardClass) => void;
  addAllInventoryCards: (cards: CardClass[]) => void;
  removeCardFromInventory: (card: CardClass) => void;
  addCardToActiveCards: (card: CardClass) => void;
  addAllActiveCards: (cards: CardClass[]) => void;
  removeCardFromActiveCards: (card: CardClass) => void;
  addAllTemplateCards: (cards: CardClass[]) => void;
  addAllSPCards: (cards: SPCard[]) => void;
  setToolStoreCards: (cards: BuildingCard[]) => void;
}

export const useAllCardsStore = create<AllCardsState>((set) => ({
  cards: [], // ✨ The Initial State comes from the Server/DB
  inventory: [], // ✨ The Initial State comes from the Server/DB
  activeCards: [], // ✨ The Initial State comes from the Server/DB
  activeBuildingCards: [],
  activeRegCards: [],
  templateCards: [],
  spCards: [],
  toolStoreCards: [],
  activeEffect: null,

  // ✨ By Crafting one
  addCard: (card: CardClass) =>
    set((state) => ({
      ...state,
      cards: [...state.cards, card],
    })),

  // ✨ When Logging in, add all cards in one go
  addAllCards: (cards: CardClass[]) =>
    set((state) => ({
      ...state,
      cards: [...state.cards, ...cards],
    })),

  // ✨ When Logging in, add all inv cards in one go
  addAllInventoryCards(cards) {
    set((state) => ({
      ...state,
      inventory: [...state.inventory, ...cards],
    }));
  },

  // ✨ When Logging in, add all active cards in one go
  // ✨ Also update the GameVars based on the output of the activated cards
  addAllActiveCards(cards) {
    set((state) => {
      const newBuildingCards: BuildingCard[] = [];
      const newRegCards: RegCard[] = [];
      
      cards.forEach((card) => {
        if (card instanceof BuildingCard) {
          updateBuildingRelatedGameVars(card, useGameVarsStore.getState());
          newBuildingCards.push(card);
        } else if (card instanceof RegCard) {
          updateREG_RelatedGameVars(card, useGameVarsStore.getState());
          newRegCards.push(card);
        } else {
          // return;
        }
      });
      return {
        ...state,
        activeCards: [...state.activeCards, ...cards],
        activeBuildingCards: [
          ...state.activeBuildingCards,
          ...newBuildingCards,
        ],
        activeRegCards: [...state.activeRegCards, ...newRegCards],
      };
    });
  },

  // ✨ When Logging in, add all template cards in one go
  addAllTemplateCards: (cards) =>
    set((state) => ({
      ...state,
      templateCards: [...state.templateCards, ...cards],
    })),

  addAllSPCards: (cards) =>
    set((state) => ({
      ...state,
      spCards: [...state.spCards, ...cards],
    })),

  // ✨ By Selling one
  removeCard: (card: CardClass) =>
    set((state) => ({
      ...state,
      cards: state.cards.filter((_card) => card.id !== _card.id),
    })),

  // ✨ By Crafting one, Buying one or by Deactivating one
  addCardToInventory: (card: CardClass) =>
    set((state) => ({
      ...state,
      inventory: [...state.inventory, card],
    })),

  // ✨ By Selling one or by Activating one
  removeCardFromInventory: (card: CardClass) =>
    set((state) => ({
      ...state,
      inventory: state.inventory.filter((_card) => card.id !== _card.id),
    })),

  // ✨ By Activating one
  // 🔷 Here we also update the GameVars based on the output of the activated card
  addCardToActiveCards: (card: CardClass) =>
    set((state) => {
      if (card instanceof BuildingCard) {
        // 🔷 ✨ When a Building Card is Activated, its side-effects are handled in the fn below
        updateBuildingRelatedGameVars(card, useGameVarsStore.getState());

        return {
          ...state,
          activeCards: [...state.activeCards, card],
          activeBuildingCards: [...state.activeBuildingCards, card],
        };
      } else if (card instanceof RegCard) {
        // 🔷 ✨ When a REG Card is Activated, its side-effects are handled in the fn below
        updateREG_RelatedGameVars(card, useGameVarsStore.getState());

        return {
          ...state,
          activeCards: [...state.activeCards, card],
          activeRegCards: [...state.activeRegCards, card],
        };
      } else {
        return { ...state, activeCards: [...state.activeCards, card] };
      }
    }),

  // ✨ By Deactivating one
  removeCardFromActiveCards: (card: CardClass) =>
    set((state) => {
      if (card instanceof BuildingCard) {
        update_B_GameVars_Removal(card, useGameVarsStore.getState());

        return {
          ...state,
          activeCards: state.activeCards.filter(
            (_card) => card.id !== _card.id
          ),
          activeBuildingCards: state.activeBuildingCards.filter(
            (_card) => card.id !== _card.id
          ),
          toolStoreCards: state.toolStoreCards.filter(
            (_card) => card.id !== _card.id
          ),
        };
      } else if (card instanceof RegCard) {
        update_R_GameVars_Removal(card, useGameVarsStore.getState());

        return {
          ...state,
          activeCards: state.activeCards.filter(
            (_card) => card.id !== _card.id
          ),
          activeRegCards: state.activeRegCards.filter(
            (_card) => card.id !== _card.id
          ),
        };
      } else {
        return {
          ...state,
          activeCards: state.activeCards.filter(
            (_card) => card.id !== _card.id
          ),
        };
      }
    }),

  setToolStoreCards: (cards) =>
    set((state) => ({
      ...state,
      toolStoreCards: cards,
    })),
}));
