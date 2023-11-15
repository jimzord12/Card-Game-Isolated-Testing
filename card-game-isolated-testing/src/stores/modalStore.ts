import { ReactNode } from "react";
import { create } from "zustand";
import { ModalData } from "../types/ModalTypes/BaseModalTypes";

type ModalState = {
  stack: ReactNode[];
  modalData: ModalData;
  pushModal: (content: ReactNode) => void;
  popModal: () => void;
  clearModals: () => void;
  provideModalData: (modalData: ModalData) => void;
};

export const useModalStore = create<ModalState>((set /*, get */) => ({
  stack: [],
  modalData: { modalBg: null, modalLevel: 3, modalRarity: 4 },
  pushModal: (content) =>
    set((state) => ({ stack: [...state.stack, content] })),
  popModal: () => set((state) => ({ stack: state.stack.slice(0, -1) })),
  clearModals: () => set({ stack: [] }),
  provideModalData: (modalData) => {
    set((state) => ({
      ...state,
      modalData: { ...state.modalData, ...modalData },
    }));
  },
}));
