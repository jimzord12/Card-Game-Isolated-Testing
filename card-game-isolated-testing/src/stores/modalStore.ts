import { ReactNode } from "react";
import { create } from "zustand";
import { ModalData } from "../types/ModalTypes/BaseModalTypes";

type ModalState = {
  stack: ReactNode[];
  modalData: ModalData;
  rerender: boolean;
  pushModal: (content: ReactNode) => void;
  popModal: () => void;
  clearModals: () => void;
  provideModalData: (modalData: ModalData) => void;
  clearModalData: () => void;
};

export const useModalStore = create<ModalState>((set, get) => ({
  rerender: false,
  stack: [],
  modalData: {
    id: null,
    modalBg: null,
    modalLevel: null,
    modalRarityOrName: null,
    modalType: "standard",
    modalMenuIndex: null,
  },
  pushModal: (content) =>
    set((state) => ({
      stack: [...state.stack, content],
      modalData: { ...state.modalData },
    })),
  popModal: () => {
    set((state) => ({ stack: state.stack.slice(0, -1) }));
    get().clearModalData(); // Clear the modal data after popping the modal
  },
  provideModalData: (modalData) => {
    set((state) => ({
      ...state,
      modalData: { ...state.modalData, ...modalData },
    }));
  },
  clearModalData: () =>
    set({
      modalData: {
        id: null,
        modalBg: null,
        modalLevel: null,
        modalRarityOrName: null,
        modalType: "standard",
        modalMenuIndex: null,
      },
    }),
  clearModals: () => set({ stack: [] }),
}));
