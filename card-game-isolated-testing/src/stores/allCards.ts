// src/store/index.ts
import { create } from "zustand";
import { CardClass } from "../types/CardTypes/CardTypes";
import BuildingCard from "../classes/buildingClass_V2";
import RegCard from "../classes/regClass_V2";
import SPCard from "../classes/spClass_V2";

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
}

export const useAllCardsStore = create<AllCardsState>((set) => ({
  cards: [], // ✨ The Initial State comes from the Server/DB
  inventory: [], // ✨ The Initial State comes from the Server/DB
  activeCards: [], // ✨ The Initial State comes from the Server/DB
  activeBuildingCards: [],
  activeRegCards: [],
  templateCards: [],
  spCards: [],
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
  addAllActiveCards(cards) {
    set((state) => ({
      ...state,
      activeCards: [...state.activeCards, ...cards],
    }));
  },

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
  addCardToActiveCards: (card: CardClass) =>
    set((state) => {
      if (card instanceof BuildingCard) {
        return {
          ...state,
          activeCards: [...state.activeCards, card],
          activeBuildingCards: [...state.activeBuildingCards, card],
        };
      } else if (card instanceof RegCard) {
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
        return {
          ...state,
          activeCards: state.activeCards.filter(
            (_card) => card.id !== _card.id
          ),
          activeBuildingCards: state.activeBuildingCards.filter(
            (_card) => card.id !== _card.id
          ),
        };
      } else if (card instanceof RegCard) {
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
}));
