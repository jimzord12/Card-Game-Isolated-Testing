// src/store/index.ts
import { create } from "zustand";
import BuildingCard from "../classes/buildingClass";
import RegCard from "../classes/regClass";
import SPCard from "../classes/spClass";

type Card = BuildingCard | RegCard | SPCard;

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
