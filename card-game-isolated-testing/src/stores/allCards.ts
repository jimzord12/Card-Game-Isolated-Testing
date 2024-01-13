// src/store/index.ts
import { create } from "zustand";
import BuildingCard from "../classes/buildingClass_V2";
import RegCard from "../classes/regClass_V2";
import SPCard from "../classes/spClass_V2";

type Card = BuildingCard | RegCard | SPCard;

// This probably manages all the cards in the game, in the sense what the players owns.
// When a Card is crafted, it is added to this store.
// When a Card is sold, it is removed from this store.
// If a Card's state is changed, it is updated in this store.

interface AllCardsState {
  cards: Card[];
  addCard: (card: Card) => void;
  removeCard: (card: Card) => void;
}

export const useAllCardsStore = create<AllCardsState>((set) => ({
  cards: [], // ✨ The Initial State comes from the Server/DB

  addCard: (card: Card) =>
    set((state) => ({
      ...state,
      cards: [...state.cards, card],
    })),
  removeCard: (card: Card) =>
    set((state) => ({
      ...state,
      cards: state.cards.filter((_card) => card.id !== _card.id),
    })),
}));
